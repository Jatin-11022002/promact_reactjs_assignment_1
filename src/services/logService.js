const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getRequestLogs = async (startTime, endTime) => {
  const response = await fetch(
    `${API_BASE_URL}/api/logs?startTime=${startTime}&&endTime=${endTime}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  return response;
};

// src/services/logService.js

export const getRequestLogsCustomRange = async (start, end) => {
  const response = await fetch(
    `${API_BASE_URL}/api/logs?start=${start}&end=${end}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch custom range logs");
  }

  return response.json();
};
