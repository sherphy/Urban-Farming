//basic routing
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
//for pages
import Login from "./pages/login"
import Dashboard from "./pages/dashboard";
import Guides from "./pages/guides";
import Rewards from "./pages/rewards";
import Signup from "./pages/signup";
import Navbar from "./components/Layout/Navbar"; //for testing
import { UserAuthContextProvider } from "./util/userAuthContext";
//Background Image
import Background from "./images/Background2.jpg";


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
                <Route exact path="/" element={<Login />} />
                <Route exact path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/guides" element={<Guides />} />
                <Route path="/rewards" element={<Rewards />} />
                
                <Route path="/navbartest" element={<Navbar />} /> {/*to delete after test*/}
              </Routes>
            </UserAuthContextProvider>
          </div>
        </div>
      </Router>
  );
}

export default App;
