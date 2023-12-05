import './globals.css'
import { Inter } from 'next/font/google'
import AuthProvider from '../auth/AuthProvider'
import NavBar from '@/components/navbar';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Pikadle',
  description: 'CS316 Project',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='body'>
        <h1 className="text-4xl font-bold text-center my-8">Pikadle</h1>
        <AuthProvider>
          <NavBar />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
