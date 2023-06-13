'use client'

import { useSupabase } from "@/app/supabase-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { imgToBase64, compressImg } from "@/components/hooks/useOptimizeImage";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { uuid } from "uuidv4";
import { v4 } from 'uuid'
import { Link } from "lucide-react";
import { revalidatePath } from "next/cache";

function CreatePost({ params: { username } }: any) {

    const router = useRouter()

    const { supabase, session } = useSupabase();

    const [description, setDescription] = useState<string>();
    const [file, setFile] = useState<File>();
    const [fileSrc, setFileSrc] = useState<string>()
    const [Base64Img, setBase64Img] = useState<string | ArrayBuffer>()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("");

    //turn image file to base64
    useEffect(() => {
        file && imgToBase64(file, (base64) => {
            setBase64Img(base64)
        })

    }, [file])

    const onFormSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setError("")
        setLoading(true)

        if (
            description === "" ||
            file === undefined ||
            Base64Img === undefined ||
            session?.user === null
        ) {
            setError("please fill all the fields");
            setLoading(false)
            return;
        }

        console.log('im here');

        // upload image
        const { data: imageData, error: imageError } = await supabase.storage
            .from('posts')
            .upload(session?.user.id + '/' + v4(), file)

        if (imageError) {
            console.log(imageError);
            setError(imageError.message)
            setLoading(false)
            return
        }

        // insert post
        try {
            await supabase.from('posts').insert(
                {
                    creator_id: session?.user.id,
                    image_path: imageData.path,
                    image_thumbnail: Base64Img,
                    description: description
                }
            )
        } catch (err) {
            console.log(err);
            setError(`${err}`);
            setLoading(false)
            return;
        }

        revalidatePath('/')
        router.replace('/')
    }

    return (
        <>
            <div className="h-full w-full flex flex-col justify-center absolute px-12">

                <Link
                    href={'/'}
                    className="absolute text-white left-4 top-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                </Link>

                <form
                    onSubmit={onFormSubmit}
                    className="flex flex-col w-full items-center gap-6 rounded-md shadow-md"
                >
                    <h2 className="text-2xl font-semibold">
                        Create New Post
                    </h2>

                    <hr className="border-white border-[1px] w-[90%]" />

                    {/* image input */}
                    <div className="flex items-center justify-center w-full relative rounded-lg overflow-hidden">
                        <label htmlFor="dropzone-file"
                            className={`flex flex-col items-center justify-center w-full h-64 border-2 border-gray-500 border-dashed rounded-lg cursor-pointer z-10
                        bg-slate-950
                        ${fileSrc ? 'bg-opacity-50' : 'bg-opacity-0'}
                        hover:bg-opacity-50
                        transition-opacity`}>

                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                <p className="mb-2 text-sm text-gray-200">
                                    <span className="font-semibold">
                                        Click to upload
                                    </span> or drag and drop
                                </p>
                                <p className="text-xs text-gray-200">PNG, JPG</p>
                            </div>

                            <Input
                                className="hidden"
                                type="file"
                                accept=".png , .jpg"
                                id="dropzone-file"
                                onChange={async (e) => {
                                    if (e.target.files) {
                                        //compress the file and set the file
                                        compressImg(e.target.files[0], 750, (compressedImg) => {
                                            setFile(compressedImg)
                                        })

                                        //create a url for src
                                        setFileSrc(URL.createObjectURL(e.target.files[0]))
                                    }
                                }}
                            />

                        </label>

                        {/* show the selected image if any selected */}
                        {fileSrc &&
                            <>
                                {/* blured version */}
                                <Image
                                    src={fileSrc}
                                    height={100}
                                    width={100}
                                    alt="selected image"
                                    style={{ position: 'absolute', height: '100%', width: '100%', objectFit: 'cover', filter: 'blur(24px)', transform: 'scale(1.5)' }}
                                />
                                {/* original version */}
                                <Image
                                    src={fileSrc}
                                    height={100}
                                    width={100}
                                    alt="selected image"
                                    style={{ position: 'absolute', height: '100%', width: '100%', objectFit: 'contain' }}
                                />
                            </>
                        }

                    </div>

                    {/* description */}
                    <textarea
                        id="message"
                        rows={4}
                        className="block p-2.5 w-full text-sm text-stone-200 bg-transparent rounded-lg border border-gray-500 focus:ring-blue-500 focus:border-blue-500 "
                        placeholder="Description..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    {/* create */}
                    <div className="w-full text-center">
                        <Button
                            className={`py-2 bg-emerald-600 text-white text-xl font-semibold rounded-md px-16
                         ${loading ? "animate-pulse" : ""}`}
                            disabled={loading}
                            type="submit"
                        >
                            {loading ? "uploading..." : "Create"}
                        </Button>

                        {error && <span className="text-sm italic text-red-600">{error}</span>}
                    </div>
                </form>
            </div>
        </>
    )
}

export default CreatePost