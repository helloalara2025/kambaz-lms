// This is the redirect page for signup
"use client";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function AccountPage() {
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  if (!currentUser) {
    redirect("/Account/Signin");
  } else {
    redirect("/Account/Profile");
  }
}
