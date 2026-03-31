// This Breadcrumb tells the user which page they are (navigation aid).

"use client";
import React from "react";
import { usePathname } from "next/navigation";

export default function Breadcrumb({
  course,
}: {
  course: { name: string } | undefined;
}) {
  const pathname = usePathname();
  return (
    <span>
      Course {course?.name} &gt; {pathname.split("/").pop()}
    </span>
  );
}
