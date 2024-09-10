// src/pages/Chat.jsx
import React, { useState } from "react";
import UserList from "../components/UserList";
import ConversationHistory from "../components/ConversationHistory";
import "../style/chat.css";

const Chat = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="chat-container">
      <UserList onUserSelect={setSelectedUser} />
      {selectedUser && <ConversationHistory selectedUser={selectedUser} />}
    </div>
  );
};

export default Chat;
