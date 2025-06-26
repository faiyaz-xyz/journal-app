"use client"

import { app } from "../../../firebaseConfig"
import { auth } from "../../../firebaseConfig"; 
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { useState } from "react";
import { useToast } from "../../components/toasts/ToastProvider"
import { useRouter } from "next/navigation"
import Link from "next/link";

export default function Signup() {
  const { showToast } = useToast()

  const router = useRouter()
  
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, userData.email, userData.password)
      .then((res) => {
        const user = res.user;

        updateProfile(user, {
          displayName: userData.name,
          photoURL: "../../../public/pfp.jpeg",
        })
          .then(() => {
            sendEmailVerification(user).then(() => {
              showToast(
                "You're all set! 💌 We sent a verification email. Don’t forget to check spam too!",
                "success"
              );
              setTimeout(() => {
                router.push("/login");
              }, 2000);
            });
          })
          .catch(() => {
            showToast("Hmm… couldn’t set your profile name. Try again later 😔", "error");
          });
      })
      .catch((error) => {
        if (error.code === "auth/missing-email") {
          showToast("Oops! You forgot to enter your email 😅", "error");
        } else if (error.code === "auth/invalid-email") {
          showToast("That email doesn't look right. Try a valid one 📧", "error");
        } else if (error.code === "auth/email-already-in-use") {
          showToast("Looks like you've already signed up! Try logging in instead 🫣", "error");
        } else if (error.code === "auth/missing-password") {
          showToast("Password’s missing! Gotta lock your secrets 🔐", "error");
        } else if (error.code === "auth/weak-password") {
          showToast("Password's too weak! At least 6 characters pls 💪", "error");
        } else {
          showToast("Something went wrong 😵 Please try again", "error");
        }
      });
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-between overflow-hidden">
      {/* Blurry Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center blur-[2px] scale-105 bg-blur-image"
      ></div>

      {/* Signup Card */}
      <div className="relative z-10 mt-36 bg-[#cc9d9b]/90 backdrop-blur-sm border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] w-[340px] p-6 rounded-sm">
        <h2 className="text-2xl font-bold text-black text-center mb-6">Create Account</h2>

        <form onSubmit={handleSignUp} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            className="bg-white border-2 border-black px-4 py-2 text-black placeholder-black outline-none shadow-[2px_2px_0_0_rgba(0,0,0,1)]"
            onChange={(e) => setUserData((prev) => ({...prev, name: e.target.value}))}
          />
          <input
            type="email"
            placeholder="Email"
            className="bg-white border-2 border-black px-4 py-2 text-black placeholder-black outline-none shadow-[2px_2px_0_0_rgba(0,0,0,1)]"
            onChange={(e) => setUserData((prev) => ({...prev, email: e.target.value}))}
          />
          <input
            type="password"
            placeholder="Password"
            className="bg-white border-2 border-black px-4 py-2 text-black placeholder-black outline-none shadow-[2px_2px_0_0_rgba(0,0,0,1)]"
            onChange={(e) => setUserData((prev) => ({...prev, password: e.target.value}))}
          />

          <button
            type="submit"
            className="cursor-pointer bg-black text-[#e47472] py-2 font-bold mt-2 border-4 border-black shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:bg-[#e47472] hover:text-black transition-all duration-200"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-black text-sm mt-4">
          Already have an account?{" "}
          <Link href="/login" className="underline hover:text-[#242424]">
            Login
          </Link>
        </p>
      </div>

      {/* Footer */}
      <footer className="relative z-10 w-full text-center py-6 text-sm text-black px-4">
        <p>
          By creating an account you agree to our{" "}
          <Link href="/terms" className="text-[#e47472] hover:text-[#d28180]">
            terms and conditions
          </Link>
          <span className="mx-2">and</span>
          <Link href="/privacy" className="text-[#e47472] hover:text-[#d28180]">
            privacy policy
          </Link>
        </p>
      </footer>
    </div>
  );
}
