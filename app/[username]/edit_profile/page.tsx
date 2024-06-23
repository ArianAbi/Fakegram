"use client";

import { useEffect, useState } from "react";
import ProfilePictureUI from "@/components/ProfilePictureUI";
import { useSupabase } from "@/app/supabase-provider";
import DialogBox from "@/components/DialogBox";
import { motion } from "framer-motion";
import Image from "next/image";
import { compressImg } from "@/components/hooks/useOptimizeImage";
import { v4 } from "uuid";
import { useRouter } from "next/navigation";

export default function EditProfile({
  params: { username },
}: {
  params: { username: string };
}) {
  const { supabase, session } = useSupabase();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [disableSaveButton, setDisableSaveButton] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [newUsername, setNewUsername] = useState(username);
  const [profilePicturePublicUrl, setProfilePicturePublicUrl] = useState<
    null | string
  >(null);
  const [profilePictureStorageUrl, setProfilePictureStorageUrl] = useState<
    null | string
  >(null);
  const [bio, setBio] = useState("");

  const [profilePhotoDialog, setProfilePhotoDialog] = useState(false);
  const [fileSrc, setFileSrc] = useState<string>();
  const [compressFile, setCompressFile] = useState<File>();

  const [newUsernameError, setNewUsernameError] = useState<null | boolean>(
    null
  );

  //changing the value of this should recall the useEffect to get the user image
  const [imageUpdater, setImageUpdater] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await supabase
          .from("users")
          .select("*")
          .eq("user_name", username);

        if (!data) {
          setLoading(false);
          return;
        }
        if (data[0].user_profile_picture_url === null) {
          setProfilePicturePublicUrl(null);
          setProfilePictureStorageUrl(null);
          setLoading(false);
          return;
        }

        setProfilePictureStorageUrl(data[0].user_profile_picture_url);

        const { data: _imageUrl } = await supabase.storage
          .from("profile_picture")
          .getPublicUrl(data[0].user_profile_picture_url);

        setBio(data[0].user_bio);
        setProfilePicturePublicUrl(_imageUrl.publicUrl);

        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    })();
  }, [imageUpdater]);

  //check for username uniqueness
  useEffect(() => {
    setDisableSaveButton(true);
    const delayDebounceFn = setTimeout(async () => {
      const { data: thisUsernameExists } = await supabase
        .from("users")
        .select("*")
        .eq("user_name", newUsername);

      if (
        thisUsernameExists &&
        thisUsernameExists.length > 0 &&
        thisUsernameExists[0].user_name !== username
      ) {
        console.log("This Cannot Be Used");
        setNewUsernameError(true);
      } else {
        setNewUsernameError(false);
      }
      setDisableSaveButton(false);
    }, 800);

    return () => clearTimeout(delayDebounceFn);
  }, [newUsername]);

  const UploadProfilePicture = async () => {
    setLoading(true);
    console.log("resizing...");

    if (compressFile === undefined || session === null) {
      console.log("no Image");
      console.log(compressFile);

      setLoading(false);
      return;
    }

    try {
      console.log("Uploading...");

      // upload image
      const { data: imageData, error: imageErr } = await supabase.storage
        .from("profile_picture")
        .upload(`${session.user.id}/profile_${v4()}`, compressFile);

      if (imageErr) {
        setLoading(false);
        console.log("image Error");
        console.log(imageErr);

        throw new Error(imageErr.message);
      }

      if (!imageData.path) {
        console.log("image upload failed");
        throw new Error("image upload failed");
      }

      //insert post
      console.log("Updating the column...");

      console.log(session.user.id);

      await supabase
        .from("users")
        .update({ user_profile_picture_url: imageData.path })
        .eq("user_id", session.user.id);

      setImageUpdater((prev) => prev + 1);
    } catch (err) {
      console.log(err);
      setLoading(false);
      return;
    }

    console.log("done");

    setProfilePhotoDialog(false);
    setLoading(false);
  };

  const DeleteProfilePicture = async () => {
    if (!session) return;
    if (!profilePictureStorageUrl) return;

    const { error: _user_column_delete_error } = await supabase
      .from("users")
      .update({ user_profile_picture_url: null })
      .eq("user_id", session.user.id);

    if (_user_column_delete_error) {
      console.log("Deleting Failed");
      return;
    }

    const data = supabase.storage
      .from("profile_picture")
      .remove([profilePictureStorageUrl]);

    console.log("Profile Deleted");
  };

  const UpdateBio = async (bio: string) => {
    if (!session) throw new Error("no session");
    const { error } = await supabase
      .from("users")
      .update({ user_bio: bio })
      .eq("user_id", session.user.id);

    if (error) {
      throw new Error(error.message);
    }
  };

  const UpdateUsername = async (new_usernaem: string) => {
    if (newUsernameError || new_usernaem.length === 0 || !session) {
      throw new Error("Something Went Wrong While Updating The Username");
    }
    const { error } = await supabase
      .from("users")
      .update({ user_name: new_usernaem })
      .eq("user_id", session.user.id);

    if (error) {
      throw new Error(error.message);
    }
  };

  return (
    <>
      <div className="sm:bg-platform sm:border-platform sm:border-2 mx-auto py-4 sm:py-12 px-6 mt-8 w-full max-w-lg rounded-lg">
        {/* edit profile picture */}
        <div className="flex flex-col gap-4 items-center justify-start relative">
          <h2 className="text-lg font-semibold mb-4">{username}</h2>

          <div className="w-32 aspect-square relative">
            <ProfilePictureUI
              loading={loading}
              profilePictureUrl={profilePicturePublicUrl}
              key={fileSrc}
            />

            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              disabled={profilePicturePublicUrl !== null ? false : true}
              className="flex items-center justify-between bg-transparent absolute -right-10 top-2"
              onClick={() => setDeleteDialogOpen(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </motion.button>
          </div>
          <button
            onClick={() => setProfilePhotoDialog(true)}
            className="bg-white text-black py-2 px-4 rounded-md font-semibold text-sm hover:scale-105 transition-all duration-150"
          >
            Edit Profile Picture
          </button>
        </div>

        <hr className="mt-8 border-stone-500" />

        {/* bio/username */}
        <div className="my-8 flex flex-col gap-4 items-center justify-start">
          <div className="w-full">
            <input
              className={`w-full py-2 px-3 transition-colors bg-transparent border-b-[1px] focus-within:outline-none focus-within:border-white focus-within:border-b-2
                ${
                  newUsernameError === true || newUsername.length === 0
                    ? "border-red-500 focus-within:border-red-400"
                    : "border-emerald-500 focus-within:border-emerald-400"
                }`}
              type="text"
              placeholder="Username"
              value={newUsername}
              disabled={loading}
              onChange={(e) => setNewUsername(e.target.value)}
            />

            {newUsernameError === true && (
              <span className="text-red-500 mt-2">
                This Username Already Exists
              </span>
            )}

            {newUsername.length === 0 && (
              <span className="text-red-500 mt-2">Please Fill This Field</span>
            )}
          </div>

          <textarea
            className="w-full py-2 px-3 transition-colors bg-transparent border-[1px] border-stone-600 focus-within:outline-none focus-within:border-white focus-within:border-2 rounded-md"
            placeholder="you page bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            disabled={loading}
          />
        </div>

        {/* submit button */}
        <button
          disabled={disableSaveButton || loading || newUsername.length === 0}
          className={`w-full py-2 transition-all bg-emerald-600 text-white text-xl font-semibold rounded-md hover:scale-105 hover:bg-emerald-500
        ${loading ? "animate-pulse" : ""}
        ${disableSaveButton ? "bg-stone-500" : ""}
        `}
          onClick={async () => {
            setLoading(true);
            try {
              await UpdateBio(bio);
              await UpdateUsername(newUsername);
              router.replace(`/${newUsername}`);
            } catch (err) {
              console.log(err);
              setLoading(false);
            }
          }}
        >
          {loading || disableSaveButton || newUsername.length === 0
            ? "Loading..."
            : "Save"}
        </button>
      </div>

      {/* change profile picture dialog box */}
      {profilePhotoDialog && (
        <>
          {/* backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm w-full h-full z-40"
            onClick={() => setProfilePhotoDialog(false)}
          ></motion.div>
          {/* profile dialog box */}
          <motion.div
            initial={{ scale: 0.7, translateX: "50%", translateY: "-50%" }}
            animate={{ scale: 1, translateX: "50%", translateY: "-50%" }}
            className="absolute flex flex-col gap-4 border-[1px] border-stone-200 rounded-md py-8 px-8 sm:px-12 items-center justify-start w-full max-w-md bg-black z-40
            top-2/4 right-2/4 -translate-x-2/4 -translate-y-2/4"
          >
            {/* Image Input Start */}
            <div className="flex items-center justify-center w-40 aspect-square relative rounded-full overflow-hidden z-50">
              <label
                htmlFor="dropzone-file"
                className={`flex flex-col items-center justify-center w-full h-full border-2 border-gray-500 border-dashed rounded-full cursor-pointer z-10 `}
              >
                {/* helper text */}
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {!fileSrc && (
                    <>
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
                      <p className="mb-2 text-xs text-center text-gray-200">
                        <span className="font-semibold">
                          Upload Your Profile
                        </span>
                      </p>
                      <p className="text-xs text-gray-200">PNG, JPG</p>
                    </>
                  )}
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
                      compressImg(e.target.files[0], 150, (compressedImg) => {
                        setCompressFile(compressedImg);
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
            {/* Image Input End */}

            <button
              onClick={() => UploadProfilePicture()}
              className="bg-emerald-600 text-white font-semibold py-2 px-3 rounded-lg w-full transition-colors hover:bg-emerald-500"
            >
              Set
            </button>

            <button
              className="border-2 rounded-lg border-red-500 text-white font-semibold py-2 px-3 w-full transition-colors hover:bg-red-500"
              onClick={() => setProfilePhotoDialog(false)}
            >
              Cancel
            </button>
          </motion.div>
        </>
      )}

      {/* delete profile dialog box */}
      {deleteDialogOpen && (
        <DialogBox
          agree="Delete"
          discard="Cancel"
          onDiscard={() => setDeleteDialogOpen(false)}
          onAgree={async () => {
            await DeleteProfilePicture();
            setProfilePicturePublicUrl(null);
            setDeleteDialogOpen(false);
            console.log("DONE");
          }}
          title="Delete Profile Picture?"
        ></DialogBox>
      )}
    </>
  );
}
