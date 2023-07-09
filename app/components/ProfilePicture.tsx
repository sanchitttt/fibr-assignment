'use client';
import Image from 'next/image'
import React, { useState } from 'react'
import { CancelIcon } from './icons'
import { signOut } from 'next-auth/react';

function ProfilePicture({ profilePicture }: {
    profilePicture: string | null | undefined
}) {
    const [showModal, setShowModal] = useState(false);
    return (
        <div className='flex flex-col relative'>
            {profilePicture ?
                <Image
                    src={profilePicture}
                    height={32}
                    width={32}
                    className='rounded-full'
                    alt={`Profile picture`}
                    onClick={() => setShowModal(true)}
                />
                :
                <button onClick={() => setShowModal(true)}>
                    <svg
                        height="24px"
                        width="24px"
                        id="Capa_1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 60.671 60.671"
                        xmlSpace="preserve"
                        onClick={() => setShowModal(true)}
                    >
                        <g>
                            <g>
                                <ellipse
                                    style={{
                                        fill: "#010002",
                                    }}
                                    cx={30.336}
                                    cy={12.097}
                                    rx={11.997}
                                    ry={12.097}
                                />
                                <path
                                    style={{
                                        fill: "#010002",
                                    }}
                                    d="M35.64,30.079H25.031c-7.021,0-12.714,5.739-12.714,12.821v17.771h36.037V42.9 C48.354,35.818,42.661,30.079,35.64,30.079z"
                                />
                            </g>
                        </g>
                    </svg>
                </button>
            }
            {showModal && <div className='absolute bottom-[-60px] left-[-160px] rounded-[4px] w-[200px] h-[60px] bg-white shadow-v1 flex items-center justify-center flex-col'>
                <button className='w-[100%] flex justify-end pr-[5px]'
                    onClick={() => setShowModal(false)}
                >
                    <CancelIcon />
                </button>
                <button className='text-maroon'
                    onClick={() => signOut()}
                >Log out</button>
            </div>}
        </div >
    )
}

export default ProfilePicture