import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import FlowerList from "../components/messageComponents/flowerList";
import MessageBoard from "../components/messageComponents/MessageBoard";

const Message = () => {
  const [selectedFollower, setSelectedFollower] = useState(null);
  const [searchText, setSearchText] = useState("");

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
  const allMessages = {
    1: [
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
    ],
    2: [
      {
        id: 1,
        sender: "John Doe",
        content: "See you tomorrow!",
        time: "9:00 PM",
        isSent: false,
      },
    ],
    3: [
      {
        id: 1,
        sender: "Emma Thompson",
        content: "Thanks for the help!",
        time: "8:15 AM",
        isSent: false,
      },
    ],
    4: [
      {
        id: 1,
        sender: "Michael Brown",
        content: "Great idea!",
        time: "7:45 PM",
        isSent: false,
      },
    ],
    5: [
      {
        id: 1,
        sender: "Lisa Anderson",
        content: "Perfect!",
        time: "6:30 PM",
        isSent: false,
      },
    ],
  };

  // Filter messages for the selected follower
  const messages = selectedFollower
    ? allMessages[selectedFollower.id] || []
    : [];

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
            <FlowerList
              data={followers.filter((follower) =>
                follower.name.toLowerCase().includes(searchText.toLowerCase())
              )}
              setSelectedFollower={setSelectedFollower}
            />
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 bg-white rounded-lg shadow-md m-2 flex flex-col">
        {selectedFollower ? (
          <MessageBoard messages={messages} follower={selectedFollower} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a follower to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
