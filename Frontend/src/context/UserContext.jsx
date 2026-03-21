import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const useUsersContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [usersMap, setUsersMap] = useState({});

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/user`);
      const usersData = res.data.data;
      setUsers(usersData);
      
      const mapping = {};
      usersData.forEach(user => {
        mapping[user.id] = { name: user.name, email: user.email };
      });
      setUsersMap(mapping);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleContact = (userId) => {
    const user = usersMap[userId];
    if (user && user.email) {
      console.log(`Contact Email for ${user.name}: ${user.email}`);
    } else {
      console.log('User email not found or user does not exist.', userId);
    }
  };

  return (
    <UserContext.Provider value={{ users, usersMap, fetchUsers, handleContact }}>
      {children}
    </UserContext.Provider>
  );
};
