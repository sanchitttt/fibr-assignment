'use client'
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image'
import React from 'react'

function GoogleLogin() {
    return (
        <button className='w-[80%] mt-[15px] h-[56px] flex items-center justify-center bg-white  rounded-full border-[1px] border-black'
            onClick={() => signIn('google', {
                callbackUrl: '/auth/home'
            })}
        >
            <div className='w-[90%] flex items-center justify-between'>
                <Image
                    src='/Google.jpg'
                    width={20}
                    height={20}
                    alt='Google'
                />
                <div className='text-semibold font-semibold text-black '>
                    Login with Google
                </div>
                <div></div>
            </div>
        </button>
    )
}

export default GoogleLogin