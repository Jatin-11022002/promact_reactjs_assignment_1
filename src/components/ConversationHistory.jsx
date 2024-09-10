// src/components/ConversationHistory.jsx
import React, { useState, useEffect, useRef } from "react";
import { getConversation } from "../services/conversationService";
import { useSelector } from "react-redux";
import "../style/conversationHistory.css";
import {
  sendMessage,
  updateMessage,
  deleteMessage,
} from "../services/messageService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTrash,
  faCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

const ConversationHistory = ({ selectedUser }) => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((state) => state.user.user);
  const [editingMessageId, setEditingMessageId] = useState(null); // Track message being edited
  const [editMessageContent, setEditMessageContent] = useState(""); // Store new content
  const textAreaRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await getConversation(selectedUser.id, user.id);
        //console.log(data);
        setMessages(data.messages);
      } catch (err) {
        console.log(err);
        setError(err.message);
      }
    };

    setError(null);
    setMessages([]);

    if (selectedUser) {
      fetchMessages();
    }
  }, [selectedUser]);

  useEffect(() => {
    if (textAreaRef.current) {
      console.log("in use effect");
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  }, [editMessageContent]);

  const handleSaveEditMessage = async (messageId) => {
    try {
      const response = await updateMessage(
        messageId,
        editMessageContent,
        user.id
      ); // Call API to update message
      // console.log(response);
      if (response.ok) {
        const updatedMessages = messages.map((message) => {
          if (message.id == messageId) {
            return { ...message, content: editMessageContent };
          } else {
            return message;
          }
        });
        setMessages(updatedMessages);
      }
      setEditingMessageId(null);
      setEditMessageContent("");
    } catch (error) {
      console.error("Error updating message:", error);
    }
  };

  const handleEditMessage = (messageId, content) => {
    setEditingMessageId(messageId);
    setEditMessageContent(content);
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      const response = await deleteMessage(messageId, user.id);
      if (response.ok) {
        const updatedMessages = messages.filter(
          (message) => message.id != messageId
        );
        setMessages(updatedMessages);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleCancelEditMessage = () => {
    setEditingMessageId(null);
    setEditMessageContent("");
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const response = await sendMessage(selectedUser.id, newMessage, user.id);

      if (response.ok) {
        const { message } = await response.json();
        const newMessages = [
          ...messages,
          { ...message, timestamp: Date.now() },
        ];
        console.log(newMessages);
        setMessages(newMessages);
        setNewMessage(""); // Clear input
      }
    } catch (error) {
      console.log(error);
      setError("Failed to send message");
    }
  };

  return (
    <div className="conversation-history">
      <h3>{selectedUser?.name}</h3>
      {error && <p className="error">{error}</p>}
      <ul className="scrollable-content">
        {messages.map((message) => (
          //console.log(message, user.id)
          <div className="conversation-message">
            <li
              key={message.id}
              className={
                message.sender_id == user.id
                  ? "message-sender"
                  : "message-receiver"
              }
            >
              {message.sender_id == user.id && editingMessageId == null && (
                <div className="action-bar">
                  <FontAwesomeIcon
                    icon={faPen}
                    className="icon"
                    onClick={() =>
                      handleEditMessage(message.id, message.content)
                    }
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="icon"
                    onClick={() => handleDeleteMessage(message.id)}
                  />
                </div>
              )}
              {editingMessageId == message.id ? (
                <div className="edit-message-container">
                  <textarea
                    type="text"
                    value={editMessageContent}
                    rows={1}
                    ref={textAreaRef}
                    onChange={(e) => setEditMessageContent(e.target.value)}
                  />
                  <div className="edit-message-container-button-group">
                    <FontAwesomeIcon
                      icon={faXmark}
                      className="icon"
                      onClick={() => handleCancelEditMessage(message.id)}
                    />
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="icon"
                      onClick={() => handleSaveEditMessage(message.id)}
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div className="message-content">{message.content}</div>
                  <div className="message-timestamp">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </div>
                </>
              )}
            </li>
          </div>
        ))}
      </ul>
      <div className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ConversationHistory;
