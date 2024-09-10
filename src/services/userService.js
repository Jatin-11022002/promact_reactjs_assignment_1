// src/services/userService.js

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getUserList = async (profile) => {
  console.log("in get user list");
  console.log(profile);
  const response = await fetch(`${API_BASE_URL}/api/users/${profile.id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`, // JWT token
    },
  });
  console.log('in user list')
  if (!response.ok) {

    throw new Error(message.error);
  }

  return response.json();
};
