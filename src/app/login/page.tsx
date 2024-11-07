"use client";

import Link from "next/link";
import { merriweather } from "../../fonts/fonts";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "react-toastify";
import { Warning } from "@mui/icons-material";

export default function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { setIsLoggedIn } = useAuth();

  const router = useRouter();
  const inputStyle =
    "p-5 border-gray-300 outline-none focus:border-black active:border-black focus:outline-none transition-colors duration-200 without-ring";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      if (response.ok) {
        setIsLoggedIn(true);
        router.push("/");
      } else {
        setInput({
          email: "",
          password: "",
        });
        const errorData = await response.json();
        throw errorData;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Error:", err.message);
      toast.error(err.message, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: "rounded-none",
        icon: () => <Warning />,
      });
    }
  };
  return (
    <div className="max-w-screen-xl flex justify-center items-center  h-[calc(100vh-72px)] md:h-[calc(100vh-64px)] px-8 mx-auto">
      <div className="flex flex-col text-center gap-5 w-full md:w-1/2">
        <h1 className={`${merriweather.className} text-5xl font-bold`}>
          Login
        </h1>
        <h2 className="mb-5">Please enter your email and password</h2>
        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4">
          <input
            type="text"
            className={inputStyle}
            placeholder="E-mail"
            value={input.email}
            onChange={(e) => setInput({ ...input, email: e.target.value })}
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className={`${inputStyle} pr-10 w-full`}
              placeholder="Password"
              value={input.password}
              onChange={(e) => setInput({ ...input, password: e.target.value })}
            />
            <span
              className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <span className="material-symbols-outlined">visibility</span>
              ) : (
                <span className="material-symbols-outlined">
                  visibility_off
                </span>
              )}
            </span>
          </div>
          <button
            type="submit"
            className="bg-black text-white py-5 tracking-widest hover:opacity-90"
          >
            LOGIN
          </button>
        </form>
        <p className="font-light">
          Never been here before?{" "}
          <Link
            href="/register"
            className="underline underline-offset-2 hover:font-normal"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
