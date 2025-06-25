"use client"

import Link from "next/link";
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { useToast } from "../../components/toasts/ToastProvider"
import router from "next/router";

export default function Signup() {
  
  const auth = getAuth();

  const { showToast } = useToast()
  
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, userData.email, userData.password)
    .then((res) => {
      const user =res.user

      updateProfile(user, {
        displayName: userData.name, 
        photoURL: "../../../public/pfp.jpg"
      })
        .then(() => {
          sendEmailVerification(user)
            .then(() => {
              showToast("Signed up successfully. Please verify your email", "success")
              setTimeout(() => {              
                router.push("/login");
              }, 1500);
            });
        }).catch((error) => {
          
        });
    })
    .catch((error) => {
      console.log(error.code)
      console.log(error.message)
      if (error.code === "auth/missing-email") {
        showToast("Email is required", "error")
      }
      if (error.code === "auth/weak-password") {
        showToast("Password should be at least 6 characters", "error")
      }
      if (error.code === "auth/invalid-email") {
        showToast("Email is invalid. Please enter a valid email.", "error")
      }
      if (error.code === "auth/email-already-in-use") {
        showToast("Email has been used before. Please login.", "error")
      }
      if (error.code === "auth/missing-password") {
        showToast("Password is required", "error")
      }
    });
  }
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-between overflow-hidden">
      {/* Blurry Background */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-[2px] scale-105"
        style={{ backgroundImage: "url('/background.png')" }}
      ></div>

      {/* Signup Card */}
      <div className="relative z-10 mt-36 bg-[#cc9d9b]/90 backdrop-blur-sm border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] w-[340px] p-6 rounded-sm">
        <h2 className="text-2xl font-bold text-black text-center mb-6">Create Account</h2>

        <form className="flex flex-col gap-4">
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
            onClick={handleSignUp}
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
