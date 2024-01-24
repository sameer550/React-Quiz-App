import React, { useState } from 'react';

const YourComponent = () => {
  const [score, setScore] = useState(10); 
  const [incorrect, setIncorrect] = useState(5);
  const [selectedTotal, setSelectedTotal] = useState(15); 
  const totalQuestions = 20;

  const calculatePercentage = () => {
    const remainingIncorrect = totalQuestions - selectedTotal + incorrect;
    const remainingCorrect = score; // Assuming the remaining unanswered questions are correct

    const remainingScore = remainingCorrect / totalQuestions;
    const lowestPossibleScore = Math.round((score + remainingIncorrect) / totalQuestions * 100);

    return lowestPossibleScore;
  };

  return (
    <div>
      <p>Score: {score}/{totalQuestions}</p>
      <p>Incorrect: {incorrect}</p>
      <p>Percentage: {calculatePercentage()}%</p>
    </div>
  );
};

export default YourComponent;
