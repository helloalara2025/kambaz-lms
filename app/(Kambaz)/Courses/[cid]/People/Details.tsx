"use client";
import { useEffect, useState } from "react";
import { FaCheck, FaUserCircle } from "react-icons/fa";
import {FaPencil} from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { FormControl } from "react-bootstrap";
import * as client from "../../../Account/client";

// Component designed to be embedded in the People page and manage one user's details
export default function PeopleDetails({
  uid,
  onClose, // triggers a list refresh in parent (PeopleTable)
}: {
  uid: string | null;
  onClose: () => void;
}) {
  const [user, setUser] = useState<any>({});

  // Allows you to edit the fieild
  const [name, setName] = useState("");
  const [editing, setEditing] = useState(false);

  // ----- CRUD Function: Update/Save User Details -----
  const saveUser = async () => {
    const [firstName, lastName] = name.split(" ");
    const updatedUser = { ...user, firstName, lastName };
    await client.updateUser(updatedUser);
    setUser(updatedUser);
    setEditing(false);
    onClose();
  };

  // ----- CRUD Function: Read/Fetch User Details -----
  const fetchUser = async () => {
    if (!uid) return;
    try {
      const user = await client.findUserById(uid);
      setUser(user);
      setName(`${user.firstName} ${user.lastName}`);
      } catch (error) {
      // Handle case where user might have been deleted while panel was open
      console.error("Error fetching user details:", error);
      setUser({}); // Clear user data on fetch failure
      }
  };

 // Hook: Triggers the data fetch operation.
  useEffect(() => {
    if (uid) fetchUser();
  }, [uid]); // uid is the dependency
  if (!uid) return null; // If no UID is provided, do not render the sidebar

 // --- CRUD Function: Delete User ---
    const deleteUser = async (uid: string) => {
      try {
          await client.deleteUser(uid);
          onClose();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
  };

  return (
    <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
      
      {/* Close Button */}
      <button
        onClick={onClose}
        className="btn position-fixed end-0 top-0 wd-close-details"
      >
        <IoCloseSharp className="fs-1" />{" "}
      </button>
      <div className="text-center mt-2">
        {" "}
        <FaUserCircle className="text-secondary me-2 fs-1" />{" "}
      </div>
      <hr />

      {/* --- User Name and Edit/Save Controls (Conditional Rendering) --- */}
      <div className="text-danger fs-4 wd-name">

        {/* Pencil Icon: Shown only if NOT editing. Clicking sets editing=true. */}
        {!editing && (
          <FaPencil onClick={() => setEditing(true)}
              className="float-end fs-5 mt-2 wd-edit" /> )}
        {/* Checkmark Icon: Shown only if editing. Clicking saves changes via saveUser(). */}
        {editing && (
          <FaCheck onClick={() => saveUser()}
              className="float-end fs-5 mt-2 me-2 wd-save" /> )}
        
        {/* Read-Only Name Display: Shown only if NOT editing. Clicking sets editing=true. */}
        {!editing && (
          <div className="wd-name"
               onClick={() => setEditing(true)}>
            {user.firstName} {user.lastName} </div>)}

          {/* Name Edit Input: Shown only if editing. */}
          {user && editing && (
          <FormControl className="w-50 wd-edit-name"
            defaultValue={`${user.firstName} ${user.lastName}`}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") { saveUser(); }}}/>)}
      </div>
      <b>Roles:</b> <span className="wd-roles"> {user.role} </span> <br />
      <b>Login ID:</b> <span className="wd-login-id"> {user.loginId} </span>{" "}
      <br />
      <b>Section:</b> <span className="wd-section"> {user.section} </span>{" "}
      <br />
      <b>Total Activity:</b>{" "}
      <span className="wd-total-activity">{user.totalActivity}</span> <hr />
      
      {/* Delete and Cancel Buttons */}
      <button
        onClick={() => deleteUser(uid)}
        className="btn btn-danger float-end"
      >
        Delete{" "}
      </button>
      <button
        onClick={onClose}
        className="btn btn-secondary
              float-end me-2"
      >
        Cancel{" "}
      </button>
    </div>
  );
}
