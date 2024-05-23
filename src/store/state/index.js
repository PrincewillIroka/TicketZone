const initialState = {
  isUserLoggedIn: JSON.parse(localStorage.getItem("isUserLoggedIn")) || false,
  user: JSON.parse(localStorage.getItem("user")) || {},
  ticketCart: [],
  homePage: { categories: [], displayedTags: [], events: [], eventsClone: [] },
};

export default initialState;
