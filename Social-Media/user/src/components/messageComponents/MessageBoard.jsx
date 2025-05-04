import React from "react";

const MessageBoard = ({ messages, follower }) => {
  return (
    <>
      <div className="p-4 border-b border-[#85e0e0] flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-[#85e0e0] flex items-center justify-center text-white font-medium">
          {follower.name[0]}
        </div>
        <div>
          <h2 className="font-semibold">{follower.name}</h2>
          <p className="text-sm text-gray-600">{follower.status}</p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto bg-[#DAF5F5]">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.isSent ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 shadow-md ${
                  message.isSent ? "bg-[#85e0e0] text-white" : "bg-white"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <span className="text-xs opacity-70 mt-1 block">
                  {message.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-[#85e0e0]">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 p-2 rounded-md bg-[#DAF5F5] focus:outline-none focus:ring-2 focus:ring-[#85e0e0] border-2 border-[#85e0e0]"
          />
          <button className="px-4 py-2 bg-[#85e0e0] text-white rounded-md hover:bg-[#6dcaca] transition-colors shadow-md transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default MessageBoard;
