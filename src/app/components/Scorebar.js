import React from "react";
const Scorebar = ({ progressValues }) => {
  const colors = ["bg-[#000000]", "bg-[#717171]", "bg-[#d2d2d2]"];
  return (
    <div className="w-full sm:w-2/5">
      <div className="scoreBarTxts flex justify-between">
        <div className="">
          <p>Score : {progressValues.calculatePercentage}%</p>
        </div>
        <div>
          <p>Max Score : {progressValues.highestPossiblescore}%</p>
        </div>
      </div>
      <div className="">
        <div className="w-full border-2 border-gray-600 rounded-[5px] h-6  mt-1 relative">
          <div
            className={`absolute ${colors[0]} h-full transition-all duration-300 ease-in-out z-10`}
            style={{
              width: `${progressValues.calculatePercentage}%`,
              transition: "width 0.5s",
            }}
          ></div>
          <div
            className={`absolute ${colors[2]} h-full transition-all duration-300 ease-in-out`}
            style={{
              width: `${progressValues.highestPossiblescore}%`,
              transition: "width 0.5s",
            }}
          ></div>
          <div
            className={`absolute ${colors[1]} h-full transition-all duration-300 ease-in-out`}
            style={{
              width: `${progressValues.calculateLowest}%`,
              transition: "width 0.5s",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};
export default Scorebar;
