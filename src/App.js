import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "components/Home";
import Auth from "components/Auth";
import EventsCategory from "components/EventsCategory";
import Dashboard from "components/Dashboard";
import HowItWorks from "components/HowItWorks";
import BuyATicket from "components/BuyATicket";
import SellTickets from "components/SellTickets";
import Explore from "components/Explore";
import EventDetail from "components/EventDetail";

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
          <Route path="/explore-event/:page" element={<EventDetail />} />
        </Routes>
      </Router>
    </StateProvider>
  );
}

export default App;
