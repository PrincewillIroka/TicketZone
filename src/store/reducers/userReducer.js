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
      const newItem = action.payload;
      const { ticket = {}, ticketQuantity = 0 } = newItem;
      const ticketId = ticket._id;

      const isTicketInCart = ticketCart.find(
        (tc) => tc.ticket._id === ticketId
      );

      if (isTicketInCart) {
        if (ticketQuantity === 0) {
          ticketCart = ticketCart.filter((tc) => tc.ticket._id !== ticketId);
        } else {
          ticketCart = ticketCart.map((tc) => {
            if (tc.ticket._id === ticketId) {
              tc.ticketQuantity = ticketQuantity;
            }
            return tc;
          });
        }
      } else {
        ticketCart = ticketCart.concat(newItem);
      }

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
