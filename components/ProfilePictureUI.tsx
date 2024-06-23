import Image from "next/image";
import { useEffect } from "react";

interface ProfilePictureUI {
  loading: boolean;
  profilePictureUrl: string | null;
}

export default function ProfilePictureUI({
  loading,
  profilePictureUrl,
}: ProfilePictureUI) {
  useEffect(() => {
    console.log(profilePictureUrl);
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full bg-stone-300 border-stone-300 rounded-full border-2 border-dashed animate-spin"></div>
    );
  }
  if (profilePictureUrl === null) {
    return (
      <Image
        className="w-full h-full rounded-full aspect-square"
        src={"/defaultProfile.png"}
        alt="default profile picture"
        width={100}
        height={100}
      />
    );
  }

  return (
    <Image
      className="w-full h-full rounded-full aspect-square"
      src={profilePictureUrl}
      alt="profile picture"
      width={100}
      height={100}
    />
  );
}
