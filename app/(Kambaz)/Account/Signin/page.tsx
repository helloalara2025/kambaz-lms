"use client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormControl, Button } from "react-bootstrap";
import * as client from "../client";

export default function Signin() {
  const router = useRouter();
  const [credentials, setCredentials] = useState<any>({});
  const dispatch = useDispatch();

  const [error, setError] = useState("");

  // The function gets called when the button is clicked
//   const signin = async () => {
//   console.log("Attempting signin with:", credentials);
//   try {
//     const user = await client.signin(credentials);
//     console.log("Received user from server:", user);
    
//     if (!user) {
//       alert("No user returned");
//       return;
//     }
    
//     console.log("Dispatching user to redux");
//     dispatch(setCurrentUser(user));
    
//     console.log("Navigating to Dashboard");
//     window.location.href = "/Dashboard";
//   } catch (error: any) {
//     console.error("Signin error:", error);
//     alert("Signin failed: " + (error?.response?.data?.message || error.message));
//   }
// };
  const signin = async () => {
    try {
      const user = await client.signin(credentials);
      if (!user) {
        alert("invalid credentials");
        return;
      }
      dispatch(setCurrentUser(user));
      router.push("/Dashboard");
    } catch (err: any) {
      console.error("Signin error:", err);
      const message =
        err?.response?.data?.message || err?.message || "Failed to sign in";
      setError(message);
      alert(message);
    }
  };

  return (
    <div id="wd-signin-screen">
      <h1>Sign in</h1>
      <FormControl
        id="wd-username"
        className="mb-2"
        placeholder="username"
        value={credentials.username || ""}
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
      />
      <FormControl
        id="wd-password"
        className="mb-2"
        placeholder="password"
        type="password"
        value={credentials.password || ""}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
      />
      <Button onClick={signin} id="wd-signin-btn" className="w-100">
        Sign in
      </Button>

      <Link id="wd-signup-link" 
      href="/Account/Signup">
        Sign up
      </Link>
    </div>
  );
}
