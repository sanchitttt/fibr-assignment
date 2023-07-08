'use client';
import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks';
import createQuizSlice from '../redux/features/createQuiz';
import { CancelIcon } from '../components/icons';
import Image from 'next/image';
import { Tooltip } from 'react-tooltip';

type ChoiceEdit = {
  id: string,
  idx: number,
  value: string
}

type YesNoEdit = {
  id: string,
  value: string
}

function Canvas() {
  const { selectedQuestion } = useAppSelector((state) => state.createQuiz);
  const dispatch = useAppDispatch();
  const { updateQuestion,
    manageChoicesInMultipleChoiceQuestion,
    updateChoiceNameInMultipleChoiceQuestion,
    updateChoiceInYesNoQuestion
  } = createQuizSlice.actions;
  const [tempEditedVal, setTempEditedVal] = useState<null | ChoiceEdit>(null)
  const [editingMode, setEditingMode] = useState<null | number>(null);
  const [yesNoEditMode, setYesNoEditMode] = useState<null | 'yes' | 'no'>(null);
  const [tempYesNoEditVal, setTempYesNoEditVal] = useState<null | YesNoEdit>(null);

  if (selectedQuestion) {
    if (selectedQuestion.type === 'Short Text' || selectedQuestion.type === 'Long Text') {
      console.log('executed 1')
      return (
        <div className='w-[100%] flex items-center  justify-center '>
          <div className='w-[90%] h-[70%]  shadow-v1 rounded-[4px] flex  items-center justify-center bg-skin'>
            <div className='text-[20px] w-[100%] flex items-center justify-center flex-col'>
              <textarea
                className='w-[50%] text-navyBlue font-bold text-[22px]'
                value={selectedQuestion.question}
                onChange={(e) => dispatch(updateQuestion({
                  id: selectedQuestion.id,
                  value: e.target.value
                }))}
                placeholder='Write your question here'
              />
              <div className='text-[20px] w-[100%] flex items-center justify-center flex-col'>
                <textarea
                  className='w-[50%] bg-white px-[5px] pt-[5px] rounded-[4px] text-black text-[16px] font-semibold'
                  placeholder='Type your answer here!'
                  disabled={true}
                />
              </div>
              <button className='bg-green rounded-[8px] h-[60px] flex items-center justify-center w-[30%] text-white uppercase mt-[60px]'>
                Continue
              </button>
            </div>
          </div>
        </div>
      )
    }
    else if (selectedQuestion.type === 'Multiple Choice') {
      return (
        <div className='w-[100%] flex items-center  justify-center '>
          <div className='w-[90%] h-[70%]  shadow-v1 rounded-[4px] flex  items-center justify-center bg-skin'>
            <div className='text-[20px] w-[100%] flex items-center justify-center flex-col'>
              <textarea
                className='w-[50%] text-navyBlue font-bold text-[22px]'
                value={selectedQuestion.question}
                onChange={(e) => dispatch(updateQuestion({
                  id: selectedQuestion.id,
                  value: e.target.value
                }))}
                placeholder='Write your question here'
              />
              <div className='flex flex-col gap-[10px] w-[100%] items-center'>
                {selectedQuestion.choices.map((choice, idx) => {
                  return <div className='flex items-center w-[50%] justify-center' key={choice} >

                    <div className='flex items-center text-black bg-white w-[100%] rounded-[4px] py-[5px] gap-[15px] px-[10px] hover:text-white hover:bg-[#45C486] relative'>
                      <div className='w-[36px] h-[36px] flex items-center justify-center text-black font-semibold uppercase bg-skin rounded-full'>
                        {String.fromCharCode(97 + idx)}
                      </div>
                      {editingMode || editingMode === 0 ?
                        <input
                          type='text'
                          value={editingMode === idx ? tempEditedVal?.value : choice}
                          onChange={(e) => setTempEditedVal({ id: selectedQuestion.id, idx: idx, value: e.target.value })}
                          className='text-semibold text-[16px]'
                        /> : <div className='text-semibold text-[16px]'>
                          {choice}
                        </div>}
                    </div>
                    <div className='flex items-center gap-[10px] ml-[5px]'>
                      <button className='bg-[#e3e3e3] w-[32px] h-[32px] flex items-center justify-center rounded-[4px]'
                        data-tooltip-id="SaveChoice" data-tooltip-content="Save choice"
                        onClick={() => dispatch(manageChoicesInMultipleChoiceQuestion({ id: selectedQuestion.id, choice: idx, type: 'remove' }))}
                      >
                        <Image
                          src='/CancelIcon.svg'
                          width={16}
                          height={16}
                          alt='Cancel'
                        />
                      </button>
                      {editingMode === idx ?
                        <button className='w-[32px] h-[32px] flex items-center justify-center bg-[#e3e3e3] rounded-[4px]'
                          data-tooltip-id="SaveChoice" data-tooltip-content="Save choice"
                          onClick={() => {
                            setEditingMode(null)
                            dispatch(updateChoiceNameInMultipleChoiceQuestion(tempEditedVal as ChoiceEdit))
                            setTempEditedVal(null)
                          }}
                        >
                          <Image
                            src='/SaveIcon.svg'
                            width={14}
                            height={14}
                            alt='Save choice'
                          />
                        </button>
                        :
                        <button className='w-[32px] h-[32px] flex items-center justify-center bg-[#e3e3e3] rounded-[4px]'
                          data-tooltip-id="editMultipleChoice" data-tooltip-content="Edit choice"
                          onClick={() => setEditingMode(idx)}
                        >
                          <Image
                            src='/PencilEdit.svg'
                            width={14}
                            height={14}
                            alt='Edit choice'
                          />
                        </button>
                      }

                    </div>

                  </div>
                })}
                <div>

                </div>
                <button className='w-[50%] underline'
                  onClick={() => dispatch(manageChoicesInMultipleChoiceQuestion({ id: selectedQuestion.id, type: 'add' }))}
                >
                  Add
                </button>
              </div>
              <button className='bg-green rounded-[8px] h-[60px] flex items-center justify-center w-[30%] text-white uppercase mt-[60px]'>
                Continue
              </button>
            </div>
          </div>
          <Tooltip id='editMultipleChoice' />
          <Tooltip id='DeleteChoice' />
          <Tooltip id='SaveChoice' />
        </div>
      )
    }
    else if (selectedQuestion.type === 'Yes/No') {
      console.log(selectedQuestion)
      return (
        <div className='w-[100%] flex items-center  justify-center '>
          <div className='w-[90%] h-[70%]  shadow-v1 rounded-[4px] flex  items-center justify-center bg-skin'>
            <div className='text-[20px] w-[100%] flex items-center justify-center flex-col'>
              <textarea
                className='w-[50%] text-navyBlue font-bold text-[22px]'
                value={selectedQuestion.question}
                onChange={(e) => dispatch(updateQuestion({
                  id: selectedQuestion.id,
                  value: e.target.value
                }))}
                placeholder='Write your question here'
              />
              <div className='w-[100%] flex flex-col items-center justify-center gap-[15px]'>
                <div className='flex w-[100%] flex items-center justify-center gap-[10px]'>
                  <div className='flex w-[48%] bg-white rounded-full py-[5px] px-[15px] items-center gap-[10px] hover:bg-[#45C486]'>
                    <div className='w-[60px] h-[36px] flex items-center justify-center text-black font-semibold uppercase bg-skin rounded-full'>
                      {"Yes"}
                    </div>
                    {yesNoEditMode === 'yes' ?
                      <input
                        type='text'
                        value={tempYesNoEditVal?.value ? tempYesNoEditVal.value : selectedQuestion.yes}
                        onChange={(e) => setTempYesNoEditVal({ id: selectedQuestion.id, value: e.target.value })}
                      />
                      : <div className=''>
                        {selectedQuestion.yes}
                      </div>
                    }
                  </div>
                  {yesNoEditMode === 'yes' ?
                    <>
                      <button className='w-[32px] h-[32px] flex items-center justify-center bg-[#e3e3e3] rounded-[4px]'
                        data-tooltip-id="SaveChoice" data-tooltip-content="Save choice"
                        onClick={() => {
                          setYesNoEditMode(null);
                          dispatch(updateChoiceInYesNoQuestion({ id: selectedQuestion.id, type: 'yes', value: tempYesNoEditVal?.value as string | null }))
                          setTempYesNoEditVal(null)
                        }}
                      >
                        <Image
                          src='/SaveIcon.svg'
                          width={14}
                          height={14}
                          alt='Save choice'
                        />
                      </button>
                    </>
                    : <div className='flex gap-[5px]'>
                      <button className='w-[32px] h-[32px] flex items-center justify-center bg-[#e3e3e3] rounded-[4px]'
                        data-tooltip-id="editMultipleChoice" data-tooltip-content="Edit choice"
                        onClick={() => {
                          setYesNoEditMode('yes');

                        }}
                      >
                        <Image
                          src='/PencilEdit.svg'
                          width={14}
                          height={14}
                          alt='Edit choice'
                        />
                      </button>
                    </div>

                  }
                </div>
                <div className='flex w-[100%] flex items-center justify-center gap-[10px]'>
                  <div className='flex w-[48%] bg-white rounded-full py-[5px] px-[15px] items-center gap-[10px] hover:bg-[#45C486]'>
                    <div className='w-[60px] h-[36px] flex items-center justify-center text-black font-semibold uppercase bg-skin rounded-full'>
                      {"No"}
                    </div>
                    {yesNoEditMode === 'no' ?
                      <input
                        type='text'
                        value={tempYesNoEditVal?.value ? tempYesNoEditVal.value : selectedQuestion.no}
                        onChange={(e) => setTempYesNoEditVal({ id: selectedQuestion.id, value: e.target.value })}
                      />
                      : <div className=''>
                        {selectedQuestion.no}
                      </div>
                    }

                  </div>
                  {yesNoEditMode === 'no' ?
                    <>
                      <button className='w-[32px] h-[32px] flex items-center justify-center bg-[#e3e3e3] rounded-[4px]'
                        data-tooltip-id="SaveChoice" data-tooltip-content="Save choice"
                        onClick={() => {
                          setYesNoEditMode(null);
                          dispatch(updateChoiceInYesNoQuestion({ id: selectedQuestion.id, type: 'no', value: tempYesNoEditVal?.value as string | null }))
                          setTempYesNoEditVal(null)
                        }}
                      >
                        <Image
                          src='/SaveIcon.svg'
                          width={14}
                          height={14}
                          alt='Save choice'
                        />
                      </button>
                    </>
                    : <div className='flex gap-[5px]'>
                      <button className='w-[32px] h-[32px] flex items-center justify-center bg-[#e3e3e3] rounded-[4px]'
                        data-tooltip-id="editMultipleChoice" data-tooltip-content="Edit choice"
                        onClick={() => {
                          setYesNoEditMode('no')
                        }}
                      >
                        <Image
                          src='/PencilEdit.svg'
                          width={14}
                          height={14}
                          alt='Edit choice'
                        />
                      </button>
                    </div>

                  }
                </div>
              </div>
              <button className='bg-green rounded-[8px] h-[60px] flex items-center justify-center w-[30%] text-white uppercase mt-[60px]'>
                Continue
              </button>
            </div>
          </div>
          <Tooltip id='editMultipleChoice' />
          <Tooltip id='DeleteChoice' />
          <Tooltip id='SaveChoice' />
        </div >
      )
    }

  }
  return <div className='w-[100%] flex items-center  justify-center '>
    <div className='w-[90%] h-[70%] bg-white shadow-v1 rounded-[4px] flex items-center justify-center'>
    </div>
  </div>

}

export default Canvas