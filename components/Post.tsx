import Image from "next/image";
import Link from "next/link";
import { headers, cookies } from "next/headers";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import PostInteractives from "./PostInteractives";
import Description from "./Description";
import PostOptions from "./PostOptions";

interface Post {
  id: string;
  creator_id: string;
  description: string;
  date: string;
  image_path: string;
  image_thumbnail: string;
}

const Post = async ({
  id,
  creator_id,
  description,
  date,
  image_path,
  image_thumbnail,
}: Post) => {
  const supabase = createServerComponentSupabaseClient({
    headers,
    cookies,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const { data: _imageUrl } = await supabase.storage
    .from("posts")
    .getPublicUrl(image_path);
  const { data: _username } = await supabase
    .from("users")
    .select("user_name")
    .eq("user_id", creator_id);
  const { data: _likes } = await supabase
    .from("likes")
    .select("id")
    .eq("post_id", id);

  const username = _username && _username[0].user_name;

  async function getProfilePublicUrl() {
    const { data: _user_data } = await supabase
      .from("users")
      .select("*")
      .eq("user_id", creator_id);

    if (!_user_data) return;

    //if the user has no profile photo return null
    if (_user_data[0].user_profile_picture_url === null) {
      return null;
    }

    //else get the public url
    const { data: _imageUrl } = await supabase.storage
      .from("profile_picture")
      .getPublicUrl(_user_data[0].user_profile_picture_url);

    return _imageUrl.publicUrl;
  }

  const profilePublicUrl = await getProfilePublicUrl();

  return (
    <article
      className="flex flex-col items-center justify-center relative overflow-hidden shadow-inset"
      role="presentation"
      tabIndex={-1}
    >
      {/* blury backgraound */}
      <Image
        alt={description}
        src={_imageUrl.publicUrl}
        fill
        loading="lazy"
        style={{
          objectFit: "cover",
          filter: "blur(30px)",
          transform: "scale(1.4)",
          opacity: "25%",
          zIndex: "-1",
        }}
      />

      {/* Profile */}
      <div className="w-full p-4 flex justify-between items-center bg-black bg-opacity-60">
        <Link
          href={`/${username}`}
          className="flex gap-2 items-center text-xl font-semibold"
        >
          <Image
            className="rounded-full border-[1px] border-stone-300 aspect-square"
            alt="profile"
            src={`${
              profilePublicUrl ? profilePublicUrl : "/defaultProfile.png"
            }`}
            height={40}
            width={40}
          />

          <h2>{username}</h2>
        </Link>

        <PostOptions post_id={id} username={username} creator_id={creator_id} />
      </div>

      <div className="bg-stone-500 w-full relative rounded-md overflow-hidden">
        <Image
          alt={description}
          src={_imageUrl.publicUrl}
          placeholder="blur"
          blurDataURL={image_thumbnail}
          width={1000}
          height={1000}
          priority
          // style={{ objectFit: 'contain', width: '100%', height: 'auto' }}
        />
      </div>

      {/* Interactive Section */}
      <div className="w-full flex flex-col items-start pb-2 pt-4 px-4 gap-2 text-white ">
        <PostInteractives
          postId={id}
          userId={session?.user.id}
          likeCount={_likes ? _likes.length : 0}
        />
      </div>

      {/* Description */}
      <Description
        author_id={id}
        author_username={username}
        description={description}
      />
    </article>
  );
};

export default Post as any;
