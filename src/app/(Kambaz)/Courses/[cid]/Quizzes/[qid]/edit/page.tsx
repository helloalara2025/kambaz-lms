"use client";
/*
                  Quiz editor 
  ___________________________________________
  * Main quiz editor page, allowing faculty to:
    - edit quiz settings and details (Details tab)
    - Manage questions (Questions Tab) - add, edit, delete functionality
    - Save changes to the backend
    - Publish quizzes 

    This component orchestrates the entire quiz editing workflow including
  the question editor modal and all CRUD operations for questions.
*/
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import * as client from "../../../../client";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";

// Editor Component Imports
import QuizEditorHeader from "./QuizEditorHeader";
import QuizEditorTabs from "./QuizEditorTab";
import QuizDetailsTab from "./QuizDetailstab";
import QuizQuestions from "./QuizQuestions";
import QuestionEditor from "./quiz-editor-components/QuestionEditor";

export default function QuizEditor() {
  // Route Params + Redux State
  const { cid, qid } = useParams();
  const router = useRouter();
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );

  // Local States
  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  // Tab navigation state
  const [activeTab, setActiveTab] = useState<"details" | "questions">(
    "details"
  );

  // Question editor model state
  const [isQuestionEditorOpen, setIsQuestionEditorOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<any | null>(null);

  // Authorization
  const isFaculty = currentUser?.role === "FACULTY";

  // Load quiz data
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        const data = await client.findQuizById(cid as string, qid as string);
        setQuiz(data);
      } catch (error) {
        console.error("Failed to load quiz:", error);
        toast.error("Failed to load quiz");
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [cid, qid]);

  // _________ Quiz detail handlers (Details tab)__________-

  /**
   * Updates a single field in the quiz object
   * Used by form inputs in QuizDetailsTab
   */
  const updateField = (name: string, value: any) => {
    setQuiz((prev: any) => ({ ...prev, [name]: value }));
  };

  /**
   * Toggles a boolean field (for checkboxes)
   * Used by checkbox inputs in QuizDetailsTab
   */
  const updateCheckbox = (name: string) => {
    setQuiz((prev: any) => ({ ...prev, [name]: !prev[name] }));
  };

  /**
   * Saves quiz details to backend
   * Does NOT publish - just saves current state
   */
  const handleSave = async () => {
    if (!quiz) return;
    try {
      await client.updateQuiz(cid as string, qid as string, quiz);
      toast.success("Quiz saved!");
      router.push(`/Courses/${cid}/Quizzes/${qid}`);
    } catch (error) {
      console.error("Failed to save quiz:", error);
      toast.error("Failed to save quiz");
    }
  };

  /**
   * Saves quiz details AND publishes the quiz
   * Sets published flag and calls publish endpoint
   */
  const handleSaveAndPublish = async () => {
    if (!quiz) return;
    try {
      // First update with published flag
      await client.updateQuiz(cid as string, qid as string, {
        ...quiz,
        published: true,
      });
      // call publish endpoint
      toast.success("Quiz saved and published!");
      router.push(`/Courses/${cid}/Quizzes`);
    } catch (error) {
      console.error("Failed to save and publish:", error);
      toast.error("Failed to save and publish quiz");
    }
  };

  /**
   * Cancels editing and returns to quiz list
   * Does not save any changes
   */
  const handleCancel = () => {
    router.push(`/Courses/${cid}/Quizzes`);
  };

  // QUESTION MANAGMENT HANDLERS (Question Tab)

  /**
   * Opens the question editor modal for creating a new question
   * Clears any previously editing question
   */
  const handleAddQuestion = () => {
    setEditingQuestion(null);
    setIsQuestionEditorOpen(true);
  };

  /**
   * Opens the question editor modal for editing an existing question
   * Loads the question data into the form
   * @param question - The question object to edit
   */
  const handleEditQuestion = (question: any) => {
    setEditingQuestion(question);
    setIsQuestionEditorOpen(true);
  }
  

  /**
   * Saves a question (either new or updated) to the backend
   * Determines whether to add or update based on presence of _id
   * @param question - Question data from the editor form
   */
  const handleSaveQuestion = async (question: any) => {
    try {
      if (question._id) {
        // UPDATE existing question
        await client.updateQuestion(
          cid as string,
          qid as string,
          question._id,
          question
        );
        
        // Reload quiz to get fresh data with updated points
        const updatedQuiz = await client.findQuizById(cid as string, qid as string);
        setQuiz(updatedQuiz);
        toast.success("Question updated!");
      } else {
        // ADD new question
        await client.addQuestionToQuiz(
          cid as string,
          qid as string,
          question
        );
        
        // Reload quiz to get fresh data with new question
        const updatedQuiz = await client.findQuizById(cid as string, qid as string);
        setQuiz(updatedQuiz);
        
        toast.success("Question added!");
      }

      // Close modal and clear editing state
      setIsQuestionEditorOpen(false);
      setEditingQuestion(null);
    } catch (error) {
      console.error("Failed to save question:", error);
      toast.error("Failed to save question");
    }
  };


  /**
   * Deletes a question from the quiz
   * @param questionId - MongoDB _id of the question to delete
   */
  const handleDeleteQuestion = async (questionId: string) => {
    try {
      await client.deleteQuestion(cid as string, qid as string, questionId);
      
      // Reload quiz to get fresh data with updated points
      const updatedQuiz = await client.findQuizById(cid as string, qid as string);
      setQuiz(updatedQuiz);
      
      toast.success("Question deleted!");
    } catch (error) {
      console.error("Failed to delete question:", error);
      toast.error("Failed to delete question");
    }
  };

  /* Guards - handling edge cases */
  if (!isFaculty) {
    return (
      <div className="container-fluid mt-4">
        <div className="alert alert-danger mb-3">
          Students cannot edit quizzes.
        </div>
        <Link href={`/Courses/${cid}/Quizzes`} className="btn btn-primary">
          Back to Quizzes
        </Link>
      </div>
    );
  }

   /**
   * GUARD 2: Loading state
   * Show spinner while fetching quiz data
   */
  if (loading) {
    return (
      <div className="container-fluid mt-4 text-center">
        <div className="spinner-border text-primary" />
        <p className="mt-2">Loading quiz editor...</p>
      </div>
    );
  }

  /**
   * GUARD 3: Quiz not found
   * Show error if quiz doesn't exist or failed to load
   */
  if (!quiz) {
    return (
      <div className="container-fluid mt-4">
        <div className="alert alert-warning">Quiz not found</div>
        <Link href={`/Courses/${cid}/Quizzes`} className="btn btn-primary">
          Back to Quizzes
        </Link>
      </div>
    );
  }

  // Main render point 
  return (
    <div className="container-fluid" id="wd-quiz-editor">
      {/* Header with the title and action buttons */}
      <QuizEditorHeader
        quizTitle={quiz.title}
        onCancel={handleCancel}
        onSave={handleSave}
        onSaveAndPublish={handleSaveAndPublish}
      />

      <hr />

      {/* Tab navgation - Details / Question */}
      <QuizEditorTabs 
      activeTab={activeTab} 
      onTabChange={setActiveTab} 
      />

      {/* Tab content - conditionally render based on active tab */}
      {activeTab === "details" ? (
        // Quiz Tab: Quiz settings form
        <QuizDetailsTab
        quiz={quiz}
        updateField={updateField}
        updateCheckbox={updateCheckbox}
        />
      ) : (
        // Quiz TABL List of questions with Add, Edit, Delete
        <QuizQuestions
          questions={quiz.questions || []}
          onAddQuestion={handleAddQuestion}
          onEditQuestion={handleEditQuestion}
          onDeleteQuestion={handleDeleteQuestion}
        />
      )}

      {/* Question Editor Modal - shown when adding/editing questions */}
      <QuestionEditor
        question={editingQuestion}
        isOpen={isQuestionEditorOpen}
        onClose={() => {
          setIsQuestionEditorOpen(false);
          setEditingQuestion(null);
        }}
        onSave={handleSaveQuestion}
      />
    </div>
  );
}
