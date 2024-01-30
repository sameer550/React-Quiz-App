"use client";
import Image from "next/image";
import QuizLayout from "./components/QuizLayout";
import Result from "./components/Result";
import Scorebar from "./components/Scorebar";
import QuestionBar from "./components/QuestionBar";
import HomeStart from "./components/HomeStart";
import questionJson from "./questions.json";
import { useEffect, useState } from "react";

const quizQuestions = questionJson?.map((qJson) => ({
  ...qJson,
  correct_answer: decodeURIComponent(qJson.correct_answer),
  incorrect_answers: qJson.incorrect_answers.map((ans) =>
    decodeURIComponent(ans)
  ),
  question: decodeURIComponent(qJson.question),
  category: decodeURIComponent(qJson.category),
}));

export default function Home() {
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [incorrectAnswer, setIncorrectAnswer] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [progress, setProgress] = useState(5);
  const [showQuiz, setShowQuiz] = useState(true);
  const [startQuiz, setStartQuiz] = useState(true);
  const [progressValues, setProgressValues] = useState({
    calculatePercentage: 0,
    calculateLowest: 0,
    highestPossiblescore: 0,
  });

  const handleNext = () => {
    setProgressValues((prev) => ({
      ...prev,
      highestPossiblescore: highestPossiblescore(),
      calculateLowest: calculateLowest(),
      calculatePercentage: calculatePercentage(),
    }));

    if (!selectedOption) return;
    const answer = quizQuestions[selectedQuestionIndex]?.correct_answer;
    if (selectedOption == answer) {
      setScore((prev) => prev + 1);
    } else if (selectedOption !== answer) {
      setIncorrectAnswer((prev) => prev + 1);
      console.log(incorrectAnswer);
    }
  };
  useEffect(() => {
    handleNext();
  }, [selectedOption]);

  const calculatePercentage = () => {
    if (selectedQuestionIndex === 0) {
      return 0;
    }
    return Math.round((score / quizQuestions.length) * 100);
  };
  const calculateLowest = () => {
    const rem = score / selectedQuestionIndex;
    const totalSum = Math.round(rem * 100);
    return totalSum;
  };

  const highestPossiblescore = () => {
    const remaining = quizQuestions.length - selectedQuestionIndex;
    const ans = remaining + score;
    const total = ans * 100;
    const totalSum = total / quizQuestions.length;
    return totalSum;
  };

  const quizLayoutProps = {
    question: { ...quizQuestions[selectedQuestionIndex] },
    key: questionJson.question,
    selectedQuestionIndex: selectedQuestionIndex,
    setSelectedQuestionIndex: setSelectedQuestionIndex,
    score: score,
    setSelectedOption: setSelectedOption,
    selectedOption: selectedOption,
    setScore: setScore,
    setProgress: setProgress,
    progress: progress,
    progressValues: progressValues,
    quizQuestions: quizQuestions,
    setShowQuiz: setShowQuiz,
  };

  return (
    <main className="min-h-screen max-h-screen bg-white">
      {!startQuiz ? (
        <div>
          <div className=" mx-auto ">
            {showQuiz ? (
              <div>
                <QuestionBar progress={progress} />
                <div className="flex flex-col items-center">
                  <QuizLayout {...quizLayoutProps} />
                </div>
                <div className="flex justify-center">
                  <Scorebar progressValues={progressValues} />
                </div>
              </div>
            ) : (
              <Result score={score} incorrectAnswer={incorrectAnswer} />
            )}
          </div>
        </div>
      ) : (
        <>
          <HomeStart setStartQuiz={setStartQuiz} />
        </>
      )}
    </main>
  );
}
