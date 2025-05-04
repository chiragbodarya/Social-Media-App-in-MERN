import React from "react";
import { FaCircle } from "react-icons/fa";

const FlowerList = ({ data, setSelectedFollower }) => {
  return (
    <div>
      {data?.map((follower) => (
        <div
          key={follower.id}
          onClick={() => setSelectedFollower(follower)} // Set selected follower on click
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#DAF5F5] cursor-pointer border-2 border-[#85e0e0] m-2 shadow-md transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300"
        >
          {/* Avatar */}
          <div className="h-10 w-10 rounded-full bg-[#85e0e0] flex items-center justify-center text-white font-medium">
            {follower.name[0]}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center">
              <p className="font-semibold truncate">{follower.name}</p>
              <span>
                <FaCircle
                  className={`h-2 w-2 ${
                    follower.status === "online"
                      ? "text-green-500"
                      : "text-gray-300"
                  }`}
                />
              </span>
            </div>
            <p className="text-sm text-gray-600 truncate">
              {follower.lastMessage}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FlowerList;
