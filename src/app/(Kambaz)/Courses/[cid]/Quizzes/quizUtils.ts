/**
 * Quiz utility functions
 * Helper functions for quiz-related operations
 */

/**
 * Get availability status based on dates
 * Returns: "Available", "Closed", or "Not available until [date]"
 */
export const getAvailabilityStatus = (quiz: any): string => {
  const now = new Date();
  const from = quiz.availableDate ? new Date(quiz.availableDate) : null;
  const until = quiz.untilDate ? new Date(quiz.untilDate) : null;

  if (from && now < from)
    return `Not available until ${from.toLocaleDateString()}`;
  if (until && now > until) return "Closed";
  return "Available";
};

/**
 * Filter quizzes based on search term and user role
 * Students only see published quizzes
 */
export const filterQuizzes = (
  quizzes: any[],
  searchTerm: string,
  isFaculty: boolean
): any[] => {
  const filtered = quizzes.filter((q: any) =>
    q.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return isFaculty ? filtered : filtered.filter((q: any) => q.published);
};

