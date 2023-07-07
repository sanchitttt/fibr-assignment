import React from 'react'
import createQuizSlice, { QuestionType } from '../redux/features/createQuiz';
import { useAppDispatch } from '../hooks';
import { CancelIcon } from '../components/icons';
import { v4 as uuid } from 'uuid';

interface Questions {
    text: QuestionType,
    background: string,
    svg: React.ReactNode
}

export const MultipleChoiceSVG = <svg style={{ fill: 'black' }} width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M13.7072.707124L5.00008 9.41423.292969 4.70712c.781051-.78104 2.047381-.78104 2.828431 0L5.00008 6.5858 10.8788.707124c.781-.7810482 2.0473-.7810482 2.8284 0z"></path></svg>
export const ShortTextSVG = <svg style={{ fill: 'black' }} width="14" height="6" viewBox="0 0 14 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h7v2H0V0zM9 0h5v2H9V0zM0 4h3v2H0V4zM5 4h9c0 1.10457-.8954 2-2 2H5V4z"></path></svg>
export const LongTextSVG = <svg style={{ fill: 'black' }} width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 8h6c0 1.10457-.8954 2-2 2H8V8zM0 8h6v2H0V8zM5 4h9v2H5V4zM0 4h3v2H0V4zM10 0h4v2h-4V0zM0 0h8v2H0V0z"></path></svg>
export const YesNoSVG = <svg style={{ fill: 'black' }} width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.13086.368561C3.71236.368561.130859 3.95006.130859 8.36856c0 4.41854 3.581501 8.00004 8.000001 8.00004 4.41854 0 8.00004-3.5815 8.00004-8.00004 0-4.4185-3.5815-7.999999-8.00004-7.999999zm0 14.500039c-3.584 0-6.5-2.916-6.5-6.50004 0-3.584 2.916-6.5 6.5-6.5V14.8686z"></path></svg>

const questionsType: Questions[] = [
    {
        text: 'Multiple Choice',
        background: '#D65C99',
        svg: MultipleChoiceSVG
    },
    {
        text: 'Short Text',
        background: 'rgb(55, 156, 251)',
        svg: ShortTextSVG
    },
    {
        text: 'Long Text',
        background: 'rgb(55, 156, 251)',
        svg: LongTextSVG
    },
    {
        text: 'Yes/No',
        background: 'rgb(224, 133, 179)',
        svg: YesNoSVG
    },
]

function QuestionDialog({ open, closeDialog }: {
    open: boolean,
    closeDialog: Function
}) {
    const { addNewQuestion, changeSelectedQuestion } = createQuizSlice.actions;
    const dispatch = useAppDispatch();
    if (!open) return null;
    return (
        <div className='absolute right-[-320px] top-[45px]  rounded-[4px] bg-white shadow-v2 flex items-center justify-center flex-col gap-[10px] text-[14px] '>
            <div className='w-[100%] flex items-center justify-between h-[40px]'>
                <div></div>
                <div className='px-[15px]'
                    onClick={() => closeDialog()}
                >
                    <CancelIcon />
                </div>
            </div>
            {questionsType.map(({ text, background, svg }) => {
                return <button
                    onClick={() => {
                        if (text === "Short Text" || text === "Long Text") {
                            const generatedUUID = uuid()
                            dispatch(addNewQuestion({
                                maxCharactersLength: null,
                                required: false,
                                maxCharacters: false,
                                id: generatedUUID,
                                type: text === 'Short Text' ? 'Short Text' : 'Long Text',
                                question: text === 'Short Text' ? 'Short Text Question' : 'Long Text Question'
                            }));
                            dispatch(changeSelectedQuestion(generatedUUID));
                        }
                        else if (text === 'Multiple Choice') {
                            const generatedUUID = uuid()
                            dispatch(addNewQuestion({
                                required: false,
                                id: generatedUUID,
                                type: 'Multiple Choice',
                                question: 'Multiple Choice Question',
                                choices: ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4'],
                                correctChoice: 'Choice 1'
                            }))
                            dispatch(changeSelectedQuestion(generatedUUID));
                        }
                        else if (text === 'Yes/No') {
                            const generatedUUID = uuid()
                            dispatch(addNewQuestion({
                                required: false,
                                id: generatedUUID,
                                type: 'Yes/No',
                                question: 'Yes/No Question',
                                yes: 'Yes',
                                no: 'No',
                                correct: 'Yes'
                            }))
                            dispatch(changeSelectedQuestion(generatedUUID));
                        }
                        closeDialog()
                    }}
                    key={text} className={`w-[280px] flex items-center gap-[15px] px-[15px] h-[40px] last:py-[10px] first:py-[10px] hover:bg-[#e3e3e3]`}
                >
                    <div className='w-[24px] h-[24px] flex items-center justify-center rounded-[4px]'
                        style={{ background: background }}
                    >
                        {svg}
                    </div>
                    {text}
                </button>
            })}
        </div>
    )
}

export default QuestionDialog