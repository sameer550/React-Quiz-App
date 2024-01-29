import React from "react";

const OptionBtns = ({
  setSelectedOption,
  setProgress,
  buttons,
  selectedOption,
}) => {
  const handleOptionSelect = (text) => {
    setSelectedOption(text);
    setProgress((prevIndex) => prevIndex + 4.75);
  };
  return (
    <div className="">
      <div className="flex flex-wrap justify-center gap-x-9 gap-y-4 max-w-[500px] h-520 mt-10 mb-10">
        {buttons.map((button, index) => (
          <button
            disabled={selectedOption}
            key={index}
            className={`w-[190px] py-1 my-2 ps-2 pe-2 text-xs border border-solid border-black text-center rounded-md  ${
              selectedOption === button
                ? "bg-black text-gray-50"
                : "bg-[#e5e6e5]"
            }`}
            onClick={() => handleOptionSelect(button)}
          >
            {button}
          </button>
        ))}
      </div>
    </div>
  );
};

export default OptionBtns;
