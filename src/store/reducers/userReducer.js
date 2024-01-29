const userReducer = (state, action) => {
  switch (action.type) {
    case "GET_USER_SUCCESS": {
      return {
        ...state,
        user: action.payload,
        isUserLoggedIn: false,
      };
    }
    default:
      return state;
  }
};

export default userReducer;
