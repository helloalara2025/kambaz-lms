// This page is for signup
"use client";
import Link from "next/link";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormControl } from "react-bootstrap";
import * as client from "../client";

export default function Signup() {
  const [user, setUser] = useState<any>({ username: "", password: "" });
  const dispatch = useDispatch();
  const router = useRouter();

  const signup = async () => {
    try {
      const currentUser = await client.signup(user);
      dispatch(setCurrentUser(currentUser));
      router.push("/Account/Profile");
    } catch (error: any) {
      console.error("Signup error:", error);
      const message = error?.response?.data?.message || "Signup failed";
      alert(message);
    }
  };
  return (
    <div className="wd-signup-screen">
      <h1>Sign up</h1>
      <FormControl
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        className="wd-username b-2"
        placeholder="username"
      />
      <FormControl
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        className="wd-password mb-2"
        placeholder="password"
        type="password"
      />
      <FormControl
        id="wd-verify-password"
        placeholder="verify password"
        type="password"
        className="mb-2"
      />
      <button
        onClick={signup}
        className="wd-signup-btn btn btn-primary mb-2 w-100"
      >
        {" "}
        Sign up{" "}
      </button>
      <br />
      <Link href="/Account/Signin" className="wd-signin-link">
        Sign in
      </Link>
    </div>
  );
}
