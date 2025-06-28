"use client"

import React, { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

interface JournalEntryProps {
  params: { date: string }; // date is like june282025 from URL
}

export default function JournalEntry({ params }: JournalEntryProps) {
  const userData = useSelector((state: any) => state.userData.user);
  const router = useRouter();
  const { date } = params;

  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  // Load journal content on mount
  useEffect(() => {
    if (!userData) return;

    const fetchJournal = async () => {
      const docRef = doc(db, "journals", userData.uid, "entries", date);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setContent(docSnap.data().content || "");
      }
      setLoading(false);
    };

    fetchJournal();
  }, [userData, date]);

  // Auto-save on content change, debounced (500ms delay)
  useEffect(() => {
    if (!userData || loading) return;

    const timeout = setTimeout(async () => {
      const docRef = doc(db, "journals", userData.uid, "entries", date);
      await setDoc(docRef, { content }, { merge: true });
    }, 500);

    return () => clearTimeout(timeout);
  }, [content, userData, date, loading]);

  if (!userData) {
    router.push("/login");
    return null;
  }

  if (loading) {
    return <div className="pixel-font text-center mt-20">Loading your journal...</div>;
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] p-8 flex flex-col max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 pixel-font">{date.toUpperCase()}</h2>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your thoughts here..."
        className="w-full h-[60vh] p-4 text-black bg-white border-4 border-black rounded-sm font-pixel resize-none shadow-lg outline-none focus:ring-4 focus:ring-[#e47472]"
        spellCheck={false}
      />

      <button
        onClick={() => router.push("/journal")}
        className="mt-6 self-start bg-black text-[#e47472] font-bold px-6 py-2 border-4 border-black shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:bg-[#e47472] hover:text-black transition-all duration-200 rounded pixel-font"
      >
        Go Back
      </button>
    </div>
  );
}
