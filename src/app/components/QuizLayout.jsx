"use client";
import React from "react";
import { useState } from "react";
import { IoIosStar } from "react-icons/io";
import { IoIosStarOutline } from "react-icons/io";
import { useRouter } from 'next/navigation'

const QuizLayout = ({
  question,
  selectedQuestionIndex,
  score,
  setScore,
  selectedButton,
  setSelectedButton,
  setSelectedQuestionIndex,
  setProgress,
  progress,
  progressValues,
  setQuestionIndex,
  questionIndex,
  quizQuestions,
  setIsFlg
}) => {
  const router = useRouter();
  const correctAnswer = decodeURIComponent(question?.correct_answer);

  const colors = ["bg-[#000000]", "bg-[#717171]", "bg-[#d2d2d2]"];
  const handleButtonClick = (text) => {
    setSelectedButton(text);
    setProgress((prevIndex) => prevIndex + 5);
  };

  const shuffleArray = (array) => array.sort(() => Math.random() - 1);

  const mixButtons = [
    decodeURIComponent(question?.correct_answer),
    ...question?.incorrect_answers.map((answer) => decodeURIComponent(answer)),
  ];

  const buttons = shuffleArray(mixButtons);
  const difficultyLevel = question.difficulty;

  return (
    <div className="h-screen w-50">
      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-0">
        <div
          className="bg-gray-500 h-2.5 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Quiz Question */}
      <div className="mt-20">
        <h1 className="text-xl text-current">
          {" "}
          Question {questionIndex} of 20{" "}
        </h1>
        <p className="text-xs text-slate-500">
          {decodeURIComponent(question?.category)}
        </p>

        <div className="">
          {difficultyLevel == "hard" && (
            <div className="display: inline-flex mr-3">
              <IoIosStar />
              <IoIosStar />
              <IoIosStar />
            </div>
          )}
          {difficultyLevel == "medium" && (
            <div className="display: inline-flex mr-3">
              <IoIosStar />
              <IoIosStar />
              <IoIosStarOutline />
            </div>
          )}
          {difficultyLevel == "easy" && (
            <div className="display: inline-flex gap-x-0.1">
              <IoIosStar />
              <IoIosStarOutline />
              <IoIosStarOutline />
            </div>
          )}
        </div>
        <p className="mt-5 max-w-xs overflow-hidden">{decodeURIComponent(question?.question)}</p>
        <div className="flex flex-wrap justify-around gap-1  max-w-[500px] mt-10">
          {buttons.map((button, index) => (
            <button
              disabled={selectedButton}
              key={index}
              className={`w-[190px] py-2 my-2 ps-2 pe-2 text-xs border border-solid border-black text-center rounded-md  ${
                selectedButton === button
                  ? "bg-black text-gray-50"
                  : "bg-[#e5e6e5]"
              }`}
              onClick={() => handleButtonClick(button)}
            >
              {button}
            </button>
          ))}
        </div>
        <div className=" flex min-h-20 justify-center mt-2">
          {selectedButton && (
            <div>
              {selectedButton === correctAnswer ? (
                <h1 className="text-xl text-green-800">Correct</h1>
              ) : (
                <h1 className="text-xl text-rose-700">Wrong Answer</h1>
              )}
            </div>
          )}
        </div>
    
        <div>
          {selectedButton && (
            <div className="flex justify-center">
              <button
                className="w-[190px] py-2 my-2 ps-2 pe-2 text-xs border border-solid border-black text-center rounded-md"
                onClick={() => {
                  console.log("Question",questionIndex);
                  console.log("quiz Question",quizQuestions.length)
                  if (questionIndex > quizQuestions.length - 1) {
                    setIsFlg(false);
                  }
                  setSelectedButton(null);
                  setSelectedQuestionIndex((prevIndex) => prevIndex + 1);
                  setQuestionIndex((prevIndex) => prevIndex + 1);
                }}
              >
                Next question
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="scoreBarTxts flex justify-between">
          <div className="">
            <p>
              Score :{" "}
              {isNaN(Math.round((score / 20) * 100))
                ? 0
                : Math.round((score / 20) * 100)}
              %
            </p>
          </div>
          <div>
            <p>
              Max Score :{" "}
              {/* {Math.round(((score + (20 - selectedQuestionIndex)) / 20) * 100)} */}
              {progressValues.highestPossiblescore}%
            </p>
          </div>
        </div>
      <div className="">
        <div className="w-full border-2 border-gray-600 rounded-[5px] h-6  mt-1 relative">
          {/* {progressValues.map((progress, index) => (
            <div
              key={index}
              className={`absolute ${colors[index]} h-full transition-all duration-300 ease-in-out`}
              style={{ width: `${progress}%` }}
            ></div>
          ))} */}
          <div
            className={`absolute ${colors[0]} h-full transition-all duration-300 ease-in-out z-10`}
            style={{
              width: `${progressValues.calculatePercentage}%`,
              transition: "width 0.5s",
            }}
          ></div>
          <div
            className={`absolute ${colors[2]} h-full transition-all duration-300 ease-in-out`}
            style={{
              width: `${progressValues.highestPossiblescore}%`,
              transition: "width 0.5s",
            }}
          ></div>
          <div
            className={`absolute ${colors[1]} h-full transition-all duration-300 ease-in-out`}
            style={{
              width: `${progressValues.calculateLowest}%`,
              transition: "width 0.5s",
            }}
          ></div>
        </div>

        {/* <div className="w-full flex flex-row border-2 border-gray-600 rounded-[5px] mt-1">
        <span
          className="bg-black h-7"
          style={{
            width: `${progressValues.calculatePercentage}%`,
            transition: "width 0.5s",
          }}
        ></span>
        <span
          className="bg-gray-500 h-7"
          style={{
            width: `${progressValues.highestPossiblescore}%`,
            transition: "width 0.5s",
          }}
        ></span>
        <span
          className="bg-gray-400 h-7"
          style={{
            width: `${calculateWidth(maxmScore - attemptQuestionsScore)}%`,
            transition: "width 0.5s",
          }}
        ></span>
      </div> */}
      </div>

      {/* 
          <ProgressBar>
            <ProgressBar striped variant="warning" now={Math.round(score / selectedQuestionIndex * 100)} key={1} />
            <ProgressBar variant="success" now={Math.round(score / totalAnswered * 100)} key={2} />
            <ProgressBar striped variant="danger" now={Math.round((score + (selectedQuestionIndex - totalAnswered)) / selectedQuestionIndex * 100)} key={3} />
          </ProgressBar> */}
    </div>
  );
};

export default QuizLayout;
