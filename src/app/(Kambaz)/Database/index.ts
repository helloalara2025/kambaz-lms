import courses from "./courses.json"; // import course data from JSON file  (database)
import modules from "./modules.json"; // import modules' data from JSON file ( module info for course [pulled from Prof. Jose Annunziato's Repo])
import assignments from "./assignments.json" assert { type: "json" }; // for Turbopack with Next.js 15
import users from "./users.json"; // import users data from JSON file ( user info for course)
import enrollments from "./enrollments.json"; // import enrollments data from JSON file ( which user is enrolled in which course)

import quizzes from "./quizzes.json";

export { courses, modules, assignments, users, enrollments, quizzes };
