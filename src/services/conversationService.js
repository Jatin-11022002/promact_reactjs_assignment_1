// src/services/conversationService.js

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getConversation = async (targetUserId, userId) => {
  const response = await fetch(
    `${API_BASE_URL}/api/messages/?senderId=${userId}&&userId=${targetUserId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // JWT token
      },
    }
  );

  console.log("conversation service ", response);

  if (!response.ok) {
    const message = await response.json();
    console.log("message is ", message);
    throw new Error(message.error);
  }

  return response.json();
};
