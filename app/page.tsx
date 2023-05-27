import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { headers, cookies } from 'next/headers'
import { Post } from '@/components/Post'

// do not cache this page
export const revalidate = 0

export default async function ServerComponent() {
  const supabase = createServerComponentSupabaseClient({
    headers,
    cookies,
  })
  const { data } = await supabase.from('posts').select('*')

  return (
    <div className="max-w-[468px] mx-auto grid grid-cols-1 text-center divide-y-[1px] divide-white divide-opacity-40 ">
      {data?.map((post, i) => {
        return (
          <>
            {/* @ts-expect-error Server Component */}
            <Post
              key={i}
              id={post.id}
              creator_id={post.creator_id}
              title={post.title}
              date={post.date}
              description={post.description}
              image_path={post.image_path}
            />
          </>
        )
      })}
    </div>
  )
}