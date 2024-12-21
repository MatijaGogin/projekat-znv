import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
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
                <SignInButton />
            </div>
        </SignedOut>
    </div>
  )
}

export default Header
