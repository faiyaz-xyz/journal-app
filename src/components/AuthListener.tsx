"use client"
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useDispatch } from "react-redux";
import { loggedUser } from "@/store/slice";

export default function AuthListener({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(loggedUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL
        }));
      } else {
        dispatch(loggedUser(null));
      }
      setLoading(false); // auth status confirmed
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    // block page until Firebase confirms status
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <p className="text-lg font-bold">Loading...</p>
      </div>
    );
  }

  return <>{children}</>;
}
