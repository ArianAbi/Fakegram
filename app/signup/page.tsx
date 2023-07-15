"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSupabase } from '../supabase-provider';
import { useRouter } from "next/navigation";

export default function Signup() {

    const { supabase, session } = useSupabase()
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    const [usernameErr, setUsernameErr] = useState(false);
    const [emailErr, setEmailErr] = useState(false);
    const [passwordErr, setPasswordErr] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [accountCreated, setAccountCreated] = useState(false);

    const checkUsernameUnique = async () => {
        const { data } = await supabase.from('users').select('*').eq('user_name', username);
        if (data && data.length > 0) {
            setUsernameErr(true);
        } else {
            setUsernameErr(false)
        }
        return data;
    }

    useEffect(() => {
        checkUsernameUnique();

        if (password !== confirm) {
            setPasswordErr(true)
        } else {
            setPasswordErr(false)
        }
    }, [username, password, confirm])

    const onFormSubmit = async (e: any) => {
        e.preventDefault();
        setError("")
        // setLoading(true);

        //check for empty fields
        if (
            username === "" ||
            email === "" ||
            password === "" ||
            confirm === ""
        ) {
            setError("please fill all the fields")
            setLoading(false)
            return;
        }

        //check for password match
        if (password !== confirm) {
            setError("passwords don't match");
            setLoading(false)
            return;
        }
        //TODO : check if username is unique
        const data = await checkUsernameUnique()
        if (data && data.length > 0) {
            console.log('i confirm');
        }


        const { data: _signupData, error: _signupErr } = await supabase.auth.signUp({ email: email, password: password });
        const userId = _signupData.user?.id;
        const { error: _inserErr } = await supabase.from("users").insert([{ user_id: userId, user_name: username },])

        if (_signupErr) {
            setError(_signupErr.message)
            setLoading(false)
            return;
        }

        if (_inserErr) {
            if (_inserErr.code === '23505') {
                setError("this email is already signed")
                setLoading(false)
                setEmailErr(true)
                return;
            }
            setError('somthing went wrong :( try again later')
            setLoading(false)
            setEmailErr(false)
            return;
        }

        setLoading(false)
        setAccountCreated(true);
    }

    return (
        <>
            <div className="w-full h-full text-white flex flex-col items-center justify-center px-10 absolute">

                <form
                    className="shadow-md rounded-md w-full max-w-[468px] mx-auto p-5 flex flex-col gap-4 text-center"
                    onSubmit={onFormSubmit}
                >
                    <h1
                        className="text-lg font-semibold my-3"
                    >
                        Create a Fakegram Account
                    </h1>

                    {/* username */}
                    <div className="relative">
                        <input
                            className={`w-full py-2 pl-8 pr-3 transition-colors bg-transparent border-b-[1px] border-stone-600 focus-within:outline-none focus-within:border-white focus-within:border-b-2
                            ${usernameErr ? 'border-red-500' : ''}`}
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                        {/* email svg */}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="white" className="w-6 h-6 absolute left-0 top-[50%] translate-y-[-50%] stroke-stone-200">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>

                    </div>

                    {/* username Error */}
                    {
                        usernameErr ? <span className="text-red-500 text-sm italic my-1 ">username exists</span> : <></>
                    }

                    {/* email */}
                    <div className="relative">
                        <input
                            className={`w-full py-2 pl-8 pr-3 transition-colors bg-transparent border-b-[1px] border-stone-600 focus-within:outline-none focus-within:border-white focus-within:border-b-2
                            ${emailErr ? 'border-red-500' : ''}`}
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        {/* email svg */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" strokeWidth={1} stroke="white" className="w-6 h-6 absolute left-0 top-[50%] translate-y-[-50%] stroke-stone-200">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2z"></path>
                            <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                    </div>

                    {/* password */}
                    <div className="relative">
                        <input
                            className={`w-full py-2 pl-8 pr-3 transition-colors bg-transparent border-b-[1px] border-stone-600 focus-within:outline-none focus-within:border-white focus-within:border-b-2
                            ${passwordErr ? 'border-red-500' : ''}`}
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        {/* lock svg */}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="white" className="w-6 h-6 absolute left-0 top-[50%] translate-y-[-50%] stroke-stone-200">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                        </svg>
                    </div>

                    {/* confirm */}
                    <div className="relative">
                        <input
                            className={`w-full py-2 pl-8 pr-3 transition-colors bg-transparent border-b-[1px] border-stone-600 focus-within:outline-none focus-within:border-white focus-within:border-b-2
                            ${passwordErr ? 'border-red-500' : ''}`}
                            type="password"
                            placeholder="Password Confirm"
                            value={confirm}
                            onChange={e => setConfirm(e.target.value)}
                        />
                        {/* lock svg */}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="white" className="w-6 h-6 absolute left-0 top-[50%] translate-y-[-50%] stroke-stone-200">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                        </svg>
                    </div>

                    {/* password error */}
                    {
                        passwordErr ? <span className="text-red-500 text-sm italic my-1 ">passwords dont match</span> : <></>
                    }

                    {/* error */}
                    {
                        error ? <span className="text-red-500 text-sm italic my-1 ">{error}</span> : <></>
                    }

                    {/* login */}
                    <button
                        className={`
                        w-full py-2 bg-emerald-600 text-white text-xl font-semibold rounded-md mt-2 
                        ${loading ? "bg-opacity-80 animate-pulse" : ""}
                        `}
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Creating..." : "Create Account"}
                    </button>
                </form>

                {/* login */}
                <span className="w-full text-center flex items-center justify-center gap-1 text-sm">
                    you have an account ?
                    <Link
                        className="text-cyan-600"
                        href="/login"
                    >
                        Login
                    </Link>
                </span>
            </div>

            {/* created succsess */}
            {
                accountCreated &&
                <div className="flex items-center justify-center bg-black bg-opacity-75 left-0 top-0 absolute w-full h-full z-10">

                    <div className="flex flex-col gap-4 items-center justify-center border-[1px] border-stone-600 bg-black bg-opacity-70 px-6 py-10 rounded-md shadow-md">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                            <path className="stroke-emerald-400" strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>

                        <div className="font-semibold text-emerald-400">
                            Check Your Email for Verification
                        </div>

                        <button
                            className="bg-emerald-600 text-white font-semibold text-base p-2 rounded-md shadow-md"
                            onClick={() => {
                                router.replace('/')
                            }}
                        >
                            Go Home
                        </button>
                    </div>
                </div>
            }
        </>
    )
}