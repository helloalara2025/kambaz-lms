"use client";
import * as client from "./client";
import { useEffect, useState, useCallback } from "react";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";

export default function Session({ children }: { children: any }) {
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();

  const fetchProfile = useCallback(async () => {
    try {
      const currentUser = await client.profile();
      dispatch(setCurrentUser(currentUser));
    } catch (err: any) {
      if (err?.response?.status !== 401) {
        console.error("An unexpected error occurred during profile fetch:", err);
      }
    }
    setPending(false);
  }, [dispatch]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);
  if (!pending) {
    return children;
  }
}

