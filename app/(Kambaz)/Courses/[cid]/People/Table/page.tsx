// People page for a course - displays only users enrolled in the course
"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import PeopleTable from "../Table";
import * as client from "../../../client";

export default function PeoplePage() {
  const { cid } = useParams();
  const [users, setUsers] = useState<any[]>([]);

  const fetchUsers = async () => {
    if (!cid || typeof cid !== "string") return;
    try {
      const enrolledUsers = await client.findUsersForCourse(cid);
      setUsers(enrolledUsers);
    } catch (error) {
      console.error("Error fetching users for course:", error);
      setUsers([]);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [cid]);

  return (
    <div>
      <h3>People</h3>
      <PeopleTable users={users} fetchUsers={fetchUsers} />
    </div>
  );
}

