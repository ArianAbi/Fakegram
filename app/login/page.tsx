"use client";

import { useSupabase } from "../supabase-provider";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { useToaster } from "@/components/hooks/useToaster";
import {
  FeatureNotAvailableToast,
  LoginWelcomeToast,
  SomethingWentWrongToast,
} from "@/components/ToastComponents";

export default function Login() {
  const { supabase, session } = useSupabase();
  const { awakeToaster } = useToaster();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loginAsGuest = async () => {
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: process.env.NEXT_PUBLIC_GUEST_EMAIL!,
      password: process.env.NEXT_PUBLIC_GUEST_PASSWORD!,
    });

    if (error) {
      awakeToaster(<SomethingWentWrongToast />, "danger");
      setLoading(false);
      return;
    }

    awakeToaster(<LoginWelcomeToast username="Fakegram Guest" />);
    router.replace("/");
  };

  const onFormSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!email || !password) {
      setError("please fill the fields");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    console.log(`welcome ${data.user?.email}`);
    router.replace("/");
  };

  return (
    <>
      <div className="h-full w-full text-black flex flex-col items-center justify-center px-10 absolute">
        <form
          onSubmit={onFormSubmit}
          className={`w-full p-5 flex flex-col gap-6 text-white max-w-[468px] sm:bg-platform sm:border-2 border-platform sm:py-10 sm:px-6 rounded-lg ${
            loading ? "animate-pulse" : ""
          }`}
        >
          {/* Login as a guest */}
          <button
            className="relative w-full py-2 rounded-md bg-stone-100 text-black font-semibold"
            onClick={() => loginAsGuest()}
            type="button"
            disabled={loading}
          >
            {/* guest svg */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="black"
              viewBox="0 0 24 24"
              strokeWidth={0}
              stroke="currentColor"
              className="w-6 h-6 absolute left-2 top-[50%] translate-y-[-50%]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
            Login As a Guest
          </button>

          {/* divider */}
          <div className="relative text-center">
            <div className="w-full h-[1px] bg-white opacity-50"></div>
            <span className="absolute top-0 translate-x-[-50%] translate-y-[-50%] bg-black sm:bg-platform px-2 font-semibold">
              or
            </span>
          </div>

          {/* email */}
          <div className="relative">
            <input
              className="w-full py-2 pl-8 pr-3 transition-colors bg-transparent border-b-[1px] border-stone-600 focus-within:outline-none focus-within:border-white focus-within:border-b-2"
              type="text"
              placeholder="Email"
              value={email}
              disabled={loading}
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* email svg */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth={1}
              stroke="white"
              className="w-6 h-6 absolute left-0 top-[50%] translate-y-[-50%] stroke-stone-200"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </div>

          {/* password */}
          <div className="relative">
            <input
              className="w-full py-2 pl-8 pr-3 transition-colors bg-transparent border-b-[1px] border-stone-600 focus-within:outline-none focus-within:border-white focus-within:border-b-2"
              type="password"
              placeholder="Password"
              value={password}
              disabled={loading}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* lock svg */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="white"
              className="w-6 h-6 absolute left-0 top-[50%] translate-y-[-50%] stroke-stone-200"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          </div>

          {/* login */}
          <div className="text-center">
            <button
              className={`w-full py-2 bg-emerald-600 text-white text-xl font-semibold rounded-md
                            ${loading ? "animate-pulse" : ""}
                            `}
              disabled={loading}
              type="submit"
            >
              {loading ? "loading..." : "Login"}
            </button>

            {error && (
              <span className="text-sm italic text-red-500">{error}</span>
            )}
          </div>

          <div className="flex flex-col items-center justify-center gap-4">
            {/* signup */}
            <span className="w-full text-center flex items-center justify-center gap-1 text-sm">
              don&apos;t have an account ?
              <Link className="text-cyan-600" href="/signup">
                SignUp
              </Link>
            </span>

            {/* guest login message */}
            <span className="w-full text-center text-stone-500 text-sm">
              or click on{" "}
              <span className="italic text-[0.9rem] text-stone-300">
                Login As a Guest
              </span>{" "}
              button to login with premade account
            </span>
          </div>
        </form>
      </div>
    </>
  );
}
