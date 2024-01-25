"use client";
import React from "react";
// import ExpertizoLogo from "../components/img/Expertizo-logo.png";
import { useRouter } from "next/navigation";

function Homepage() {
  const router = useRouter();
  return (
    <div className="h-screen w-50">
      <img
        className="max-w-full"
        src={"/Expertizo-logo.png"}
        alt="image description"
      />
      <div className="flex justify-center">
        <button
          className="w-[190px] py-2 my-2 ps-2 pe-2 text-xs border border-solid border-black text-center rounded-md"
          onClick={() => router.push("/")}
        >
          start Quiz
        </button>
      </div>
    </div>
  );
}

export default Homepage;
