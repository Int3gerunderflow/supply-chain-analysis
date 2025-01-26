import React, { createContext, useContext, useState } from "react";

const MapDataContext = createContext();

const MapDataProvider = ({ children }) => {
  // useState to store the authentication token
  const [adjacencyList, setadjList_] = useState({});

  const setadjList = (object) => {
    setadjList_(object);
  };

  // Provide the authentication context to the children components
  // the token and setToken method is passed in as the contextValue
  return (
    <MapDataContext.Provider value={{adjacencyList,setadjList}}>{children}</MapDataContext.Provider>
  );
};

//function to get the authcontext
export const getMapDataContext = () => {
  return useContext(MapDataContext);
};

export default MapDataProvider;