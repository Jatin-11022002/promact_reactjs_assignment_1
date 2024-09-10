// src/components/UserList.jsx
import React, { useState, useEffect } from "react";
import { getUserList } from "../services/userService"; // API service for fetching users
import { useSelector } from "react-redux";
import "../style/userList.css";

const UserList = ({ onUserSelect }) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const profile = useSelector((state) => state.user.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        //console.log(profile);
        const data = await getUserList(profile);
        //console.log(data);
        setUsers(data.users);
      } catch (err) {
        console.log(err);
        setError("Failed to load user list");
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="user-list">
      <h3>Users</h3>
      {error && <p className="error">{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id} onClick={() => onUserSelect(user)}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
