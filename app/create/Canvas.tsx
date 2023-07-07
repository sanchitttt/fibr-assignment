'use client';
import React from 'react'
import { useAppDispatch, useAppSelector } from '../hooks';
import createQuizSlice from '../redux/features/createQuiz';


function Canvas() {
  const { selectedQuestion } = useAppSelector((state) => state.createQuiz);
  const dispatch = useAppDispatch();
  const { updateQuestion } = createQuizSlice.actions;

  if (selectedQuestion) {
    return (
      <div className='w-[100%] flex items-center  justify-center '>
        <div className='w-[90%] h-[70%]  shadow-v1 rounded-[4px] flex items-center justify-center bg-skin'>
          <div className='text-[20px] w-[100%] flex items-center justify-center'>
            <textarea
              className='w-[50%]'
              value={selectedQuestion.question}
              onChange={(e) => dispatch(updateQuestion({
                id: selectedQuestion.id,
                value: e.target.value
              }))}
              placeholder='Write your question here'
            />
          </div>
        </div>
      </div>
    )
  }
  return <div className='w-[100%] flex items-center  justify-center '>
    <div className='w-[90%] h-[70%] bg-white shadow-v1 rounded-[4px] flex items-center justify-center'>
    </div>
  </div>
}

export default Canvas