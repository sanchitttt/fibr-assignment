import Image from 'next/image'
import React from 'react'
import { PasswordIcon } from '../icons'

function PasswordInput({ value, onChangeHandler, passwordColor }: {
  value: string,
  passwordColor: string,
  onChangeHandler: React.ChangeEventHandler<HTMLInputElement>
}) {
  return (
    <>
      <div className='w-[100%] h-[56px] flex items-center rounded-full bg-lightGrey border-[1px] border-[#A1A8B0]'>
        <div className='w-[20%] flex items-center justify-center'>
          <PasswordIcon fill={passwordColor ? passwordColor : ' #A1A8B0'} />
        </div>
        <input
          type='password'
          className='w-[65%] font-normal text-[16px] leading-[150%] '
          value={value}
          onChange={onChangeHandler}
          placeholder='Enter your password'
        />

      </div>
      {value.length && value.length <= 7 ? <div className='text-maroon text-[10px] ml-[15px]'>
        Password should be atleast 8 characters
      </div> : null}
    </>
  )
}

export default PasswordInput