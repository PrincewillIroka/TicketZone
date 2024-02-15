const userReducer = (state, action) => {
  switch (action.type) {
    case "GET_USER_SUCCESS": {
      return {
        ...state,
        user: action.payload,
        isUserLoggedIn: true,
      };
    }
    default:
      return state;
  }
};

export default userReducer;
