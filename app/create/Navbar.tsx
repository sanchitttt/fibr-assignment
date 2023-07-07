import Image from 'next/image'
import React from 'react'
import { EyeIcon } from '../components/icons'
import { Tooltip } from 'react-tooltip'

function CreatePageNavbar({
    quizName, profilePicture
}: { quizName: string, profilePicture: string | null | undefined }) {
    return (
        <nav className='px-[15px] flex items-center justify-between min-h-[48px] bg-white border-b-[1px] border-[#00000012]'>
            <div className='font-bold'>{quizName}</div>
            <div className='flex justify-between items-center gap-[15px]'>
                <button className='w-[32px] h-[32px] bg-[#e3e3e3] rounded-[4px] flex items-center justify-center pointer'
                    data-tooltip-id="preview" data-tooltip-content="Show preview"
                >
                    <EyeIcon />
                </button>
                <button className='bg-black text-white text-[14px] rounded-[4px] flex items-center justify-center w-[68px] h-[32px] mr-[30px]'
                    data-tooltip-id="publish" data-tooltip-content="Make your changes visible to the world"
                >
                    Publish
                </button>
                {profilePicture ?
                    <Image
                        src={profilePicture}
                        height={32}
                        width={32}
                        className='rounded-full'
                        alt={`Profile picture`}
                    />
                    :
                    <svg
                        height="24px"
                        width="24px"
                        id="Capa_1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 60.671 60.671"
                        xmlSpace="preserve"
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
                    </svg>}
            </div>
            <Tooltip id='preview' />
            <Tooltip id='publish' />
        </nav>
    )
}

export default CreatePageNavbar