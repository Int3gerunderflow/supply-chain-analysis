import React, { createContext, useContext, useMemo, useState } from "react";

const MapDataContext = createContext();

const MapDataProvider = ({ children }) => {
  // useState to store the authentication token
  const [graphData, setGraphData_] = useState(JSON.parse(localStorage.getItem("adjList")));

  const setGraphData = (object) => {
    localStorage.setItem("adjList",JSON.stringify(object))
    setGraphData_(object);
  };

  const contextValue = useMemo(()=>(
    {graphData, setGraphData}
  ), [graphData])

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