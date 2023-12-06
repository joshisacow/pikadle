import './globals.css'
import { Inter } from 'next/font/google'
import AuthProvider from '../auth/AuthProvider'
import NavBar from '@/components/navbar';
import PokeBall from '@/app/public/big-pokeball.png'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Pikadle',
  description: 'CS316 Project',
  icon: '/favicon.ico'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='body'>
        <header>
          <img className ="logoball"src={PokeBall.src}></img>
          <h1 className="logo text-4xl font-bold text-center my-8">Pikadle</h1>
          <img className ="logoball"src={PokeBall.src}></img>
        </header>
        <AuthProvider>
          <NavBar />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
