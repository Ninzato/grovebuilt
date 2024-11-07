"use client";

import Link from "next/link";
import { merriweather } from "../../fonts/fonts";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Warning } from "@mui/icons-material";

export default function Register() {
  const [input, setInput] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const router = useRouter();
  const inputStyle =
    "p-5 border-gray-300 outline-none focus:border-black active:border-black focus:outline-none transition-colors duration-200 without-ring";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      if (response.ok) {
        router.push("/login");
      } else {
        setInput({
          name: "",
          username: "",
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
    <div className="max-w-screen-xl flex justify-center items-center h-[calc(100vh-72px)] md:h-[calc(100vh-64px)] px-8 mx-auto">
      <div className="flex flex-col text-center gap-5 w-full md:w-1/2">
        <h1 className={`${merriweather.className} text-5xl font-bold`}>
          Register
        </h1>
        <h2 className="mb-5">Please fill in the fields below</h2>
        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4">
          <input
            type="text"
            className={inputStyle}
            placeholder="Full name"
            value={input.name}
            onChange={(e) => setInput({ ...input, name: e.target.value })}
          />
          <input
            type="text"
            className={inputStyle}
            placeholder="Username"
            value={input.username}
            onChange={(e) => setInput({ ...input, username: e.target.value })}
          />
          <input
            type="email"
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
            CREATE ACCOUNT
          </button>
        </form>
        <p className="font-light">
          Already have an account?{" "}
          <Link
            href="/login"
            className="underline underline-offset-2 hover:font-normal"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
