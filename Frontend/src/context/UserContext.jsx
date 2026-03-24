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

  const handleContact = (userId, productTitle, contacterEmail) => {
    const user = usersMap[userId];
    if (user && user.email) {
      if (contacterEmail) {
        const subject = encodeURIComponent(`Interested in your product at scaler marketplace`);
        const body = encodeURIComponent(`Hi I am  intersted in your product "${productTitle}" at Scaler Marketplace. Would like to connect ${contacterEmail}`);
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${user.email}&su=${subject}&body=${body}`;
        window.open(gmailUrl, '_blank');
      } else {
        alert("Please log in to contact the seller.");
      }
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
