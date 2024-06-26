"use client";

import { useSupabase } from "@/app/supabase-provider";
import { imgToBase64, compressImg } from "@/components/hooks/useOptimizeImage";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { v4 } from "uuid";
import { useRouter } from "next/navigation";
import { useToaster } from "@/components/hooks/useToaster";
import { CreatedToast } from "@/components/ToastComponents";
import Link from "next/link";

function CreatePost({ params: { username } }: any) {
  const { supabase, session } = useSupabase();
  const router = useRouter();
  const { awakeToaster } = useToaster();

  const [description, setDescription] = useState<string>();
  const [file, setFile] = useState<File>();
  const [compressFile, setCompressFile] = useState<File>();
  const [fileSrc, setFileSrc] = useState<string>();
  const [Base64Img, setBase64Img] = useState<string | ArrayBuffer>();
  const [loadingMessage, setLoadingMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    //turn image file to base64
    file && imgToBase64(file, (base64) => setBase64Img(base64));

    //compress file
    file &&
      compressImg(file, 800, (compressedImg) => setCompressFile(compressedImg));
  }, [file]);

  const onFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    console.log("resizing...");
    setLoadingMessage("resizing...");

    if (
      description === "" ||
      compressFile === undefined ||
      Base64Img === undefined ||
      session === null
    ) {
      setError("please fill all the fields");
      setLoadingMessage("");
      setLoading(false);
      return;
    }

    try {
      setLoadingMessage("uploading...");

      // upload image
      const { data: imageData, error: imageErr } = await supabase.storage
        .from("posts")
        .upload(session.user.id + "/" + v4(), compressFile);

      if (imageErr) {
        setLoading(false);
        setLoadingMessage("");
        throw new Error(imageErr.message);
      }

      //insert post

      setLoadingMessage("creating...");

      await supabase.from("posts").insert({
        creator_id: session?.user.id,
        image_path: imageData.path,
        image_thumbnail: Base64Img,
        description: description,
      });
    } catch (err) {
      console.log(err);
      setError(`${err}`);
      setLoading(false);
      setLoadingMessage("");
      return;
    }

    setLoadingMessage("redirecting...");
    awakeToaster(<CreatedToast />, "successful");
    router.replace("/");
    router.refresh();
  };

  return (
    <>
      <div className="h-full w-full flex flex-col items-center justify-center absolute px-12">
        {/* home button for large screens */}
        <Link className="absolute top-6 left-6 hidden lg:block" href="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 10 10"
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path
              d="M 1 5 L 5 1 L 9 5 V 9 H 6 V 6 H 4 V 9 H 1 Z"
              stroke="white"
              fill="transparent"
            />
          </svg>
        </Link>

        <form
          onSubmit={onFormSubmit}
          className="flex flex-col w-full items-center gap-6 rounded-md shadow-md max-w-[500px] sm:py-10 sm:px-6 sm:bg-platform sm:border-2 border-platform"
        >
          <h2 className="text-xl sm:text-2xl font-semibold">
            Create a Post for {username}
          </h2>

          <hr className="border-white border-[1px] w-[90%]" />

          {/* image input */}
          <div className="flex items-center justify-center w-full relative rounded-lg overflow-hidden">
            <label
              htmlFor="dropzone-file"
              className={`flex flex-col items-center justify-center w-full h-64 lg:h-[20rem] border-2 border-gray-500 border-dashed rounded-lg cursor-pointer z-10
                        bg-slate-950
                        ${fileSrc ? "bg-opacity-50" : "bg-opacity-0"}
                        hover:bg-opacity-50
                        transition-opacity`}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  aria-hidden="true"
                  className="w-10 h-10 mb-3 text-gray-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p className="mb-2 text-sm text-gray-200">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-200">PNG, JPG</p>
              </div>

              <input
                className="hidden"
                type="file"
                accept=".png , .jpg"
                id="dropzone-file"
                disabled={loading}
                onChange={async (e) => {
                  if (e.target.files) {
                    //compress the file and set the file
                    compressImg(e.target.files[0], 750, (compressedImg) => {
                      setFile(compressedImg);
                    });

                    //create a url for src
                    setFileSrc(URL.createObjectURL(e.target.files[0]));
                  }
                }}
              />
            </label>

            {/* show the selected image if any selected */}
            {fileSrc && (
              <>
                {/* blured version */}
                <Image
                  src={fileSrc}
                  height={100}
                  width={100}
                  alt="selected image"
                  style={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                    filter: "blur(24px)",
                    transform: "scale(1.5)",
                  }}
                />
                {/* original version */}
                <Image
                  src={fileSrc}
                  height={100}
                  width={100}
                  alt="selected image"
                  style={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    objectFit: "contain",
                  }}
                />
              </>
            )}
          </div>

          {/* description */}
          <textarea
            id="message"
            rows={4}
            className="block p-2.5 w-full text-sm text-stone-200 bg-transparent rounded-lg border border-gray-500 focus:ring-blue-500 focus:border-blue-500 "
            placeholder="Description..."
            value={description}
            disabled={loading}
            onChange={(e) => setDescription(e.target.value)}
          />

          {/* create */}
          <div className="w-full text-center">
            <motion.button
              className={`w-full py-2 bg-emerald-600 text-white text-xl font-semibold rounded-md px-16
                         ${loading ? "animate-pulse" : ""}`}
              whileTap={{ scale: 0.9 }}
              disabled={loading}
              type="submit"
            >
              {loading ? loadingMessage : "Create"}
            </motion.button>

            {error && (
              <span className="text-sm italic text-red-600">{error}</span>
            )}
          </div>
        </form>
      </div>
    </>
  );
}

export default CreatePost;
