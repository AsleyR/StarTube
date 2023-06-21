import Navbar from './(component)/navbar/Navbar'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'StarTube',
  description: 'Your Videos, Your Story: Watch, Share, and Shine!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-blackbg text-white`}>
        <UserProvider>
          <Navbar />
          <div className="">
            {children}
          </div>
        </UserProvider>
      </body>
    </html>
  )
}
