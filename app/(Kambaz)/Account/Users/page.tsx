// New Users screen that fetches users from db and displays it with PeopleTable component.
"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { FormControl } from "react-bootstrap";
import {FaPlus} from "react-icons/fa6";
import PeopleTable from "../../Courses/[cid]/People/Table";
import * as client from "../client";
export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [role, setRole] = useState("");
  const createUser = async () => {
    const user = await client.createUser({
      firstName: "New",
      lastName: `User${users.length + 1}`,
      username: `newuser${Date.now()}`,
      password: "password123",
      section: "S101",
      role: "STUDENT",
    });
    setUsers([...users, user]);
  };

  const filterUsersByRole = async (role: string) => {
    setRole(role);
    if (role) {
      const users = await client.findUsersByRole(role);
      setUsers(users);
    } else {
      fetchUsers();
    }
  };
  const [name, setName] = useState("");
  const filterUsersByName = async (name: string) => {
    setName(name);
    if (name) {
      const users = await client.findUsersByPartialName(name);
      setUsers(users);
    } else {
      fetchUsers();
    }
  };
  const { uid } = useParams();
  const fetchUsers = async () => {
    const users = await client.findAllUsers();
    setUsers(users);
  };
  useEffect(() => {
    fetchUsers();
  }, [uid]);
  return (
    <div>
      <button onClick={createUser}
              className="float-end btn btn-danger">
        <FaPlus className="me-2" />
        People
      </button>
      <h3>Users</h3>
      <div className="d-flex mb-3 align-items-center">
        {/* Search bar next to the dropdown bar */}
        <FormControl
          onChange={(e) => filterUsersByName(e.target.value)}
          placeholder="Search people"
          className="float-start w-25 me-2 wd-filter-by-name"
        />
        {/* Dropdown invoking a filterUsers event handler function with selected role. 
     Function updates role state var and requests from serer the list of users filters by role. */}
        <select
          value={role}
          onChange={(e) => filterUsersByRole(e.target.value)}
          className="form-select float-start w-25 wd-select-role"
        >
          <option value="">All Roles</option>{" "}
          <option value="STUDENT">Students</option>
          <option value="TA">Assistants(TA)</option>{" "}
          <option value="FACULTY">Faculty</option>
          <option value="ADMIN">Administrators</option>
        </select>
      </div>
      <div style={{ clear: "both" }}>
        <PeopleTable users={users} fetchUsers={fetchUsers} />
      </div>
    </div>
  );
}
