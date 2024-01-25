"use client";
import React, { useEffect } from "react";
import { useState,useMemo } from "react";
import { IoIosStar } from "react-icons/io";
import { IoIosStarOutline } from "react-icons/io";
import questionJson from "../questions.json";

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

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
  setQuestionIndex,
  questionIndex,
  quizQuestions,
  setShowQuiz
}) => {

  const decodedQuestions = questionJson.map(question => {
    const decodedQuestion = {
      ...question,
      category: decodeURIComponent(question.category),
      question: decodeURIComponent(question.question),
      correct_answer: decodeURIComponent(question.correct_answer),
      incorrect_answers: question.incorrect_answers.map(answer => decodeURIComponent(answer)),
    };

    decodedQuestion.allAnswers = [decodedQuestion.correct_answer, ...decodedQuestion.incorrect_answers];
    return decodedQuestion;
  });

  const [quizData, setQuizData] = useState(decodedQuestions);
  console.log(quizData);
  const correctAnswer = decodeURIComponent(question?.correct_answer);
  const mixButtons = [correctAnswer,
    ...question?.incorrect_answers.map((answer) => decodeURIComponent(answer)),
  ];
  
  const shuffleArray = (array) => array.sort(() => Math.random() - 1);
  const buttons = shuffleArray(mixButtons);

  const handleButtonClick = (text) => {
    setSelectedButton(text);
    setProgress((prevIndex) => prevIndex + 4.75);
  };


  const difficultyLevel = question.difficulty;
  return (
    <div className="">
      {/* Quiz Question */}
      <div className="mt-20">
        <h1 className="text-xl text-current">
          {" "}
          Question {questionIndex} of 20{" "}
        </h1>
        <p className="text-gray-500 text-[12px]">
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
        <div className="flex flex-col items-start justify-start ">
        <p className="mt-5 max-w-xs ">{decodeURIComponent(question?.question)}</p>
        </div>
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
                className="w-[190px] py-2  ps-1 pe-1 text-xs border border-solid border-black text-center rounded-md"
                onClick={() => {
                  if (questionIndex > quizQuestions.length - 1) {
                    setShowQuiz(false);
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
    </div>
  );
};

export default QuizLayout;
