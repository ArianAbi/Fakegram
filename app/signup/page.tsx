import Link from "next/link";

export default function Signup() {

    return (
        <>
            <div className="relative h-screen flex flex-col items-center justify-center px-10">

                <Link
                    href={'/'}
                    className="absolute text-white left-4 top-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                </Link>

                <form
                    className="shadow-md rounded-md w-full bg-white p-5 flex flex-col text-center"
                >
                    <h1
                        className="text-lg font-semibold my-3"
                    >
                        Create Fakegram Account
                    </h1>

                    {/* username */}
                    <input
                        className="py-2 px-3 rounded-md outline outline-1 outline-gray-400 my-3"
                        type="text"
                        placeholder="username"
                    />

                    {/* email */}
                    <input
                        className="py-2 px-3 rounded-md outline outline-1 outline-gray-400 my-3"
                        type="email"
                        placeholder="email"
                    />

                    {/* password */}
                    <input
                        className="py-2 px-3 rounded-md outline outline-1 outline-gray-400 my-3"
                        type="password"
                        placeholder="password"
                    />

                    {/* confirm */}
                    <input
                        className="py-2 px-3 rounded-md outline outline-1 outline-gray-400 my-3"
                        type="password"
                        placeholder="confirm"
                    />

                    {/* login */}
                    <button
                        className='w-full py-2 bg-emerald-600 text-white text-xl font-semibold rounded-md mt-2'
                        type="submit"
                    >
                        Create Account
                    </button>
                </form>
            </div>

            {/* created succsess */}
            {/* <div className="flex items-center justify-center bg-black bg-opacity-75 left-0 top-0 absolute w-full h-full z-10">

                <div className="flex flex-col gap-4 items-center justify-center bg-white px-6 py-10 rounded-md shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                        <path className="stroke-green-600" strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>

                    <div className="font-semibold text-green-600">
                        Check Your Email for Verification
                    </div>

                    <button
                        className="bg-green-600 text-white font-semibold text-base p-2 rounded-md shadow-md"
                    >
                        Go Home
                    </button>
                </div>
            </div> */}
        </>
    )
}