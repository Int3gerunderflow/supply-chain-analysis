import React, { createContext, useContext, useMemo, useState } from "react";

const MapDataContext = createContext();

const MapDataProvider = ({ children }) => {
  // useState to store the authentication token
  const [adjacencyList, setadjList_] = useState(JSON.parse(localStorage.getItem("adjList")));

  const setadjList = (object) => {
    localStorage.setItem("adjList",JSON.stringify(object))
    setadjList_(object);
  };

  const contextValue = useMemo(()=>(
    {adjacencyList, setadjList}
  ), [adjacencyList])

  // Provide the authentication context to the children components
  // the token and setToken method is passed in as the contextValue
  return (
    <MapDataContext.Provider value={contextValue}>{children}</MapDataContext.Provider>
  );
};

//function to get the authcontext
export const getMapDataContext = () => {
  return useContext(MapDataContext);
};

export default MapDataProvider;