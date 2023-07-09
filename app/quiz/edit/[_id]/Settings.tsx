import React, { useState } from 'react'
import QuestionTab from './QuestionTab';
type Tabs = 'Question' | 'Design';
const tabs: Tabs[] = ['Question', 'Design'];


function Settings() {
  const [selectedTab, setSelectedTab] = useState<Tabs>('Question');
  return (
    <div className='w-[240px] h-[100%] bg-white border-l-[1px] border-[#00000012]'>
      <div className='flex w-[100%] mt-[15px] border-b-[1px] border-[#e3e3e3]'>
        {tabs.map((tab) => {
          return <div className={`w-[50%] flex items-center justify-center  hover-border ${selectedTab === tab && 'border-b-[1px] border-black'}`}
            key={tab}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </div>
        })}
      </div>
      {selectedTab === 'Question' ?
        <QuestionTab />
        : <></>}
    </div>
  )
}

export default Settings