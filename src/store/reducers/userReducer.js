const userReducer = (state, action) => {
  switch (action.type) {
    case "GET_USER_SUCCESS": {
      return {
        ...state,
        user: action.payload,
        isUserLoggedIn: true,
      };
    }
    case "ADD_TICKET_TO_CART": {
      let { ticketCart = [] } = state;
      const newTicket = action.payload;
      ticketCart = ticketCart.concat(newTicket);
      return {
        ...state,
        ticketCart,
      };
    }
    default:
      return state;
  }
};

export default userReducer;
