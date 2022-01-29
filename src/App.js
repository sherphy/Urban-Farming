//react class
import React, { Component } from 'react';
//basic routing
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
//for pages
import Login from "./pages/login"
import Dashboard from "./pages/dashboard";
import Guides from "./pages/guides";
import Products from "./pages/rewards";
import Signup from "./pages/signup";
//might need to remove later to hide it from view
// import AddProducts from "./components/AddProducts";
//utilities
import { UserAuthContextProvider } from "./util/userAuthContext";
import { ProductsContextProvider } from "./util/ProductsContext";

//for routing 
//https://www.youtube.com/watch?v=Law7wfdg_ls
export class App extends Component {
  render() {
    return (
      <ProductsContextProvider>
        <Router>
          <div className="App">
            <UserAuthContextProvider>
              <Routes>
                <Route exact path="/" element={<Login />} />
                <Route exact path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/guides" element={<Guides />} />
                <Route path="/rewards" element={<Products />} />
                {/* might need to remove later to hide it from view */}
                {/* <Route path='/addproducts' element={<AddProducts />} /> */}
              </Routes>
            </UserAuthContextProvider>
          </div>
        </Router>
      </ProductsContextProvider>
    );
  }
}

export default App;