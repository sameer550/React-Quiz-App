import React from "react";

const Result = ({ score, incorrectAnswer }) => {
  const percentage = Math.round((score / 20) * 100);
  return (
    <div className="h-screen text-center w-50 mt-10">
      <h1 className="text-xl ">Result</h1>
      <h2 className="text-xl text-green-800">Total Correct Answer: {score}</h2>
      <h2 className="text-xl text-rose-700">
        Total Incorrect Answer: {incorrectAnswer}
      </h2>
      <h3 className="text-xl text-center">Percentage: {percentage}</h3>
      {percentage >= 50 && <h2 className="text-xl  text-green-800">Passed</h2>}
      {percentage < 50 && <h2 className="text-xl text-rose-700">Failed</h2>}
      <div className="flex justify-center">
        <button
          className="w-[190px] py-2 my-2 ps-2 pe-2 text-xs border border-solid border-black text-center rounded-md"
          onClick={() => location.reload()}
        >
          Restart Quiz
        </button>
      </div>
    </div>
  );
};
export default Result;
