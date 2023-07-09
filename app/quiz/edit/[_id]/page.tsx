'use client';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import Loader from '../../../components/loader';
import { redirect, usePathname } from 'next/navigation';
import CreatePageNavbar from './Navbar';
import Sidebar from './Sidebar';
import QuestionDialog from './QuestionDialog';
import Canvas from './Canvas';
import Settings from './Settings';
import { fetchQuiz } from '@/app/redux/features/editQuiz';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

function CreateForm() {
    const { data: session, status } = useSession();
    const dispatch = useAppDispatch();
    const { broken, loading, questions } = useAppSelector((state) => state.createQuiz);
    console.log(questions)
    useEffect(() => {
        if (session) {
            dispatch(fetchQuiz())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session]);

    if (status === 'loading') {
        return <Loader />
    }
    if (!session) {
        redirect('/');
    }
    if (loading) {
        return <Loader />
    }
    if (broken) {
        redirect('/')
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