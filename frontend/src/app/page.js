import Image from 'next/image'
import Wordle from './wordle.js'
import './page.css'

export default function Home() {
  return (
    <main>
      <h1>Pikadle</h1>
      <Wordle />
    </main>
  )
}
