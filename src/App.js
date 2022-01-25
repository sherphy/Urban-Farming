//basic routing
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
//for pages
import Login from "./pages/login"
import Dashboard from "./pages/dashboard";
import Guides from "./pages/guides";
import Rewards from "./pages/rewards";
import Signup from "./pages/signup";
import { UserAuthContextProvider } from "./util/userAuthContext";
//Background Image
import Background from "./images/Background2.jpg";
//Navbar
import WithoutNav from "./components/Layout/WithoutNav";
import WithNav from "./components/Layout/WithNav";

import Notifications from "./components/Notifications"


var backgroundStyle = {
  minHeight: "100vh", 
  backgroundImage: `url(${Background})`,
  backgroundSize: "150%", 
  backgroundPosition: "center",
  backgroundRepeat: "repeat-y",
};

//for routing 
//https://www.youtube.com/watch?v=Law7wfdg_ls
function App() {
  return (
      <Router>
        <div className="App">
          <div className="container" style={backgroundStyle}>
            <UserAuthContextProvider>
              <Routes>
              <Route element={<WithoutNav />}>
                <Route exact path="/" element={<Login />} />
                <Route exact path="/signup" element={<Signup />} />
              </Route>
              <Route element={<WithNav />}>
              
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/guides" element={<Guides />} />
                <Route path="/rewards" element={<Rewards />} />
              </Route>
        
                <Route path="/notifications" element={<Notifications />} /> 
              </Routes>
            </UserAuthContextProvider>
          </div>
        </div>
      </Router>
  );
}

export default App;
