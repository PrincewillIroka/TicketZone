import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "components/Home";
import Auth from "components/Auth";
import Gallery from "components/Gallery";
import Dashboard from "components/Dashboard";
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
          <Route path="/gallery/:page" element={<Gallery />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </StateProvider>
  );
}

export default App;
