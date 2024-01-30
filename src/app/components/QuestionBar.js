import React from "react";

const QuestionBar = ({ progress }) => {
  // var progress = 0;
  // if(!selectedQuestionIndex){
  //   progress+=1;
  // }
  // else{
  //   progress = selectedQuestionIndex;
  // }
  return (
    <div className="mt-0">
      <div
        className="bg-[#a9aaa9] h-[4vh] transition-width duration-500"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default QuestionBar;
