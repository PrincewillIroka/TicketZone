const initialState = {
  isUserLoggedIn: JSON.parse(localStorage.getItem("isUserLoggedIn")) || false,
  user: JSON.parse(localStorage.getItem("user")) || {},
};

export default initialState;
