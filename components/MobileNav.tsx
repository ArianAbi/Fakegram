import Link from "next/link";
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { headers, cookies } from 'next/headers'

const MobileNav = async () => {

    const supabase = createServerComponentSupabaseClient({
        headers,
        cookies,
    })
    const user = (await supabase.auth.getUser()).data.user
    const { data: _username } = await supabase.from('users').select('user_name').eq('user_id', user?.id)

    return (
        <>
            <div className="fixed bottom-0 left-0 w-full text-center h-[70px] bg-black bg-opacity-80 backdrop-blur-lg text-white font-semibold
            grid grid-cols-3 divide-x-2 py-4 divide-white divide-opacity-50 z-10 
            border-t-[1px] border-white border-opacity-40">

                {/* home */}
                <div className="w-full h-full flex items-center justify-center">

                    <Link href="/">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                            className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                    </Link>

                </div>

                {/* create */}
                <div className="w-full h-full flex items-center justify-center">

                    <Link
                        href={
                            user === null || undefined ? '/login'
                                : `/${_username && _username[0].user_name}/create`
                        }
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                            className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </Link>

                </div>

                {/* dashbord */}
                <div className="w-full h-full flex items-center justify-center">

                    <Link
                        href={
                            user === null || undefined ? '/login'
                                : `/${_username && _username[0].user_name}`
                        }
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                            className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </Link>

                </div>
            </div>
        </>
    )
}

export default MobileNav as any