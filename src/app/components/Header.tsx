import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <div className='mt-5 text-2xl'>
        <SignedIn>
            <div className="text-center">
                <UserButton />
            </div>
        </SignedIn>

        <SignedOut>
            <div className="flex justify-center items-center">
                <Link href="/">
                    <button className='flex mr-10'>
                        <span className=' '>Home page</span>
                    </button>
                </Link>
                <Link href="/sign-in">
                    <button className='flex mr-10'>
                        <span className=' '>Sign In</span>
                    </button>
                </Link>
                <Link href="/sign-up">
                    <button className='flex mr-10'>
                        <span className=' '>Sign Up</span>
                    </button>
                </Link>
            </div>
        </SignedOut>
    </div>
  )
}

export default Header
