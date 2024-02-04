"use client";
import React from "react";

const HomeStart = ({ setStartQuiz }) => {
  return (
    <div className="h-screen w-50 ">
      <div className="flex justify-center">
        <img
          className="max-w-full "
          src={"/Expertizo-logo.png"}
          alt="image description"
        />
      </div>
      <div className="flex justify-center">
        <button
          className="w-[190px] py-2 my-2 ps-2 pe-2 text-xs text-black border border-solid border-black text-center rounded-md"
          onClick={() => setStartQuiz(false)}
        >
          start Quiz
        </button>
      </div>
    </div>
  );
};

export default HomeStart;
