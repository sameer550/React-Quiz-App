"use client";
import React, { useEffect } from "react";
import { useMemo } from "react";
import { IoIosStar } from "react-icons/io";
import { IoIosStarOutline } from "react-icons/io";
import SelectedBtn from "./selectedBtn";
import Optionbtns from "./optionBtns";
import Star from "./Star";

const shuffleOptions = (
  correctAnswer,
  incorrectAnswers,
  selectedQuestionIndex
) => {
  //if (selectedQuestionIndex < quizQuestions.length+1) {
  //console.log(selectedQuestionIndex," < ",quizQuestions.length+1)
  const array = [...incorrectAnswers, correctAnswer];
  return array.sort(() => Math.random() - 0.5);
  //} else {
  // return;
  //}
};
const QuizLayout = ({
  question,
  selectedOption,
  setSelectedOption,
  setSelectedQuestionIndex,
  quizQuestions,
  setShowQuiz,
  selectedQuestionIndex,
  setProgress,
}) => {
  const starConfig = {
    hard: [1, 2, 3],
    medium: [1, 2],
    easy: [1],
  };
  const buttons = useMemo(
    () =>
      shuffleOptions(
        question.correct_answer,
        question.incorrect_answers,
        selectedQuestionIndex
      ),
    [selectedQuestionIndex]
  );

  const difficultyLevel = question.difficulty;
  const selectedbtnProps = {
    question: { ...quizQuestions[selectedQuestionIndex] },
    selectedQuestionIndex: selectedQuestionIndex,
    setSelectedQuestionIndex: setSelectedQuestionIndex,
    setSelectedOption: setSelectedOption,
    selectedOption: selectedOption,
    quizQuestions: quizQuestions,
    setShowQuiz: setShowQuiz,
  };

  const optionBtnsProps = {
    setSelectedOption: setSelectedOption,
    setProgress: setProgress,
    buttons: buttons,
    selectedOption: selectedOption,
  };

  return (
    <div className="w-1/1">
      {/* Quiz Question */}
      <div className="mt-10">
        <h1 className="text-xl text-current">
          {" "}
          Question {selectedQuestionIndex + 1} of 20{" "}
        </h1>
        <p className="text-gray-500 text-[12px]">{question.category}</p>
        <Star difficultyLevel={difficultyLevel} />
        <div className="flex flex-col justify-start ">
          <p className="mt-5 max-w-md h-12 w-400">{question.question}</p>
        </div>
        <Optionbtns {...optionBtnsProps} />
        <SelectedBtn {...selectedbtnProps} />
      </div>
    </div>
  );
};

export default QuizLayout;
