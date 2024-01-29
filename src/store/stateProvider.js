import React, { createContext, useContext, useReducer } from "react";

// data layer
export const StateContext = createContext();

// Build a provider
export const StateProvider = ({ reducers, initialState, children }) => {
  const [state, dispatch] = useReducer(reducers, initialState);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};

// This is where we use it in a component
export const useStateValue = () => useContext(StateContext);
