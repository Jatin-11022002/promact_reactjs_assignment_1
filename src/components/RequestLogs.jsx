// src/components/RequestLogs.jsx
import React, { useState, useEffect } from "react";
import { getRequestLogs } from "../services/logService"; // Assume you have a service to fetch logs
import "../style/requestLogs.css";

const RequestLogs = () => {
  const [logs, setLogs] = useState([]);
  const [timeframe, setTimeframe] = useState("5"); // Default to last 5 minutes
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [columns, setColumns] = useState({
    timestamp: true,
    ip_address: true,
    username: true,
    request_body: true,
  });

  const formatAndGetTime = () => {
    if (timeframe == "custom") {
      console.log(startDate, endDate);
      const startTime = new Date(startDate).toISOString();
      const endTime = new Date(endDate).toISOString();

      console.log(isNaN(Date.parse(startTime)));

      return { startTime, endTime };
    } else {
      const currentTime = new Date(); // Get current time
      const timeBefore5min = new Date(
        currentTime.getTime() - Number(timeframe) * 1000 * 60
      );
      const startTime = timeBefore5min.toISOString(); // Convert to ISO format
      const endTime = new Date(currentTime).toISOString();
      return { startTime, endTime };
    }
  };

  const fetchLogs = async () => {
    try {
      if (timeframe == "custom" && !startDate && !endDate) return;
      const { startTime, endTime } = formatAndGetTime(startDate, endDate);
      const data = await getRequestLogs(startTime, endTime); // Fetch logs based on selected timeframe
      const { logs } = await data.json();
      setLogs(logs);
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  };
  useEffect(() => {
    fetchLogs();
  }, [timeframe]);

  const handleColumnToggle = (columnName) => {
    setColumns((prev) => ({ ...prev, [columnName]: !prev[columnName] }));
  };

  return (
    <div>
      <h2>Request Logs</h2>

      {/* Timeframe Filter */}
      <select value={timeframe} onChange={(e) => setTimeframe(e.target.value)}>
        <option value="5">Last 5 minutes</option>
        <option value="10">Last 10 minutes</option>
        <option value="30">Last 30 minutes</option>
        <option value="custom">Custom Range</option>
      </select>

      {timeframe === "custom" && (
        <div className="custom-range">
          <input
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <button onClick={() => fetchLogs()}>Apply</button>
        </div>
      )}

      {/* Column Toggle Options */}
      <div className="column-toggles">
        <label>
          <input
            type="checkbox"
            checked={columns.timestamp}
            onChange={() => handleColumnToggle("timestamp")}
          />
          Timestamp
        </label>
        <label>
          <input
            type="checkbox"
            checked={columns.ip_address}
            onChange={() => handleColumnToggle("ip_address")}
          />
          IP Address
        </label>
        <label>
          <input
            type="checkbox"
            checked={columns.username}
            onChange={() => handleColumnToggle("username")}
          />
          Username
        </label>
        <label>
          <input
            type="checkbox"
            checked={columns.request_body}
            onChange={() => handleColumnToggle("request_body")}
          />
          Request Body
        </label>
      </div>

      {/* Logs Table */}
      <table>
        <thead>
          <tr>
            {columns.timestamp && <th>Timestamp</th>}
            {columns.ip_address && <th>IP Address</th>}
            {columns.username && <th>Username</th>}
            {columns.request_body && <th>Request Body</th>}
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              {columns.timestamp && (
                <td>{new Date(log.timestamp).toLocaleString()}</td>
              )}
              {columns.ip_address && <td>{log.ip_address}</td>}
              {columns.username && <td>{log.username}</td>}
              {columns.request_body && (
                <td>
                  <pre>{JSON.stringify(log.request_body, null, 2)}</pre>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestLogs;
