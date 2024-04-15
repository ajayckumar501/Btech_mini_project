import React, { createContext, useState } from 'react';

const UserContext = createContext(null); // Default value for user data

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  // Functions to update user data (optional)
  const updateUserData = (newData) => setUserData(newData);
  ///setUserData([...,])
  return (
    <UserContext.Provider value={{ userData,updateUserData}}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
