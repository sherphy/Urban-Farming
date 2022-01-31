//necessary
import React, { Component } from 'react';
import { auth, db } from "./util/firebase";
//basic routing
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//for pages
import Login from "./pages/login"
import Dashboard from "./pages/dashboard";
import Guides from "./pages/guides";
import Products from "./pages/rewards";
import Signup from "./pages/signup";
import Cart from "./pages/cart";

//might need to remove later to hide it from view
// import AddProducts from "./components/AddProducts";
//utilities
import { UserAuthContextProvider } from "./util/userAuthContext";
import { ProductsContextProvider } from "./util/ProductsContext";
import { CartContextProvider } from "./util/CartContext";

import './index.css'

//for routing 
//https://www.youtube.com/watch?v=Law7wfdg_ls
export class App extends Component {

  //for auth
//   state = {
//     user: null,
// }

// componentDidMount() {

    // getting user info for navigation bar
    //think can do something to this part to link them to different timelapses
//     auth.onAuthStateChanged(user => {
//         if (user) {
//             db.collection('SignedUpUsersData').doc(user.uid).get().then(snapshot => {
//                 this.setState({
//                     user: snapshot.data()
//                 })
//             })
//         }
//         else {
//             this.setState({
//                 user: null
//             })
//         }
//     })

// }

  render() {
    return (
      <ProductsContextProvider>
        <CartContextProvider>
          <Router>
            <div className="App">
              <UserAuthContextProvider>
                <Routes>
                  <Route exact path="/" element={<Login />} />
                  <Route exact path="/signup" element={<Signup />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/guides" element={<Guides />} />
                  <Route path="/rewards" element={<Products />} />
                  <Route path="/cart" element={()=><Cart user={this.state.user}/>}/>
                  {/* might need to remove later to hide it from view */}
                  {/* <Route path='/addproducts' element={<AddProducts />} /> */}
                </Routes>
              </UserAuthContextProvider>
            </div>
          </Router>
        </CartContextProvider>
      </ProductsContextProvider>
    );
  }
}

export default App;