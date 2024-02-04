import React from "react";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";
const starConfig = {
  hard: [1, 2, 3],
  medium: [1, 2],
  easy: [1],
};
const Star = ({ difficultyLevel }) => {
  return (
    <div>
      <div className="display: inline-flex mr-3 text-black">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="">
            {starConfig[difficultyLevel].includes(index + 1) ? (
              <IoIosStar />
            ) : (
              <IoIosStarOutline />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Star;
