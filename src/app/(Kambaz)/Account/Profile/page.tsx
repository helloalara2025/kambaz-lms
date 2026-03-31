/*******************************************
 * Profile Page - Alara Hakki
 * 
 * This is my profile page where users can
 * view and edit their information.
 * Changes persist to MongoDB database.
 *******************************************/
"use client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { RootState } from "../../store";
import * as client from "../client";
import { Button, FormControl } from "react-bootstrap";

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const dispatch = useDispatch();
  const router = useRouter();
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );

  /* I update the user profile in the database */
  const updateProfile = async () => {
    try {
      const updatedProfile = await client.updateUser(profile);
      dispatch(setCurrentUser(updatedProfile));
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Update profile error:", error);
      alert("Failed to update profile");
    }
  };

  /* I redirect to signin if no user is logged in */
  useEffect(() => {
    if (!currentUser) {
      router.push("/Account/Signin");
    } else {
      setProfile(currentUser);
    }
  }, [currentUser, router]);

  /* I handle sign out */
  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    router.push("/Account/Signin");
  };

  /* Don't render until we have profile data */
  if (!profile || !profile.username) {
    return <div>Loading...</div>;
  }

  return (
    <div className="wd-profile-screen">
      <h3>Profile</h3>
      <div>
        <FormControl
          id="wd-username"
          className="mb-2"
          value={profile.username || ""}
          onChange={(e) =>
            setProfile({ ...profile, username: e.target.value })
          }
          placeholder="Username"
        />
        <FormControl
          id="wd-password"
          className="mb-2"
          type="password"
          value={profile.password || ""}
          onChange={(e) =>
            setProfile({ ...profile, password: e.target.value })
          }
          placeholder="Password"
        />
        <FormControl
          id="wd-firstname"
          className="mb-2"
          value={profile.firstName || ""}
          onChange={(e) =>
            setProfile({ ...profile, firstName: e.target.value })
          }
          placeholder="First Name"
        />
        <FormControl
          id="wd-lastname"
          className="mb-2"
          value={profile.lastName || ""}
          onChange={(e) =>
            setProfile({ ...profile, lastName: e.target.value })
          }
          placeholder="Last Name"
        />
        <FormControl
          id="wd-dob"
          className="mb-2"
          type="date"
          value={profile.dob || ""}
          onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
        />
        <FormControl
          id="wd-email"
          className="mb-2"
          value={profile.email || ""}
          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          placeholder="Email"
        />
        <select
          className="form-control mb-2"
          id="wd-role"
          value={profile.role || "USER"}
          onChange={(e) => setProfile({ ...profile, role: e.target.value })}
        >
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
          <option value="FACULTY">Faculty</option>
          <option value="STUDENT">Student</option>
        </select>
        <Button onClick={updateProfile} className="btn btn-primary w-100 mb-2">
          Update
        </Button>
        <Button onClick={signout} className="btn btn-secondary w-100 mb-2" id="wd-signout-btn">
          Sign out
        </Button>
      </div>
    </div>
  );
}
