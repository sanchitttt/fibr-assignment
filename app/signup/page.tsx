'use client';
import React, { useState } from 'react'
import EmailInput from '../components/inputs/EmailInput'
import PasswordInput from '../components/inputs/PasswordInput'
import Link from 'next/link';

function Signup() {
    const [credentialLogin, setCredentialLogin] = useState({ email: '', password: '' })
    return (
        <main className='w-[100vw] h-[100vh] flex items-center justify-center'>
            <div className='w-[100%] h-[100%] max-w-[512px] flex justify-center items-center flex-col'>
                <div className='text-[28px] font-bold mb-[50px]'>SIGN UP</div>
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
                        Create account
                    </button>
                </div>
                <div className='text-[15px] mt-[10px] font-normal text-grey'>
                    {"Already have an account? "}
                    <Link href='/'>
                        <span className='text-green text-[15px]'>
                            Login
                        </span>
                    </Link>
                </div>
            </div>
        </main>
    )
}

export default Signup