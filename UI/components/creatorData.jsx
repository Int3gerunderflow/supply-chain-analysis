import React, { createContext, useContext, useMemo, useState } from "react";

const CreatorDataContext = createContext();

const CreatorDataProvider = ({ children }) => {
  // useState to store the map data
  const [creatorData, setCreatorData_] = useState(JSON.parse(localStorage.getItem("creatorData")));

  const setCreatorData = (object) => {
    localStorage.setItem("creatorData",JSON.stringify(object))
    setCreatorData_(object);
  };

  const contextValue = useMemo(()=>(
    {creatorData, setCreatorData}
  ), [creatorData])

  return (
    <CreatorDataContext.Provider value={contextValue}>{children}</CreatorDataContext.Provider>
  );
};

//function to get the creatorContext
export const getCreatorDataContext = () => {
  return useContext(CreatorDataContext);
};

export default CreatorDataProvider