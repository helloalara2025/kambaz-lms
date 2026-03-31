// This is the /cid/page.tsx file.

// The redirect navigation for the courses to go home page.
// This is also the placeholder until the course pages are created later.
  
  // return (
  //   <div id="wd-courses">
  //     <h1>Courses 1234</h1>
  //     </div>
// src/(Kambaz)/Courses/[cid]/page.tsx
import { redirect } from "next/navigation";
export default async function CoursesPage({
  params,
}: {
  params: Promise<{ cid: string }>;
}) {
  const { cid } = await params;
  redirect(`/Courses/${cid}/Home`);
}