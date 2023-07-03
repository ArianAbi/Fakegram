'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import { useSupabase } from "@/app/supabase-provider"
import { usePathname, useRouter } from "next/navigation"
import { revalidatePath } from "next/cache"

export const Header = () => {

    const loginRoute = "login"
    const signupRoute = "signup"
    const createRoute = "create"
    const pathname = usePathname().split('/')
    const router = useRouter()

    const { supabase, session } = useSupabase()

    const [loggingOut, setLoggingOut] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    const toggleDialog = () => {
        setDialogOpen(!dialogOpen)
    }

    const [isHeaderVisible, setHeaderVisible] = useState(true);
    const [prevScrollPos, setPrevScrollPos] = useState(0);

    useEffect(() => {

        const handleScroll = () => {
            const currentScrollPos: number = window.scrollY;

            //threshold is the height of the header
            const threshold = 55;

            const visible: boolean = prevScrollPos > currentScrollPos || currentScrollPos < threshold;

            setPrevScrollPos(currentScrollPos);
            setHeaderVisible(visible);
        };
        window.addEventListener('scroll', handleScroll);

    }, [prevScrollPos]);

    const logout = async () => {
        try {
            setLoggingOut(true)
            await supabase.auth.signOut();
            console.log("logged out");
            setLoggingOut(false)
            setDialogOpen(false)
            revalidatePath('/')
            router.replace('/');
        } catch (err) {
            console.log(err);
            setLoggingOut(false)
            setDialogOpen(false)
        }
    }

    if (
        pathname[pathname.length - 1] === loginRoute ||
        pathname[pathname.length - 1] === signupRoute ||
        pathname[pathname.length - 1] === createRoute
    ) {
        return <></>
    }
    return (
        <>
            {/* adds the header space back to DOM */}
            <div className={`w-full h-[55px]`}></div>

            <header className={`fixed flex items-center w-full h-[55px] text-white bg-black bg-opacity-80 backdrop-blur-xl border-b-[1px] border-stone-500 justify-between text-center p-3 z-40 transition-all duration-150 ${isHeaderVisible ? 'top-0' : '-top-16'}`} >
                <div className="text-xl font-bold text-left">
                    <Link href="/">
                        Logo
                    </Link>
                </div>

                <div className="flex items-center justify-center gap-4">
                    {/* github link and icon */}
                    <Link
                        href='https://github.com/ArianAbi/Fakegram'
                        target="_blank"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path className="fill-white" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                    </Link>

                    {/* loging button */}
                    {!session?.user &&
                        <div className="text-right pl-4 border-l-[1px] border-stone-600">
                            <Link href='/login'>
                                Login
                            </Link>
                        </div>
                    }

                    {/* logout button */}
                    {session?.user &&
                        <button
                            className="text-right pl-4 border-l-[1px] border-stone-600"
                            onClick={toggleDialog}
                        >
                            logout
                        </button>
                    }
                </div>

            </header>

            {dialogOpen &&
                <>
                    {/* backdrop */}
                    <div
                        className="absolute flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm w-full h-full z-40"
                        onClick={toggleDialog}
                    >
                        {/* dialogBox */}
                        <div className="flex flex-col items-center justify-center gap-6 p-8 bg-slate-800 text-white rounded-md">
                            <h2 className="text-lg font-semibold">
                                Logout?
                            </h2>

                            <div className="flex gap-4 ">
                                <button
                                    className="w-[100px] text-white border-2 border-white py-2 rounded-md font-semibold"
                                    onClick={toggleDialog}
                                    disabled={loggingOut}
                                >
                                    cancel
                                </button>

                                <button
                                    className="w-[100px] bg-red-500 text-white rounded-md font-semibold"
                                    onClick={logout}
                                    disabled={loggingOut}
                                >
                                    {loggingOut ? "logging out" : "logout"}
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}