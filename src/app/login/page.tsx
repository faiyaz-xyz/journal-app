import Link from "next/link";

export default function Signup() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden font-pixelify">
      <div
        className="absolute inset-0 bg-cover bg-center blur-[2px] scale-105"
        style={{ backgroundImage: "url('/background.png')" }}
      ></div>

      <div className="relative z-10 bg-[#cc9d9b] backdrop-blur-sm border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] w-[340px] p-6 rounded-sm">
        <h2 className="text-2xl font-bold text-black text-center mb-6">Welcome Back!</h2>
        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="bg-white border-2 border-black px-4 py-2 text-black placeholder-black outline-none focus:outline-none shadow-[2px_2px_0_0_rgba(0,0,0,1)]"
          />
          <input
            type="password"
            placeholder="Password"
            className="bg-white border-2 border-black px-4 py-2 text-black placeholder-black outline-none focus:outline-none shadow-[2px_2px_0_0_rgba(0,0,0,1)]"
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
