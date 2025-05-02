// import React from "react";
// import { FaSearch } from "react-icons/fa";

// const Message = () => {
//   return (
//     <>
//       <div className=" bg-[#DAF5F5] fixed w-[100%] z-10 ">
//         <div className="flex justify-between items-center lg:w-[70%] mx-auto py-2 px-4">
//           <div className="search-box w-full px-3 relative mx-auto">
//             <input
//               className="search-input w-full font-montserrat text-base py-2 px-12 bg-[#e6a3a3] text-gray-700 rounded-md border-none transition duration-400 focus:outline-none focus:ring-2 focus:ring-[#000000] placeholder-[#191919]"
//               type="text"
//               placeholder="Search user name.."
//               onChange={console.log("search")}
//             />
//             <button
//               className="search-btn bg-transparent text-[#000000] text-lg px-3 py-2 ml-[-45px] border-none transition duration-400 z-10"
//               type="submit"
//             >
//               <FaSearch />
//             </button>
//           </div>
//         </div>
//       </div>
//       <div className="w-full h-screen bg-[#DAF5F5] flex justify-center items-center">
//         <div className="w-[90%] lg:w-[70%] h-[80%] bg-white rounded-lg shadow-lg flex flex-col justify-center items-center">
//           <h1 className="text-2xl font-bold text-[#000000]">Message</h1>
//           <p className="text-gray-500">No messages yet</p>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Message;



import React, { useState } from "react";
import { FaSearch, FaCircle } from "react-icons/fa";

const Message = () => {
  // Sample followers data
  const followers = [
    {
      id: 1,
      name: "Sarah Wilson",
      status: "online",
      lastMessage: "Hey there!",
    },
    {
      id: 2,
      name: "John Doe",
      status: "offline",
      lastMessage: "See you tomorrow",
    },
    { id: 3, name: "Emma Thompson", status: "online", lastMessage: "Thanks!" },
    {
      id: 4,
      name: "Michael Brown",
      status: "offline",
      lastMessage: "Great idea!",
    },
    { id: 5, name: "Lisa Anderson", status: "online", lastMessage: "Perfect!" },
  ];

  // Sample messages data
  const messages = [
    {
      id: 1,
      sender: "Sarah Wilson",
      content: "Hey! How are you?",
      time: "10:30 AM",
      isSent: false,
    },
    {
      id: 2,
      sender: "You",
      content: "I'm good, thanks! How about you?",
      time: "10:31 AM",
      isSent: true,
    },
    {
      id: 3,
      sender: "Sarah Wilson",
      content: "Doing great! Want to catch up later?",
      time: "10:32 AM",
      isSent: false,
    },
    {
      id: 4,
      sender: "You",
      content: "Sure, that would be nice!",
      time: "10:33 AM",
      isSent: true,
    },
  ];

  const [searchText, setSearchText] = useState("");

  return (
    <div className="h-screen bg-[#DAF5F5] flex pt-5 pb-20 lg:pb-0 px-5">
      {/* Left Sidebar */}
      <div className="w-full md:w-80 bg-white rounded-lg shadow-md m-2">
        {/* Search Section */}
        <div className="p-4 border-b border-[#85e0e0]">
          <div className="relative">
            <FaSearch className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search users..."
              className="w-full pl-9 pr-4 py-2 bg-[#DAF5F5] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#85e0e0] border-2 border-[#85e0e0]"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>

        {/* Followers List */}
        <div className="overflow-auto h-[calc(100vh-12rem)]">
          <div className="p-2">
            {followers.map((follower) => (
              <div
                key={follower.id}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#DAF5F5] cursor-pointer transition-colors border-2 border-[#85e0e0] m-2 shadow-md transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300"
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
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 bg-white rounded-lg shadow-md m-2 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-[#85e0e0] flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-[#85e0e0] flex items-center justify-center text-white font-medium">
            S
          </div>
          <div>
            <h2 className="font-semibold">Sarah Wilson</h2>
            <p className="text-sm text-gray-600">Online</p>
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
      </div>
    </div>
  );
};

export default Message;
