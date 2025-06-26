"use client"

import { app } from "../../../firebaseConfig"
import { auth } from "../../../firebaseConfig"; 
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useToast } from "../../components/toasts/ToastProvider"
import { useRouter } from "next/navigation"
import { RootState } from "@/store/store"
import { useDispatch } from 'react-redux'
import Link from "next/link";
import { loggedUser } from "@/store/slice";

export default function Signin() {
  const dispatch = useDispatch()

  const { showToast } = useToast()

  const router = useRouter()
  
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  })

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, userData.email, userData.password)
      .then((res) => {
        if (!res.user.emailVerified) {
          showToast("Verify your email before loging in!", "error");
        } else {
          dispatch(loggedUser(res.user))
          showToast("Logged in successfully! You may now continue to your account!", "success");
          setTimeout(() => {
            router.push("/journal");
          }, 2000);
        }
      })
      .catch((error) => {
        if (error.code === "auth/invalid-email") {
          showToast("Hmm... that email looks sus 👀 Try a valid one!", "error");
        } else if (error.code === "auth/missing-password") {
          showToast("Yo you forgot the password 😭 Lock it up with a code! 🔐", "error");
        } else if (error.code === "auth/invalid-credential") {
          showToast("Those values looking weird 💀 Try again!", "error");
        } else {
          showToast("Bruhhh something broke 😵‍💫 Try again later!", "error");
        }
      });
  }
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden font-pixelify">
      <div 
        className="absolute inset-0 bg-cover bg-center blur-[2px] scale-105 bg-blur-image"
      ></div>

      <div className="relative z-10 bg-[#cc9d9b] backdrop-blur-sm border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] w-[340px] p-6 rounded-sm">
        <h2 className="text-2xl font-bold text-black text-center mb-6">Welcome Back!</h2>
        <form onSubmit={handleSignIn} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="bg-white border-2 border-black px-4 py-2 text-black placeholder-black outline-none focus:outline-none shadow-[2px_2px_0_0_rgba(0,0,0,1)]"
            onChange={(e) => setUserData((prev) => ({...prev, email: e.target.value}))}
          />
          <input
            type="password"
            placeholder="Password"
            className="bg-white border-2 border-black px-4 py-2 text-black placeholder-black outline-none focus:outline-none shadow-[2px_2px_0_0_rgba(0,0,0,1)]"
            onChange={(e) => setUserData((prev) => ({...prev, password: e.target.value}))}
          />
          <button
            type="submit"
            className="cursor-pointer bg-black text-[#e47472] py-2 font-bold mt-2 border-4 border-black shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:bg-[#e47472] hover:text-black transition-all duration-200"
          >
            Login
          </button>
        </form>

        <p className="text-center text-black text-sm mt-4">
          Don't have an account?{" "}
          <Link href="/signup" className="underline hover:text-[#242424]">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
