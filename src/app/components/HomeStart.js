"use client";
import React from "react";
// import ExpertizoLogo from "../components/img/Expertizo-logo.png";
import { useRouter } from "next/navigation";

const HomeStart=({setStartQuiz})=> {
  const router = useRouter();
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
          className="w-[190px] py-2 my-2 ps-2 pe-2 text-xs border border-solid border-black text-center rounded-md"
          onClick={() => setStartQuiz(false)}
        >
          start Quiz
        </button>
      </div>
    </div>
  );
}

export default HomeStart;