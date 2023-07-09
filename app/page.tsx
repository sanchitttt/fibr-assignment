'use client';
import EmailInput from './components/inputs/EmailInput'
import PasswordInput from './components/inputs/PasswordInput'
import { useState } from 'react';
import Login from './login/page';
import Signup from './signup/page';
import { useSession } from 'next-auth/react';

import Navbar from './components/navbar';
import WorkSpaceSideBar from './components/workspaceSidebar';
import QuizzesTable from './components/quizzesTable';
import Loader from './components/loader';

export default function Home() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <Loader />
  }
  if (!session) {
    return <main className='w-[100vw] h-[100vh] flex items-center justify-center'>
      <div className='w-[100%] h-[100%] max-w-[512px] flex justify-center items-center flex-col'>
        <Login />
      </div>
    </main>
  }
  return (
    
    <main className='w-[100%] h-[100vh] flex flex-col'>
      <div>
        <Navbar email={session?.user?.email} profilePicture={session?.user?.image} />
      </div>
      <div className='flex'>
        <WorkSpaceSideBar />
        <QuizzesTable />
      </div>

    </main>
  )
}
