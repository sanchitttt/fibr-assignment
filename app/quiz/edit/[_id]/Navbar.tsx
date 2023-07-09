'use client';
import Image from 'next/image'
import React, { useState } from 'react'
import { EyeIcon } from '../../../components/icons'
import { Tooltip } from 'react-tooltip'
import { useAppDispatch, useAppSelector } from '../../../hooks';
import createQuizSlice from '../../../redux/features/editQuiz';
import ProfilePicture from '../../../components/ProfilePicture';
import axios from 'axios';
import config from '@/app/config/config';
import { redirect, usePathname } from 'next/navigation';
import { Modal } from '@mui/material';
import { PulseLoader } from 'react-spinners';
import { successMessage } from '@/app/utils';
import { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

function CreatePageNavbar({
    quizName, profilePicture
}: { quizName: string, profilePicture: string | null | undefined }) {
    const [editingMode, setEditingMode] = useState(false);
    const { quizName: quizNameFromStore } = useAppSelector((state) => state.createQuiz);
    const payload = useAppSelector((state) => state.createQuiz);
    const { changeQuizName } = createQuizSlice.actions;
    const dispatch = useAppDispatch();
    const pathName = usePathname().split('/')[3];
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [publishing, setPublishing] = useState(false);
    const router = useRouter();

    const publishHandler = () => {
        setPublishing(true);
        const pushChangesToDB = async () => {
            await axios.post(`${config.BACKEND_ENDPOINT}/quiz/${pathName}`, payload);
        }
        pushChangesToDB().finally(() => {
            setPublishing(false);
        });
    }

    const deleteQuizFromDBAndRedirect = () => {
        setFetching(true);
        const deleteItFromDb = async () => {
            await axios.delete(`${config.BACKEND_ENDPOINT}/quiz/${pathName}`)
        }
        deleteItFromDb().then(() => {
            setFetching(false)
            setShowDeleteModal(false);
        }).catch(() => {
            setFetching(false)
            setShowDeleteModal(false);
        })

    }

    return (
        <nav className='px-[15px] flex items-center justify-between min-h-[48px] bg-white border-b-[1px] border-[#00000012] z-[2000]'>
            <div className='flex items-center gap-[10px]'>
                {editingMode ?
                    <>
                        <input
                            type='text'
                            value={quizNameFromStore}
                            onChange={(e) => dispatch(changeQuizName(e.target.value))}
                        />
                        <button className='w-[32px] h-[32px] flex items-center justify-center bg-[#e3e3e3] rounded-[4px]'
                            data-tooltip-id="saveQuizName" data-tooltip-content="Save quiz name"
                            onClick={() => setEditingMode(false)}
                        >
                            <Image
                                src='/SaveIcon.svg'
                                width={14}
                                height={14}
                                alt='Save changes'
                            />
                        </button>
                    </>
                    :
                    <>
                        <div className='font-bold'>{quizNameFromStore}</div>
                        <button className='w-[32px] h-[32px] flex items-center justify-center bg-[#e3e3e3] rounded-[4px]'
                            data-tooltip-id="editQuizName" data-tooltip-content="Change quiz name"
                            onClick={() => setEditingMode(true)}
                        >
                            <Image
                                src='/PencilEdit.svg'
                                width={14}
                                height={14}
                                alt='Edit quiz name'
                            />
                        </button>
                    </>
                }
                <button className='w-[32px] h-[32px] flex items-center justify-center bg-[#e3e3e3] rounded-[4px]'
                    data-tooltip-id="DeleteQuiz" data-tooltip-content="Delete the entire quiz"
                    onClick={() => setShowDeleteModal(true)}
                >
                    <Image
                        src='/Delete.svg'
                        width={14}
                        height={14}
                        alt='Edit quiz name'
                    />
                </button>
            </div>
            <div className='flex justify-between items-center gap-[15px]'>
                <button className='w-[32px] h-[32px] bg-[#e3e3e3] rounded-[4px] flex items-center justify-center pointer'
                    data-tooltip-id="submissions" data-tooltip-content="View responses"
                    onClick={() => {
                        router.push(process.env.NODE_ENV === 'development' ?
                            `http://localhost:3000/quiz/responses/${pathName}` :
                            `https://fibr-assignment/quiz/responses/${pathName}`)
                    }}
                >
                    <Image
                        src='/Submissions.svg'
                        width={16}
                        height={16}
                        alt='Submissions'
                    />
                </button>
                <button className='w-[32px] h-[32px] bg-[#e3e3e3] rounded-[4px] flex items-center justify-center pointer'
                    data-tooltip-id="preview" data-tooltip-content="Show preview"
                    onClick={() => {
                        router.push(process.env.NODE_ENV === 'development' ?
                            `http://localhost:3000/quiz/view/${pathName}` :
                            `https://fibr-assignment/quiz/view/${pathName}`)
                    }}
                >
                    <EyeIcon />
                </button>
                <button className='w-[32px] h-[32px] bg-[#e3e3e3] rounded-[4px] flex items-center justify-center pointer'
                    data-tooltip-id="shareLink" data-tooltip-content="Copy public quiz url"
                    onClick={() => {
                        if (navigator.clipboard) {
                            const textToCopy = process.env.NODE_ENV === 'development' ?
                                `http://localhost:3000/quiz/view/${pathName}` :
                                `https://fibr-assignment/quiz/view/${pathName}`
                            // The text you want to copy

                            // Copy the text to the clipboard
                            navigator.clipboard.writeText(textToCopy).finally(() => successMessage('URL copied to your clipboard'))
                        }
                    }}
                >
                    🔗
                </button>
                <button className='bg-black text-white text-[14px] rounded-[4px] flex items-center justify-center w-[68px] h-[32px] mr-[30px]'
                    data-tooltip-id="publish" data-tooltip-content="Make your changes visible to the world"
                    onClick={publishHandler}
                >
                    {publishing ? <PulseLoader color='white' /> : "Publish"}
                </button>
                <ProfilePicture profilePicture={profilePicture} />
            </div>
            <Tooltip id='preview' />
            <Tooltip id='publish' />
            <Tooltip id='editQuizName' />
            <Tooltip id='saveQuizName' />
            <Tooltip id='DeleteChoice' />
            <Tooltip id='DeleteQuiz' />
            <Tooltip id='shareLink' />
            <Tooltip id='submissions' />
            <Modal open={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
            >
                <div className='bg-white w-[600px] items-center justify-center flex-col flex h-[300px] bg-white shadow-v1 absolute left-[50%] top-[5%] translate-x-[-50%] translate-y-[50%] rounded-[4px]'
                >
                    <div className='text-maroon text-[24px] font-semibold   '>Are you sure you want to delete this entire quiz?</div>
                    <div className='flex justify-between w-[100%] gap-[60px] px-[30px] mt-[30px]'>
                        <button className='border-[1px] border-green text-green px-[10px] rounded-[8px] h-[60px] flex items-center justify-center w-[100%] uppercase'
                            onClick={() => setShowDeleteModal(false)}
                        >
                            No, dont delete
                        </button>
                        <button className='bg-maroon text-white px-[10px] rounded-[8px] h-[60px] flex items-center justify-center w-[100%] uppercase'
                            onClick={() => deleteQuizFromDBAndRedirect()}
                        >
                            {fetching ? <div className='flex flex-col'>
                                <PulseLoader color='#fff' />
                                <div>Deleting...</div>
                            </div> : "Yes, delete"}
                        </button>
                    </div>
                </div>
            </Modal>
            <Toaster />
        </nav>
    )
}

export default CreatePageNavbar