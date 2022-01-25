//basic routing
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
//for pages
import Login from "./pages/login"
import Dashboard from "./pages/dashboard";
import Guides from "./pages/guides";
import Rewards from "./pages/rewards";
import Signup from "./pages/signup";
import { UserAuthContextProvider } from "./util/userAuthContext";

//for routing 
//https://www.youtube.com/watch?v=Law7wfdg_ls
function App() {
  return (
      <Router>
        <div className="App">
          <UserAuthContextProvider>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/guides" element={<Guides />} />
            <Route path="/rewards" element={<Rewards />} />
          </Routes>
          </UserAuthContextProvider>
        </div>
      </Router>
  );
}

export default App;