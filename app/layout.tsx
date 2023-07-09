import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { headers, cookies } from 'next/headers'
import './globals.css'
import SupabaseProvider from './supabase-provider'
import MobileNav from '@/components/MobileNav'
import { Header } from '@/components/Header'
import { Toaster, ToasterProvider } from '@/components/hooks/useToaster'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Fakegram Home",
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
          <ToasterProvider>
            <Header />
            {children}

            <MobileNav />

            {/* adds padding to bottom for MobileNav */}
            <div className='lg:hidden w-full h-[70px] bg-black'></div>

            <Toaster />
          </ToasterProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}