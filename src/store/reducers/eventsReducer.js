const defaultTag = { name: "All", label: "all" };

const userReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_HOME_PAGE_EVENTS": {
      const { homePage = {} } = state;
      const { events = [], eventsClone = [] } = action.payload;
      homePage.events = events;
      homePage.eventsClone = eventsClone;

      return {
        ...state,
        homePage,
      };
    }
    case "UPDATE_HOME_PAGE_CATEGORIES": {
      const { homePage = {} } = state;
      const { categories = [], displayedTags = [] } = action.payload;
      const arr = [defaultTag].concat(displayedTags);
      homePage.categories = categories;
      homePage.displayedTags = arr;

      return {
        ...state,
        homePage,
      };
    }
    case "FILTER_HOME_PAGE_EVENTS": {
      const { homePage = {} } = state;
      const { activeTab = "" } = action.payload;
      const { eventsClone = [] } = homePage;

      let filteredEvents;

      if (activeTab === "all") {
        filteredEvents = eventsClone;
      } else {
        filteredEvents = eventsClone.filter((event) => {
          const { tags = [] } = event;
          const isValue = tags.includes(activeTab);
          return isValue;
        });
      }

      homePage.events = filteredEvents;

      return {
        ...state,
        homePage,
      };
    }
    default:
      return state;
  }
};

export default userReducer;
