import React from 'react'

const mockQuizzes = [
    'Quiz 1'
]

function WorkSpaceSideBar() {
    return null;
    return (
        <aside className='w-[256px] h-[100vh] bg-white border-r-[1px] border-[#00000012]  flex flex-col items-center justify-center'>
            <div className='w-[90%] h-[90%]'>
                <div className='uppercase text-[12px] text-grey'>
                    Quizzes
                </div>
                <div className='mt-[10px]'>
                    {mockQuizzes.map((item) => {
                        return <div key={item} className='my-[5px]'>
                            {item}
                        </div>
                    })}
                </div>
            </div>
        </aside>
    )
}

export default WorkSpaceSideBar