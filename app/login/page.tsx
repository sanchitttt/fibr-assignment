'use client'
import React, { useState } from 'react'
import EmailInput from '../components/inputs/EmailInput'
import PasswordInput from '../components/inputs/PasswordInput'
import GoogleLogin from './googleLogin'
import Link from 'next/link'

function Login() {
    const [credentialLogin, setCredentialLogin] = useState({ email: '', password: '' })
    return (
        <main className='w-[100vw] h-[100vh] flex items-center justify-center'>
            <div className='w-[100%] h-[100%] max-w-[512px] flex justify-center items-center flex-col'>
                <div className='text-[28px] font-bold mb-[50px]'>LOGIN</div>
                <div className='flex flex-col gap-[30px] items-center justify-center w-[100%]'>
                    <div className='w-[80%]'>
                        <EmailInput
                            value={credentialLogin.email}
                            onChangeHandler={(e) => setCredentialLogin({ ...credentialLogin, email: e.target.value })}
                        />
                    </div>
                    <div className='w-[80%]'>
                        <PasswordInput
                            value={credentialLogin.password}
                            onChangeHandler={(e) => setCredentialLogin({ ...credentialLogin, password: e.target.value })}
                            passwordColor={credentialLogin.password.length >= 7 ? '#31CD63' : '#A1A8B0'}
                        />
                    </div>
                </div>
                <div className='w-[100%] mt-[30px] w-[80%]'>
                    <button className='bg-green rounded-[8px] h-[60px] flex items-center justify-center w-[100%] text-white uppercase'>
                        Login
                    </button>
                </div>
                <div className='text-[15px] font-normal text-grey mt-[5px]'>
                    {"Don't have an account? "}
                    <Link href='/signup'>
                        <span className='text-green text-[15px]'>
                            Sign Up
                        </span>
                    </Link>
                </div>
                <div className='flex w-[80%] items-center justify-between mt-[30px]'>
                    <div className='w-[40%] h-[1px] bg-[#A1A8B0]' />
                    <div>OR</div>
                    <div className='w-[40%] h-[1px] bg-[#A1A8B0]' />
                </div>
                <GoogleLogin />
            </div>
        </main>
    )
}

export default Login