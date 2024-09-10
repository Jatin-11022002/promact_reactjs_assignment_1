const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const sendMessage = async (userId, content, senderId) => {
  const response = await fetch(`${API_BASE_URL}/api/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`, // JWT token
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ receiverId: userId, content, senderId }),
  });

  return response;
};

// src/services/messageService.js

export const updateMessage = async (messageId, newContent, senderId) => {
  const response = await fetch(`${API_BASE_URL}/api/messages/${messageId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content: newContent, senderId }),
  });

  return response;
};

export const deleteMessage = async (messageId, senderId) => {
  const response = await fetch(`${API_BASE_URL}/api/messages/${messageId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ senderId }),
  });

  return response;
};
