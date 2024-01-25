"use client";
import Image from "next/image";
import QuizLayout from "./components/QuizLayout";
import Result from "./components/Result";
import Scorebar from "./components/Scorebar";
import QuestionBar from "./components/questionbar";
import questionJson from "./questions.json";
import { useEffect, useState } from "react";
export default function Home() {
  const quizQuestions = [...questionJson];
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(1);
  const [incorrectAnswer, setIncorrectAnswer] = useState(0);
  const [selectedButton, setSelectedButton] = useState(null);
  const [progress, setProgress] = useState(5);
  const [showQuiz, setShowQuiz] = useState(true);
  const [progressValues, setProgressValues] = useState({
    calculatePercentage: 0,
    calculateLowest: 0,
    highestPossiblescore: 0,
  });

  const totalQuestions = 20;
  useEffect(() => {
    if (!selectedButton) return;
    const correctAnswer = decodeURIComponent(
      questionJson[selectedQuestionIndex]?.correct_answer
    );
    if (selectedButton == correctAnswer) {
      setScore((prev) => prev + 1);
    } else if (selectedButton !== correctAnswer) {
      setIncorrectAnswer((prev) => prev + 1);
    }
  }, [selectedButton]);

  useEffect(() => {
    setProgressValues((prev) => ({
      ...prev,
      highestPossiblescore: highestPossiblescore(),
      calculateLowest: calculateLowest(),
      calculatePercentage: calculatePercentage(),
    }));
  }, [selectedButton]);

  const calculatePercentage = () => {
    if (selectedQuestionIndex === 0) {
      return 0;
    }
    return Math.round((score / totalQuestions) * 100);
  };
  const calculateLowest = () => {
    const rem = score/selectedQuestionIndex;
    const totalSum = Math.round(rem * 100);
    return totalSum;
  };

  const highestPossiblescore = () => {
    const remaining = totalQuestions - selectedQuestionIndex;
    const ans = remaining + score;
    const total = ans * 100;
    const totalSum = total / totalQuestions;
    return totalSum;
  };
  return (
    <main className="min-h-screen max-h-screen p-0 bg-white">
      <div className="">
      {showQuiz ? (
        <div>
          <QuestionBar progress={progress}/>
          <div className="flex  flex-col items-center">
          <QuizLayout
            question={{ ...quizQuestions[selectedQuestionIndex] }}
            key={questionJson.question}
            selectedQuestionIndex={selectedQuestionIndex}
            setSelectedQuestionIndex={setSelectedQuestionIndex}
            score={score}
            setSelectedButton={setSelectedButton}
            selectedButton={selectedButton}
            setScore={setScore}
            setProgress={setProgress}
            progress={progress}
            progressValues={progressValues}
            setQuestionIndex={setQuestionIndex}
            questionIndex={questionIndex}
            quizQuestions={quizQuestions}
            setShowQuiz={setShowQuiz}
          />
          <Scorebar progressValues={progressValues}/>       
        </div>
        </div>
      ) : (
        <Result score={score} incorrectAnswer={incorrectAnswer} />
      )}
      </div>
    </main>
  );
}
