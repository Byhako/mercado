import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import './styles.css'

type Props = {
  state: string
  setState: (t: string) => void
}

export default function Header({ state, setState }: Props) {
  const [text, setText] = useState('')
  const router = useRouter()

  const handleClick = () => {
    if (text) {
      router.push(`/items?search=${text}`)
    }
  }

  const handleKeyDown = (e: any) => {
    if (text && e.keyCode === 13) {
      router.push(`/items?search=${text}`)
    }
  }

  return (
    <header className='header'>
    <div className='center'>
      <Link href="/" className='link-logo'>
        <Image
          src="/logo.png"
          alt="search"
          className="logo"
          width={36}
          height={36}
          priority
          />
        <span>Mercado</span>
      </Link>
      <div className='form'>
        <input
          type="text"
          name='search'
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDownCapture={e => handleKeyDown(e)}
        />
        <button
          type='button'
          className='btnSearch'
          onClick={handleClick}
        >
          <Image
            src="/search.svg"
            alt="search"
            className="icon-search"
            width={24}
            height={24}
            priority
          />
        </button>
      </div>

      <div className="theme">
        {state === 'light' ? (
          <button type='button' onClick={() => setState('dark')}>
            <Image
              src="/moon.svg"
              alt="search"
              className="icon-search"
              width={20}
              height={20}
            />
          </button>
        ) : (
          <button type='button' onClick={() => setState('light')}>
            <Image
              src="/sun.svg"
              alt="search"
              className="icon-search"
              width={20}
              height={20}
            />
          </button>
        )}
      </div>
    </div>
  </header>
  )
}
