"use client";
import Image from "next/image";
import QuizLayout from "./components/QuizLayout";
import Result from "./components/Result";
import Scorebar from "./components/Scorebar";
import QuestionBar from "./components/QuestionBar";
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
  const [questionIndex, setQuestionIndex] = useState(1);
  const [incorrectAnswer, setIncorrectAnswer] = useState(0);
  const [options, setOptions] = useState(null);
  const [progress, setProgress] = useState(5);
  const [showQuiz, setShowQuiz] = useState(true);
  const [progressValues, setProgressValues] = useState({
    calculatePercentage: 0,
    calculateLowest: 0,
    highestPossiblescore: 0,
  });

  const totalQuestions = 20;
  useEffect(() => {
    if (!options) return;
    const correctAnswer = decodeURIComponent(
      questionJson[selectedQuestionIndex]?.correct_answer
    );
    if (options == correctAnswer) {
      setScore((prev) => prev + 1);
    } else if (options !== correctAnswer) {
      setIncorrectAnswer((prev) => prev + 1);
    }
  }, [options]);

  useEffect(() => {
    setProgressValues((prev) => ({
      ...prev,
      highestPossiblescore: highestPossiblescore(),
      calculateLowest: calculateLowest(),
      calculatePercentage: calculatePercentage(),
    }));
  }, [options]);

  const calculatePercentage = () => {
    if (selectedQuestionIndex === 0) {
      return 0;
    }
    return Math.round((score / totalQuestions) * 100);
  };
  const calculateLowest = () => {
    const rem = score / selectedQuestionIndex;
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
    <main className="min-h-screen max-h-screen bg-white">
      <div className="">
        {showQuiz ? (
          <div>
            <QuestionBar progress={progress} />
            <div className="flex flex-col items-center">
              <QuizLayout
                question={{ ...quizQuestions[selectedQuestionIndex] }}
                key={questionJson.question}
                selectedQuestionIndex={selectedQuestionIndex}
                setSelectedQuestionIndex={setSelectedQuestionIndex}
                score={score}
                setOptions={setOptions}
                options={options}
                setScore={setScore}
                setProgress={setProgress}
                progress={progress}
                progressValues={progressValues}
                setQuestionIndex={setQuestionIndex}
                questionIndex={questionIndex}
                quizQuestions={quizQuestions}
                setShowQuiz={setShowQuiz}
              />
            </div>
            <div className="flex justify-center">
              <Scorebar progressValues={progressValues} />
            </div>
          </div>
        ) : (
          <Result score={score} incorrectAnswer={incorrectAnswer} />
        )}
      </div>
    </main>
  );
}
