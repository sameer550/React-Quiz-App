import React from 'react'

const QuestionBar = ({progress})=> {
  return (
      
       <div className="mt-0">
       
        <div
          className="bg-[#a9aaa9] h-[4vh] transition-width duration-500"
          style={{ width: `${progress}%` }}
        ></div>
        
      </div>
  )
}

export default QuestionBar;