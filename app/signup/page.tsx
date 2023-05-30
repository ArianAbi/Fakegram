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
            <div className="relative text-black h-screen flex flex-col items-center justify-center px-10">

                <Link
                    href={'/'}
                    className="absolute text-white left-4 top-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                </Link>

                <form
                    className="shadow-md rounded-md w-full bg-white p-5 flex flex-col text-center"
                    onSubmit={onFormSubmit}
                >
                    <h1
                        className="text-lg font-semibold my-3"
                    >
                        Create Fakegram Account
                    </h1>

                    {/* username */}
                    <input
                        className={`py-2 px-3 rounded-md outline outline-1 outline-gray-400 my-3 
                        ${usernameErr ? "outline-red-500" : ''}`}
                        type="text"
                        placeholder="username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />

                    {/* username Error */}
                    {
                        usernameErr ? <span className="text-red-500 text-sm italic my-1 ">username exists</span> : <></>
                    }

                    {/* email */}
                    <input
                        className={`py-2 px-3 rounded-md outline outline-1 outline-gray-400 my-3 
                        ${emailErr ? "outline-red-500" : ''}`}
                        type="email"
                        placeholder="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    {/* password */}
                    <input
                        className={`py-2 px-3 rounded-md outline outline-1 outline-gray-400 my-3 
                        ${passwordErr ? "outline-red-500" : ''}`}
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                    {/* confirm */}
                    <input
                        className={`py-2 px-3 rounded-md outline outline-1 outline-gray-400 my-3 
                        ${passwordErr ? "outline-red-500" : ''}`}
                        type="password"
                        placeholder="confirm"
                        value={confirm}
                        onChange={e => setConfirm(e.target.value)}
                    />

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
            </div>

            {/* created succsess */}
            {
                accountCreated &&
                <div className="flex items-center justify-center bg-black bg-opacity-75 left-0 top-0 absolute w-full h-full z-10">

                    <div className="flex flex-col gap-4 items-center justify-center bg-white px-6 py-10 rounded-md shadow-md">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                            <path className="stroke-green-600" strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>

                        <div className="font-semibold text-green-600">
                            Check Your Email for Verification
                        </div>

                        <button
                            className="bg-green-600 text-white font-semibold text-base p-2 rounded-md shadow-md"
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