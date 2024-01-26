"use client";
import React, { useEffect } from "react";
import { useState, useMemo } from "react";
import { IoIosStar } from "react-icons/io";
import { IoIosStarOutline } from "react-icons/io";

const shuffleOptions = (correctAnswer, incorrectAnswers) => {
  const array = [...incorrectAnswers, correctAnswer];
  return array.sort(() => Math.random() - 0.5);
};

const QuizLayout = ({
  question,
  options,
  setOptions,
  setSelectedQuestionIndex,
  setProgress,
  setQuestionIndex,
  questionIndex,
  quizQuestions,
  setShowQuiz,
  selectedQuestionIndex,
}) => {
  const starConfig = {
    hard: [1, 2, 3],
    medium: [1, 2],
    easy: [1],
  };
  const correctAnswer = decodeURIComponent(question?.correct_answer);
  const buttons = useMemo(
    () => shuffleOptions(question.correct_answer, question.incorrect_answers),
    [questionIndex]
  );

  const handleButtonClick = (text) => {
    setOptions(text);
    setProgress((prevIndex) => prevIndex + 4.75);
  };

  const difficultyLevel = question.difficulty;

  return (
    <div className="w-1/1">
      {/* Quiz Question */}
      <div className="mt-10">
        <h1 className="text-xl text-current">
          {" "}
          Question {questionIndex} of 20{" "}
        </h1>
        <p className="text-gray-500 text-[12px]">{question.category}</p>

        <div className="display: inline-flex mr-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="">
              {starConfig[difficultyLevel].includes(index + 1) ? (
                <IoIosStar />
              ) : (
                <IoIosStarOutline />
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col items-start justify-start ">
          <p className="mt-5 max-w-md h-10 w-400">{question.question}</p>
        </div>
        <div className="flex flex-wrap gap-x-9 gap-y-4 max-w-[500px] mt-10">
          {buttons.map((button, index) => (
            <button
              disabled={options}
              key={index}
              className={`w-[190px] py-1 my-2 ps-2 pe-2 text-xs border border-solid border-black text-center rounded-md  ${
                options === button ? "bg-black text-gray-50" : "bg-[#e5e6e5]"
              }`}
              onClick={() => handleButtonClick(button)}
            >
              {button}
            </button>
          ))}
        </div>
        <div className="flex min-h-40 max-h-40 justify-center items-center ">
          {options && (
            <div className="">
              <div>
                {options === correctAnswer ? (
                  <h1 className="text-xl text-green-800">Correct</h1>
                ) : (
                  <h1 className="text-xl text-rose-700">Sorry!</h1>
                )}
              </div>
              <div className="ml-[-30px]">
                <button
                  className="w-[150px] py-1 mt-10 ps-1 pe-1 text-xs border border-solid border-black text-center rounded-md"
                  onClick={() => {
                    if (questionIndex > quizQuestions.length - 1) {
                      setShowQuiz(false);
                    }
                    setOptions(null);
                    setSelectedQuestionIndex((prevIndex) => prevIndex + 1);
                    setQuestionIndex((prevIndex) => prevIndex + 1);
                  }}
                >
                  Next question
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizLayout;
