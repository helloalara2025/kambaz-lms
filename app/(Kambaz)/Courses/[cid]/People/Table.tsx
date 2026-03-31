// This is a component embedded in the page in Account/Users/
"use client";
import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import PeopleDetails from "./Details";

// The component now relies entirely on the 'users' prop provided by the parent.
// The 'fetchUsers' prop is unused in this child component, but is kept in the 
// interface as a reminder of the data flow/admin controls in the parent.
export default function PeopleTable({ users = [], fetchUsers }:
   { users?: any[]; fetchUsers: () => void; }) {
    const [showDetails, setShowDetails] = useState(false);
    const [showUserId, setShowUserId] = useState<string | null>(null);
  return (
    <div id="wd-people-table">
      {showDetails && (
        <PeopleDetails
          uid={showUserId}
          onClose={() => {
            setShowDetails(false);
            fetchUsers(); // if something is modified in the users
          }}
        />
      )}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th className="wd-full-name">Full Name</th>
            <th className="wd-login-id">Login ID</th>
            <th className="wd-section">Section</th>
            <th className="wd-role">Role</th>
            <th className="wd-last-activity">Last Activity</th>
            <th className="wd-total-activity">Total Activity</th>
          </tr>
        </thead>
        <tbody>
          {/* here is the row */}
          {users.map((user: any) => (
            <tr
              key={user._id}
              onClick={() => {
                setShowDetails(true);
                setShowUserId(user._id);
              }}
            >
              <td className="wd-full-name text-nowrap">
                <FaUserCircle className="me-2 fs-1 text-secondary" />
                <span className="wd-first-name">{user.firstName} </span>
                <span className="wd-last-name">{user.lastName}</span>
              </td>
              <td className="wd-login-id">{user.loginId}</td>
              <td className="wd-section">{user.section}</td>
              <td className="wd-role">{user.role}</td>
              <td className="wd-last-activity">{user.lastActivity}</td>
              <td className="wd-total-activity">{user.totalActivity}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}