import React from 'react'
import { EmailIcon, TickGreenIcon } from '../icons'

function EmailInput({ value, onChangeHandler }: {
    value: string,
    onChangeHandler: React.ChangeEventHandler<HTMLInputElement>

}) {
    return (
        <div className='w-[100%] h-[56px] flex items-center rounded-full bg-lightGrey border-[1px] border-[#A1A8B0]'>
            <div className='w-[20%] flex items-center justify-center'>
                <EmailIcon fill={value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ? '#31CD63' : '#A1A8B0'} />
            </div>
            <input
                type='email'
                className='w-[65%] placeholder:font-normal font-semibold text-[16px] leading-[150%] '
                value={value}
                onChange={onChangeHandler}
                placeholder='Enter your email'
            />
            <div className='15%'>
                {value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) && <TickGreenIcon />}
            </div>
        </div>
    )
}

export default EmailInput