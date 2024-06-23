import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import Image from "next/image";
import ProfilePost from "./ProfilePost";
import ProfileButtons from "./ProfileButtons";
import ProfilePictureUI from "@/components/ProfilePictureUI";

export default async function userPage({ params: { username } }: any) {
  const supabase = createServerComponentSupabaseClient({
    headers,
    cookies,
  });

  const {
    data: [{ user_id }],
  }: any = await supabase.from("users").select("*").eq("user_name", username);
  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .eq("creator_id", user_id);

  const { data: _user_data } = await supabase
    .from("users")
    .select("*")
    .eq("user_id", user_id);

  async function getBio() {
    const { data: _user_data } = await supabase
      .from("users")
      .select("*")
      .eq("user_id", user_id);

    if (!_user_data) return;

    return _user_data[0].user_bio;
  }

  async function getProfilePublicUrl() {
    const { data: _user_data } = await supabase
      .from("users")
      .select("*")
      .eq("user_id", user_id);

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
  const bio = await getBio();

  return (
    <section className="max-w-[924px] w-full mx-auto pt-4">
      {/* profile */}
      <div className="flex justify-start md:justify-between md:grid md:grid-cols-3 grid-rows-1 items-start gap-4 p-4 text-2xl">
        {/* profile image */}
        <div className="md:col-span-1 md:justify-self-end md:pr-8">
          {/* mobile profile image */}
          <Image
            className="md:hidden rounded-full inline border-2 border-stone-300 aspect-square"
            src={`${
              profilePublicUrl ? profilePublicUrl : "/defaultProfile.png"
            }`}
            width={70}
            height={70}
            priority
            alt="profile"
          />

          {/* desktop profile image */}
          <Image
            className="hidden md:inline rounded-full border-2 border-stone-300 aspect-square"
            src={`${
              profilePublicUrl ? profilePublicUrl : "/defaultProfile.png"
            }`}
            width={130}
            height={130}
            priority
            alt="profile"
          />
        </div>

        {/* edit profile button */}
        <div className="col-span-1 flex flex-col items-center justify-center gap-4 pl-4 md:pl-0">
          <div className="flex flex-col md:flex-row justify-start w-full gap-3 md:gap-6">
            <h2>{username}</h2>

            <ProfileButtons username={username} />
          </div>

          {/* bio for large screens */}
          <p className="hidden md:block text-base text-left w-full">{bio}</p>
        </div>
      </div>

      {/* bio for smaller screens */}
      <p className="md:hidden text-base px-4 mt-4 mb-8">{bio}</p>

      {/* Post `with the count on smaller screens` */}
      <div className="w-full border-t-[1px] border-stone-600 text-center text-sm py-4 md:text-base">
        {posts?.length} Posts
      </div>

      <div className="grid grid-cols-3 gap-1">
        {!posts ||
          (posts.length === 0 && (
            <div className="col-span-full w-full flex flex-col items-center justify-center gap-2 mt-4">
              {/* photo svg */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.2}
                stroke=""
                className="w-28 h-28 lg:w-32 lg:h-32 stroke-stone-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>

              {/* no post text */}
              <h2 className="text-3xl lg:text-4xl text-stone-500 italic font-semibold">
                No Posts!
              </h2>
            </div>
          ))}

        {posts?.map((post) => (
          <>
            <ProfilePost
              key={post.id}
              id={post.id}
              username={username}
              description={post.description}
              date={post.date}
              image_path={post.image_path}
              image_thumbnail={post.image_thumbnail}
            />
          </>
        ))}
      </div>
    </section>
  );
}
