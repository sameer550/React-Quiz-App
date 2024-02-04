import React from "react";

const SelectedBtn = ({
  selectedOption,
  setSelectedOption,
  question,
  selectedQuestionIndex,
  setSelectedQuestionIndex,
  quizQuestions,
  setShowQuiz,
}) => {
  return (
    <div>
      <div className="flex min-h-40 max-h-40 justify-center">
        {selectedOption && (
          <div className="justify-center">
            <div>
              {selectedOption === question?.correct_answer ? (
                <h1 className="text-xl text-green-800">Correct Answer</h1>
              ) : (
                <h1 className="text-xl text-rose-700">Incorrect Answer</h1>
              )}
            </div>
            <div className="">
              <button
                className="w-[150px] py-1 mt-10 ps-1 pe-1 text-black text-xs border border-solid border-black text-center rounded-md"
                onClick={() => {
                  setSelectedQuestionIndex((prevIndex) => prevIndex + 1);
                  if (selectedQuestionIndex >= quizQuestions.length - 1) {
                    setShowQuiz(false);
                  }
                  setSelectedOption(null);
                }}
              >
                Next Question
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectedBtn;
