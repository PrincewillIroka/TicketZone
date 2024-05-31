import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "pages/Home";
import Auth from "pages/Auth";
import EventsCategory from "pages/EventsCategory";
import Dashboard from "pages/Dashboard";
import HowItWorks from "pages/HowItWorks";
import BuyATicket from "pages/BuyATicket";
import SellTickets from "pages/SellTickets";
import Explore from "pages/Explore";
import EventDetail from "pages/EventDetail";
import AboutUs from "pages/AboutUs";
import FAQs from "pages/FAQs";

import { StateProvider } from "store/stateProvider";
import initialState from "store/state";
import reducers from "store/reducers";

function App() {
  return (
    <StateProvider reducers={reducers} initialState={initialState}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/signup" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/buy-a-ticket" element={<BuyATicket />} />
          <Route path="/sell-tickets" element={<SellTickets />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/explore-category/:page" element={<EventsCategory />} />
          <Route path="/event-details/:page" element={<EventDetail />} />
          <Route path="/explore-event" element={<Explore />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/faqs" element={<FAQs />} />
        </Routes>
      </Router>
    </StateProvider>
  );
}

export default App;
