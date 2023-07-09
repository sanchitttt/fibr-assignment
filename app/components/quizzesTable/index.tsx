'use client';
import config from '@/app/config/config';
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useQuery } from 'react-query';
import React, { useEffect, useState } from 'react'
import { Skeleton, Modal } from '@mui/material';
import { redirect, useRouter } from 'next/navigation';
import { warningMessage } from '@/app/utils';
import { PulseLoader } from 'react-spinners';


interface Quiz {
    quizName: string
    createdAt: string
    updatedAt: string
    questions: number,
    responses: number,
    _id?: string
}

function QuizzesTable() {
    const { data: session, status } = useSession();
    const { data, isLoading, status: queryStatus } = useQuery({
        queryKey: 'quizTable',
        queryFn: () => axios.get(`${config.BACKEND_ENDPOINT}/user/quizzes?email=${session?.user?.email}`)
    })
    const [createQuiz, setCreateQuiz] = useState({
        modal: false,
        value: '',
        loading: false
    });
    const [quizzesData, setQuizzesData] = useState<Quiz[]>([]);

    useEffect(() => {
        if (queryStatus === 'success') {
            setQuizzesData(data.data);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryStatus])
    const router = useRouter();

    const createQuizHandler = () => {
        if (!createQuiz.value.length) {
            warningMessage('Please enter a quiz name')
        }
        else {
            setCreateQuiz({ ...createQuiz, loading: true })
            const postCreateQuiz = async () => {
                const payload = {
                    createdBy: session?.user?.email as string,
                    quizName: createQuiz.value,
                    questions: [],
                    responses: 0,
                    updatedAt: new Date().toISOString(),
                    createdAt: new Date().toISOString()
                }
                try {
                    const { data } = await axios.post(`${config.BACKEND_ENDPOINT}/quiz/create`, payload);
                    const currentQuiz = structuredClone(quizzesData);
                    currentQuiz.push(data);
                    setQuizzesData([...currentQuiz])
                } catch (error) {
                    console.log(error)
                    setCreateQuiz({ ...createQuiz, loading: false })
                }
            }
            postCreateQuiz().then(() => setCreateQuiz({ ...createQuiz, loading: false, modal: false }));
        }
    }

    return (
        <div className='w-[100%] flex items-center justify-start flex-col'>
            <div className='box-content rounded-full flex items-center justify-between w-[80%] my-[15px] px-[16px] py-[16px  flex items-center justify-between w-[80%] mt-[60px] text-[12px]'>
                <div className='w-[60%]'>
                    Typeform
                </div>
                <div className='w-[40%] flex items-center justify-between'>
                    <div className='w-[30%] text-left'>Questions</div>
                    <div className='w-[30%] text-left'>Responses</div>
                    <div className='w-[40%] text-center'>Updated</div>
                </div>
            </div>
            {(status === 'loading' || isLoading) ?
                <div className='w-[100%] flex justify-center'>
                    <Skeleton width='80%' height='300px' animation="wave" />
                </div>
                :
                <>
                    {quizzesData.map((quiz: Quiz) => {
                        return <div key={quiz.quizName} className='box-content rounded-[10px] flex items-center justify-between w-[80%] my-[15px] px-[16px] py-[16px] bg-white shadow-v1 text-[14px] cursor-pointer'
                            onClick={() => router.push(`/quiz/edit/${quiz._id}`)}
                        >
                            <div className='w-[60%] flex flex-col'>
                                <div>{quiz.quizName}</div>
                                <div className='text-[12px] text-[#737373]'>Created at : {quiz.createdAt}</div>
                            </div>
                            <div className='w-[40%] flex items-center justify-between'>
                                <div className='w-[15%] text-center '>{quiz.questions}</div>
                                <div className='w-[15%] text-center '>{quiz.responses}</div>
                                <div className='w-[40%] text-center'>{quiz.updatedAt}</div>
                            </div>
                        </div>
                    })}
                    {/* {!data?.data.length && <div className='text-center mt-[30px] text-[24px] flex flex-col'>
                        <div>{"You haven't created any quizzes"}</div>
                        <div><button className='underline text-green'
                            onClick={() => setCreateQuiz({ modal: true, value: '', loading: false })}
                        >Click here</button> to create one</div>
                    </div>} */}
                    {<button className='mt-[60px] inline bg-green rounded-[8px] h-[60px] flex items-center justify-center px-[30px] text-white uppercase flex'
                        onClick={() => setCreateQuiz({ modal: true, value: '', loading: false })}
                    >
                        New Quiz
                    </button>}
                </>

            }
            <Modal open={createQuiz.modal}>
                <div className='bg-white w-[300px] py-[60px] rounded-[4px] absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] px-[30px] flex flex-col items-center justify-center gap-[15px]'>
                    <div>Quiz name</div>
                    <input
                        type='text'
                        className='border-[1px] border-black py-[5px] px-[10px]'
                        placeholder='Enter quiz name here'
                        value={createQuiz.value}
                        onChange={(e) => setCreateQuiz({ modal: true, value: e.target.value, loading: false })}
                    />
                    <button className='bg-green rounded-[8px] h-[60px] flex items-center justify-center w-[100%] text-white uppercase'
                        onClick={createQuizHandler}
                    >
                        {createQuiz.loading ? <PulseLoader color='#fff' /> : "Create quiz"}
                    </button>
                </div>
            </Modal>
        </div>
    )
}

export default QuizzesTable