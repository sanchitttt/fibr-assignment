'use client';
import React, { useEffect, useState } from 'react'
import { Tooltip } from 'react-tooltip'
import QuestionDialog from './QuestionDialog'
import { useAppDispatch, useAppSelector } from '../../../hooks';
import createQuizSlice from '../../../redux/features/editQuiz';
import { Reorder } from 'framer-motion';
import { slicedQuestion, validColor, validSVG } from '../../../utils';




function Sidebar() {
    const [showQuestionDialogue, setShowQuestionDialogue] = useState(false);
    const { questions, selectedQuestion } = useAppSelector((state) => state.createQuiz)
    const { changeSelectedQuestion } = createQuizSlice.actions;
    const dispatch = useAppDispatch();
    return (
        <aside className='w-[256px] h-[100%] bg-white border-r-[1px] border-[#00000012]  flex flex-col items-center justify-center relative'>
            <div className='w-[100%] h-[90%]'>
                <div className='flex justify-between items-center  px-[15px]'>
                    <div className='uppercase text-[14px] text-grey'>
                        QUESTIONS
                    </div>
                    <button
                        onClick={() => setShowQuestionDialogue(true)}
                        className='flex rounded-[4px] justify-center items-center w-[32px] h-[32px] bg-[#e3e3e3]'
                        data-tooltip-id="addQuestion" data-tooltip-content="Add a new question"
                    >
                        <svg style={{ fill: 'black' }} width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M0 6c0-1.10457.89543-2 2-2h8c0 1.10457-.89543 2-2 2H0z"></path><path fillRule="evenodd" clipRule="evenodd" d="M6 0v8c0 1.10457-.89543 2-2 2V2c0-1.104569.89543-2 2-2z"></path></svg>
                    </button>
                </div>
                <div className='w-[100%] flex flex-col gap-[25px] mt-[25px] '>
                    <Reorder.Group axis='y' values={questions}
                        onReorder={(items) => dispatch(createQuizSlice.actions.updateQuestionsOrder(items))}
                    >
                        {questions.map((item, idx) => {
                            return <Reorder.Item value={item} key={item.id}>
                                <button
                                    className={`w-[100%] transition ease flex items-center h-[56px] justify-between hover:bg-[#e3e3e3] ${item.id === selectedQuestion?.id && 'bg-[#e3e3e3]'} px-[15px]`}
                                    onClick={() => dispatch(changeSelectedQuestion(item.id))}

                                >
                                    <div className='flex items-center justify-around w-[54px] h-[28px] rounded-[4px]'
                                        style={{ background: validColor(item.type) }}
                                    >
                                        {validSVG(item.type)}
                                        <div className='text-[14px] font-bold'>{idx + 1}</div>
                                    </div>
                                    <div className='text-[12px] w-[60%] text-right'>{slicedQuestion(item.question)}</div>
                                </button>
                            </Reorder.Item>
                        })}
                    </Reorder.Group>
                </div>
            </div>

            <QuestionDialog open={showQuestionDialogue} closeDialog={() => setShowQuestionDialogue(false)} />
            <Tooltip id='addQuestion' />
            <Tooltip id='Cancel' />

        </aside>
    )
}

export default Sidebar