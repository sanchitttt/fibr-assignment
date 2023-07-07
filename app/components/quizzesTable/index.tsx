import React from 'react'

const mockQuizzes = [
    {
        name: 'Quiz 1',
        createdAt: '07 Jul 2023',
        updatedAt: '07 July 2023',
        questions: 2,
        responses: 2,
    }
]

function QuizzesTable() {
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
            {mockQuizzes.map((quiz) => {
                return <div key={quiz.name} className='box-content rounded-[10px] flex items-center justify-between w-[80%] my-[15px] px-[16px] py-[16px] bg-white shadow-v1 text-[14px]'>
                    <div className='w-[60%] flex flex-col'>
                        <div>{quiz.name}</div>
                        <div className='text-[12px] text-[#737373]'>Created at : {quiz.createdAt}</div>
                    </div>
                    <div className='w-[40%] flex items-center justify-between'>
                        <div className='w-[15%] text-center '>{quiz.questions}</div>
                        <div className='w-[15%] text-center '>{quiz.responses}</div>
                        <div className='w-[40%] text-center'>{quiz.updatedAt}</div>
                    </div>
                </div>
            })}
        </div>
    )
}

export default QuizzesTable