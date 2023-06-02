import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { headers, cookies } from 'next/headers'
import './globals.css'
import SupabaseProvider from './supabase-provider'
import MobileNav from '@/components/MobileNav'
import { Header } from '@/components/Header'

export const metadata = {
  title: 'Fakegram',
  description: 'instagram clone',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = createServerComponentSupabaseClient({
    headers,
    cookies,
  })

  const { data: { session } } = await supabase.auth.getSession()

  return (
    <html lang="en">
      <body>
        <SupabaseProvider session={session}>
          <Header />
          {children}
          <MobileNav />

          {/* adds padding to bottom for MobileNav */}
          <div className='w-full h-[70px] bg-black'></div>

        </SupabaseProvider>
      </body>
    </html>
  )
}