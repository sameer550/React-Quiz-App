"use client";
import Image from "next/image";
import QuizLayout from "./components/QuizLayout";
import Result from "./components/Result";
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
  const [isFlg, setIsFlg] = useState(true);
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

      //setSelectedQuestionIndex((prev)=> prev+1);
      //console.log("Correct answer",score);
    } else if (selectedButton !== correctAnswer) {
      setIncorrectAnswer((prev) => prev + 1);
      //setQuestionIndex((prev)=> prev+1);
    }
  }, [selectedButton]);

  useEffect(() => {
    calculatePercentage();
    highestPossiblescore();
    calculateLowest();
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
    return Math.round((score / 20) * 100);
  };

  //setProgressValues((prev) => ({ ...prev, maximumScore: 90 }));
  const calculateLowest = () => {
    // console.log(incorrectAnswer);
    //const remaining = totalQuestions - selectedQuestionIndex;
    // const ans = remaining + incorrectAnswer;
    // const total = (ans * 100);
    // const totalSum = total / 20
    // console.log("total Sum",totalSum)
    // return totalSum
    //const total = (score - remaining) / totalQuestions;
    //const totalSum = total * 100;
    //console.log(totalSum);
    const remainingAnswers = 20 - selectedQuestionIndex;
    const ans = remainingAnswers + incorrectAnswer;
    const rem = ans / 20;
    const totalSum = Math.round(rem * 100);
    console.log(totalSum);
    return totalSum;
  };

  const highestPossiblescore = () => {
    const remaining = totalQuestions - selectedQuestionIndex;
    const ans = remaining + score;
    const total = ans * 100;
    const totalSum = total / 20;
    return totalSum;
  };
  return (
    <main className="flex  flex-col items-center   bg-white">
      {isFlg ? (
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
          setIsFlg={setIsFlg}
        />
      ) : (
        <Result score={score} incorrectAnswer={incorrectAnswer} />
      )}
    </main>
  );
}
