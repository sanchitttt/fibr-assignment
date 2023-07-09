import Image from 'next/image'
import React from 'react'
import ProfilePicture from '../ProfilePicture';

function Navbar({ email, profilePicture }: {
    email: string | undefined | null,
    profilePicture: string | undefined | null
}) {
    if (!email ) return null;
    return (
        <div className='px-[15px] flex items-center justify-between h-[48px] bg-white border-b-[1px] border-[#00000012]'>
            <div className='flex gap-[7.5px] items-center'>
                <div className='w-[32px] text-white h-[32px] bg-[#0487af] rounded-[10px] flex items-center justify-center uppercase'>
                    {email[0]}
                </div>
                <div className='font-normal'>
                    {email.split('@')[0]}
                </div>
            </div>
            <ProfilePicture profilePicture={profilePicture} />
        </div>
    )
}

export default Navbar