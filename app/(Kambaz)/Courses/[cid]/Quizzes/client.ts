// quizzes client
export const mockQuizzes = [
  {
    _id: "quiz1",
    title: "Q1 - HTML & CSS Basics",
    course: "course1",
    description: "Test your knowledge of HTML and CSS fundamentals",
    quizType: "Graded Quiz",
    points: 10,
    assignmentGroup: "Quizzes",
    shuffleAnswers: true,
    timeLimit: 20,
    multipleAttempts: false,
    howManyAttempts: 1,
    showCorrectAnswers: "Immediately",
    accessCode: "",
    oneQuestionAtATime: true,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
    dueDate: "2024-12-15T23:59:00",
    availableDate: "2024-12-01T00:00:00",
    untilDate: "2024-12-20T23:59:00",
    published: true,
    questions: [
      {
        _id: "q1",
        type: "multiple-choice",
        title: "Question 1",
        points: 3,
        question: "What does HTML stand for?",
        choices: [
          "Hyper Text Markup Language",
          "High Tech Modern Language",
          "Home Tool Markup Language",
          "Hyperlinks and Text Markup Language"
        ],
        correctAnswers: ["Hyper Text Markup Language"]
      },
      {
        _id: "q2",
        type: "true-false",
        title: "Question 2",
        points: 2,
        question: "CSS stands for Cascading Style Sheets",
        choices: ["True", "False"],
        correctAnswers: ["True"]
      },
      {
        _id: "q3",
        type: "fill-in-blank",
        title: "Question 3",
        points: 5,
        question: "The _____ tag is used to create a hyperlink in HTML",
        choices: [],
        correctAnswers: ["a", "<a>", "anchor"]
      }
    ]
  },
  {
    _id: "quiz2",
    title: "Q2 - JavaScript Fundamentals",
    course: "course1",
    description: "Test your JavaScript knowledge",
    quizType: "Graded Quiz",
    points: 15,
    assignmentGroup: "Quizzes",
    shuffleAnswers: true,
    timeLimit: 30,
    multipleAttempts: true,
    howManyAttempts: 2,
    showCorrectAnswers: "After due date",
    accessCode: "",
    oneQuestionAtATime: true,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
    dueDate: "2024-12-20T23:59:00",
    availableDate: "2024-12-05T00:00:00",
    untilDate: "2024-12-25T23:59:00",
    published: true,
    questions: [
      {
        _id: "q4",
        type: "multiple-choice",
        title: "Question 1",
        points: 5,
        question: "Which keyword is used to declare a variable in JavaScript?",
        choices: ["var", "let", "const", "All of the above"],
        correctAnswers: ["All of the above"]
      }
    ]
  },
  {
    _id: "quiz3",
    title: "Q3 - React Basics (Unpublished)",
    course: "course1",
    description: "React fundamentals quiz",
    quizType: "Practice Quiz",
    points: 20,
    assignmentGroup: "Quizzes",
    shuffleAnswers: true,
    timeLimit: 25,
    multipleAttempts: true,
    howManyAttempts: 3,
    showCorrectAnswers: "Immediately",
    accessCode: "",
    oneQuestionAtATime: false,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
    dueDate: "2024-12-25T23:59:00",
    availableDate: "2024-12-10T00:00:00",
    untilDate: "2024-12-30T23:59:00",
    published: false,
    questions: []
  }
];

export const mockUser = {
  _id: "user1",
  username: "faculty1",
  firstName: "John",
  lastName: "Doe",
  role: "FACULTY"
};

export const mockStudentUser = {
  _id: "user2",
  username: "student1",
  firstName: "Jane",
  lastName: "Smith",
  role: "STUDENT"
};