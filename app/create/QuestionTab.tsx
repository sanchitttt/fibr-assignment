import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { validColor } from '../utils';
import { motion } from 'framer-motion';
import createQuizSlice from '../redux/features/createQuiz';

const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30
};

function QuestionTab() {
    const dispatch = useAppDispatch();
    const { selectedQuestion } = useAppSelector((state) => state.createQuiz);
    const { updateRequiredStatus, updatedMaxCharacters, updateMaxCharactersLength } = createQuizSlice.actions;
    return (
        <div className='w-[100%] flex flex-col text-[14px]'>
            {selectedQuestion &&
                <>
                    <div className='flex gap-[10px] justify-start px-[10px] items-center py-[30px] border-b-[1px] border-[#e3e3e3]'>
                        <div className='text-[14px] text-black'>Type</div>
                        <div
                            className='px-[5px] rounded-[4px] py-[5px]'
                            style={{ background: validColor(selectedQuestion.type) }}>
                            {selectedQuestion?.type}
                        </div>
                    </div>
                    <div className='flex gap-[20px] justify-center px-[10px] items-start py-[30px] border-b-[1px] border-[#e3e3e3] flex-col'>
                        <div className='text-[14px] text-black'>Settings</div>
                        <div className='flex justify-between w-[90%] items-center'>
                            <div>Required</div>
                            <div className={`switch w-[40px] h-[25px]  flex justify-start rounded-[50px] p-[2.5px] pointer ${selectedQuestion.required ? 'bg-[#0487AF] justify-end' : 'bg-[#bbb]'} `} onClick={() => {
                                dispatch(updateRequiredStatus(selectedQuestion.id))
                            }}>
                                <motion.div className="w-[20px] h-[20px] bg-white rounded-[40px]" layout transition={spring} />
                            </div>
                        </div>
                        {(selectedQuestion.type === 'Long Text' || selectedQuestion.type === 'Short Text') &&
                            <>
                                <div className='flex justify-between w-[90%] items-center'>
                                    <div>Max characters</div>
                                    <div className={`switch w-[40px] h-[25px]  flex justify-start rounded-[50px] p-[2.5px] pointer ${selectedQuestion.maxCharacters ? 'bg-[#0487AF] justify-end' : 'bg-[#bbb]'} `} onClick={() => dispatch(updatedMaxCharacters(selectedQuestion.id))}>
                                        <motion.div className="w-[20px] h-[20px] bg-white rounded-[40px]" layout transition={spring} />
                                    </div>
                                </div>
                                {selectedQuestion.maxCharacters &&
                                    <input
                                        placeholder='0-9999'
                                        type='number'
                                        value={selectedQuestion.maxCharactersLength ? selectedQuestion.maxCharactersLength : 0}
                                        onChange={(e) => dispatch(updateMaxCharactersLength({ id: selectedQuestion.id, length: +e.target.value }))}
                                        className=' border-[1px] border-[#e3e3e3] w-[90%] py-[5px] px-[2.5px]'
                                    />
                                }

                            </>
                        }
                    </div>
                </>
            }


        </div >
    )
}

export default QuestionTab