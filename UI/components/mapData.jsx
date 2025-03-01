import React, { createContext, useContext, useMemo, useState } from "react";

const MapDataContext = createContext();

export const MapDataProvider = ({ children }) => {
  // useState to store the map data
  const [graphData, setGraphData_] = useState(JSON.parse(localStorage.getItem("adjList")));

  const setGraphData = (object) => {
    localStorage.setItem("adjList",JSON.stringify(object))
    setGraphData_(object);
  };

  const contextValue = useMemo(()=>(
    {graphData, setGraphData}
  ), [graphData])

  return (
    <MapDataContext.Provider value={contextValue}>{children}</MapDataContext.Provider>
  );
};

//function to get the mapContext
export const getMapDataContext = () => {
  return useContext(MapDataContext);
};

export default MapDataProvider