"use client";
import React from "react";
import { useMemo } from "react";
import SelectedBtn from "./selectedBtn";
import Optionbtns from "./optionBtns";
import Star from "./Star";

const shuffleOptions = (correctAnswer, incorrectAnswers) => {
  const array = [...incorrectAnswers, correctAnswer];
  return array.sort(() => Math.random() - 0.5);
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
  const buttons = useMemo(
    () => shuffleOptions(question.correct_answer, question.incorrect_answers),
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
