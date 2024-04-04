import React, { useState } from "react";

function Toggle() {
  const [isHidden, setIsHidden] = useState(true);

  const toggleVisibility = () => {
    setIsHidden(!isHidden);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <button
        onClick={toggleVisibility}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Toggle
      </button>

      <div
        className={`center transition-all duration-700 ${
          isHidden ? "h-0 opacity-0" : "h-100 opacity-100"
        }`}
      >
        <p className="w-100 h-100 bg-gray-900 text-white text-center line-h-100">
          Content
        </p>
      </div>
    </div>
  );
}

export default Toggle;
