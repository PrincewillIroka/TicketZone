const initialState = {
  isUserLoggedIn: JSON.parse(localStorage.getItem("isUserLoggedIn")) || false,
  user: JSON.parse(localStorage.getItem("user")) || {},
  ticketCart: [],
};

export default initialState;
