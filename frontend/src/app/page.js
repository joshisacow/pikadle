import Image from 'next/image'
import Wordle from './wordle.js'

export default function Home() {
  return (
    <main>
      <h1>Pikadle</h1>
      <Wordle />
    </main>
  )
}
