'use client';
import { useSession } from 'next-auth/react';
import React from 'react'
import Loader from '../components/loader';
import { redirect } from 'next/navigation';
import CreatePageNavbar from '../components/create-navbar';

function CreateForm() {
    const { data: session, status } = useSession();
    if (status === 'loading') {
        return <Loader />
    }
    if (!session) {
        redirect('/');
    }
    return (
        <>
            <CreatePageNavbar
                quizName={'Quiz 1'}
                profilePicture={session?.user?.image}
            />
        </>
    )
}

export default CreateForm