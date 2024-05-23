import userReducer from "./userReducer";
import eventsReducer from "./eventsReducer";

const reduceReducers =
  (...reducers) =>
  (prevState, value, ...args) =>
    reducers.reduce(
      (newState, reducer) => reducer(newState, value, ...args),
      prevState
    );

export default reduceReducers(userReducer, eventsReducer);
