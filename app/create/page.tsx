'use client';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react'
import Loader from '../components/loader';
import { redirect } from 'next/navigation';
import CreatePageNavbar from './Navbar';
import Sidebar from './Sidebar';
import QuestionDialog from './QuestionDialog';
import Canvas from './Canvas';
import Settings from './Settings';

function CreateForm() {
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return <Loader />
    }
    if (!session) {
        redirect('/');
    }
    return (
        <div className='w-[100vw] h-[100vh] flex flex-col'>
            <CreatePageNavbar
                quizName={'Quiz 1'}
                profilePicture={session?.user?.image}
            />
            <div className='w-[100%] flex h-[100%]'>
                <Sidebar />
                <Canvas />
                <Settings />
            </div>

        </div>
    )
}

export default CreateForm