'use client';
import Loader from '@/app/components/loader';
import config from '@/app/config/config';
import axios from 'axios';
import { redirect, usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { LinearProgress, Modal } from '@mui/material';
import { successMessage, warningMessage } from '@/app/utils';
import { Toaster } from 'react-hot-toast';
import { PulseLoader } from 'react-spinners';
import { useSession } from 'next-auth/react';

interface Answers {
    type: 'Short Text' | 'Long Text' | 'Multiple Choice' | 'Yes/No',
    answer: string | null
}

let maxLength: number = 0;
let initialAnswersState: Answers[] = [];

function ViewPage() {
    const { data: session, status } = useSession();
    const path = usePathname().split('/')[3];
    const { data, isLoading } = useQuery({
        queryKey: ['viewQuiz', path],
        queryFn: () => axios.get(`${config.BACKEND_ENDPOINT}/quiz/${path}`)
    })
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Answers[]>([]);
    const [showSubmitModal, setShowSubmitModal] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        if (data?.data) {
            const result: Answers[] = [];
            maxLength = data?.data.questions.length;
            for (let i = 0; i < data?.data.questions.length; i++) {
                const item = data?.data.questions[i];
                if (item.type === 'Short Text') {
                    result.push({ "type": "Short Text", answer: '' })
                }
                else if (item.type === 'Long Text') {
                    result.push({ "type": "Long Text", answer: '' })
                }
                if (item.type === 'Multiple Choice') {
                    result.push({ "type": 'Multiple Choice', answer: '' })
                }
                if (item.type === 'Yes/No') {
                    result.push({ "type": 'Yes/No', answer: null })
                }
            }
            initialAnswersState = result;
            setAnswers([...result]);
        }
    }, [data]);

    if (isLoading || status === 'loading') {
        return <Loader />
    }
    if (!session) {
        redirect('/');
    }
    const { quizName, questions } = data?.data;
    const submitHandler = () => {
        setFetching(true);
        const fetch = async () => {
            const response = await axios.post(`${config.BACKEND_ENDPOINT}/quiz/${path}/response`, {
                answers: answers,
                scoreGained: calculateScore().split('/')[0],
                submittedBy: session.user?.email
            });
        }
        fetch().then(() => {

            // setAnswers([...initialAnswersState]);
        }).finally(() => {
            setFetching(false)
            setShowSubmitModal(false)
            setShowResults(true)
            successMessage('Quiz is submitted')
        });
    }

    const calculateScore = () => {
        let totalQuestions = questions.length;
        let score = 0;
        for (let i = 0; i < questions.length; i++) {
            if (questions[i].type === 'Short Text' || questions[i].type === 'Long Text') {
                score++;
            }
            else if (questions[i].type === 'Yes/No') {
                if (questions[i].correct === answers[i].answer) score++;
            }
            else if (questions[i].type === 'Multiple Choice') {
                if (questions[i].correctChoice === answers[i].answer) score++;
            }
        }
        return `${score}/${totalQuestions}`
    }

    const validateAll = () => {
        for (let i = 0; i < questions.length; i++) {
            if (questions[i].required) {
                //@ts-ignore
                if (!answers[i].answer || !answers[i].answer.length) {
                    //@ts-ignore
                    return `${questions[i].question} is a required field`
                }
            }
        }
        return false;
    }
    return (
        <div className='w-[100vw] h-[100vh] flex items-center justify-center'>
            <div className='max-h-[812px] px-[10px] max-w-[412px] w-[100%] h-[100%] flex flex-col'>
                {!showResults ? <>
                    <div className='flex w-[100%] justify-center mt-[15px]'>
                        <div className='text-[18px] leading-[20px] text-black font-semibold'>{quizName}</div>
                    </div>
                    <div className='w-[100%] mt-[30px]'>
                        <LinearProgress
                            variant="determinate"
                            value={Math.round(currentQuestion / questions.length * 100)}
                            sx={{ height: '12px', borderRadius: '999px', color: '#31CD63' }}
                            color='success'
                        />
                    </div>
                    <div className='w-[100%] mt-[30px] flex justify-center flex-col'>
                        <div className='text-navyBlue text-[22px] font-semibold leading-[30px]'>
                            {questions[currentQuestion].question}
                        </div>
                        {(questions[currentQuestion].type === 'Short Text' || questions[currentQuestion].type === 'Long Text') &&
                            <textarea
                                maxLength={questions[currentQuestion].maxCharacters ? questions[currentQuestion].maxCharactersLength : false}
                                value={answers[currentQuestion] ? answers[currentQuestion].answer : ''}
                                className='bg-white rounded-[4px] h-[150px] mt-[15px] px-[5px] py-[10px]'
                                placeholder='Write your answer here...'
                                onChange={(e) => {
                                    const currArr = answers;
                                    currArr[currentQuestion].answer = e.target.value;
                                    setAnswers([...currArr]);
                                }}
                            />
                        }
                        {questions[currentQuestion].type === 'Multiple Choice' &&
                            <div className='w-[100%] flex flex-col gap-[10px] mt-[30px]'>
                                {questions[currentQuestion].choices.map((choice: string, idx: number) => {
                                    return <div
                                        className={`flex items-center w-[100%] justify-center `}
                                        key={choice}
                                        onClick={(e) => {
                                            const currArr = answers;
                                            currArr[currentQuestion].answer = choice
                                            setAnswers([...currArr]);
                                        }}
                                    >

                                        <div className={`flex items-center text-black w-[100%] rounded-[4px] py-[5px] gap-[15px] px-[10px] hover:text-white hover:bg-[#45C486] relative ${choice === answers[currentQuestion].answer ? 'bg-green' : 'bg-white'}`}
                                        >
                                            <div className='w-[36px] h-[36px] flex items-center justify-center text-black font-semibold uppercase bg-skin rounded-full'>
                                                {String.fromCharCode(97 + idx)}
                                            </div>
                                            <div className='text-semibold text-[16px]'>
                                                {choice}
                                            </div>
                                        </div>

                                    </div>
                                })}
                            </div>
                        }
                        {questions[currentQuestion].type === 'Yes/No' &&
                            <div className='w-[100%] flex flex-col gap-[10px] mt-[30px]'>
                                <div className='flex items-center w-[100%] justify-center'>
                                    <div className={`flex items-center text-black w-[100%] rounded-[4px] py-[5px] gap-[15px] px-[10px] hover:text-white hover:bg-[#45C486] relative ${questions[currentQuestion].yes === answers[currentQuestion].answer ? 'bg-green' : 'bg-white'}`}
                                        onClick={(e) => {
                                            console.log('im called')
                                            const currArr = answers;
                                            currArr[currentQuestion].answer = questions[currentQuestion].yes
                                            setAnswers([...currArr]);
                                        }}
                                    >
                                        <div className='w-[46px] h-[36px] flex items-center justify-center text-black font-semibold uppercase bg-skin rounded-full'>
                                            Yes
                                        </div>
                                        <div className='text-semibold text-[16px]'>
                                            {questions[currentQuestion].yes}
                                        </div>
                                    </div>
                                </div>
                                <div className='flex items-center w-[100%] justify-center'>
                                    <div className={`flex items-center text-black w-[100%] rounded-[4px] py-[5px] gap-[15px] px-[10px] hover:text-white hover:bg-[#45C486] relative ${questions[currentQuestion].no === answers[currentQuestion].answer ? 'bg-green' : 'bg-white'}`}
                                        onClick={(e) => {
                                            const currArr = answers;
                                            currArr[currentQuestion].answer = questions[currentQuestion].no;
                                            setAnswers([...currArr]);
                                        }}
                                    >
                                        <div className='w-[46px] h-[36px] flex items-center justify-center text-black font-semibold uppercase bg-skin rounded-full'

                                        >
                                            No
                                        </div>
                                        <div className='text-semibold text-[16px]'>
                                            {questions[currentQuestion].no}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        }
                    </div>
                    <div className='flex items-center justify-between gap-[30px] px-[15px] mt-[60px]'>
                        <button className={`bg-black  rounded-[8px] h-[60px] flex items-center justify-center w-[100%] text-white uppercase ${currentQuestion === 0 && 'opacity-[0.2]'}`}
                            onClick={() => { if (currentQuestion - 1 >= 0) setCurrentQuestion(currentQuestion => currentQuestion - 1) }}
                        >
                            Back
                        </button>
                        <button className='bg-green rounded-[8px] h-[60px] flex items-center justify-center w-[100%] text-white uppercase'
                            onClick={() => {
                                if (currentQuestion + 1 < maxLength) setCurrentQuestion(currentQuestion => currentQuestion + 1)
                                else {
                                    const res = validateAll();
                                    if (res) {
                                        warningMessage(res);
                                    }
                                    else setShowSubmitModal(true)
                                }
                            }}
                        >
                            {currentQuestion === maxLength - 1 ? "Finish" : "Next"}
                        </button>
                    </div>
                </>
                    : <><div className='w-[100%] flex justify-center items-center h-[100%]'>
                        <div className='text-[22px] text-navyBlue font-semibold text-center'>
                            {`Results of ${quizName}`}
                            <div className='w-[350px] h-[150px] bg-white rounded-[4px] flex flex-col items-center justify-center w-[100%] gap-[15px] mt-[60px]'>
                                <div className='w-[100%] h-[100%] flex items-center justify-around'>
                                    <div className='flex items-center gap-[15px]'>
                                        <div className='w-[48px] h-[48px] flex items-center justify-center bg-skin rounded-full'>
                                            ✔️
                                        </div>
                                        <div>
                                            {calculateScore()}
                                        </div>
                                    </div>
                                    <div className='uppercase text-[18px]'>
                                        Score Gained
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                        <button className='mb-[60px] px-[10px] bg-green rounded-[8px] h-[60px] flex items-center justify-center w-[100%] text-white uppercase'
                            onClick={() => redirect('/')}
                        >
                            Okay
                        </button>
                    </>
                }
            </div>
            <Modal open={showSubmitModal}>
                <div className='absolute top-[50%] left-[50%] bg-white rounded-[4px] py-[60px] w-[100%] flex flex-col items-center'
                    style={{ transform: 'translate(-50%,-50%)' }}
                >
                    <div className='text-black text-[24px] font-semibold'>{fetching ? "Submitting" : "You sure you want to submit?"}</div>
                    {!fetching ? <div className='flex items-center justify-between gap-[15px] mt-[30px]'>
                        <button className={`bg-black px-[10px] rounded-[8px] h-[60px] flex items-center justify-center w-[100%] text-white uppercase ${currentQuestion === 0 && 'opacity-[0.2]'}`}
                            onClick={() => setShowSubmitModal(false)}
                        >
                            No , dont submit
                        </button>
                        <button className='px-[10px] bg-green rounded-[8px] h-[60px] flex items-center justify-center w-[100%] text-white uppercase'
                            onClick={submitHandler}
                        >
                            Yes, submit
                        </button>
                    </div> : <div className='mt-[30px]'>
                        <PulseLoader color='#31CD63' />
                    </div>}
                </div>
            </Modal>
            <Toaster />
        </div >
    )
}

export default ViewPage