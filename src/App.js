// //necessary
// import React, { Component } from 'react';
// import { auth, db } from "./util/firebase";
// //basic routing
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// //for pages
// import Login from "./pages/login"
// import Dashboard from "./pages/dashboard";
// import Guides from "./pages/guides";
// import Products from "./pages/rewards";
// import Signup from "./pages/signup";
// // import Cart from "./pages/cart";
// // import Cashout from "./pages/checkout";

// //might need to remove later to hide it from view
// // import AddProducts from "./components/AddProducts";
// //utilities
// import { UserAuthContextProvider } from "./util/userAuthContext";
// import { ProductsContextProvider } from "./util/ProductsContext";
// import { CartContextProvider } from "./util/CartContext";

// import './index.css'

// //for routing 
// //https://www.youtube.com/watch?v=Law7wfdg_ls
// export class App extends Component {

//   state = {
//     user: null,
//   }

//   componentDidMount() {

//     // getting user info for navigation bar
//     auth.onAuthStateChanged(user => {
//       if (user) {
//         db.collection('SignedUpUsersData').doc(user.uid).get().then(snapshot => {
//           this.setState({
//             user: snapshot.data().Email,
//             points: snapshot.data().Points,
//             view: snapshot.data().Camera
//           })
//         })
//       }
//       else {
//         this.setState({
//           user: null
//         })
//       }
//     })

//   }

//   render() {
//     return (
//       <ProductsContextProvider>
//         <CartContextProvider>
//           <Router>
//             <div className="App">
//               <UserAuthContextProvider>
//                 <Routes>
//                   <Route exact path="/" element={<Login />} />
//                   <Route exact path="/signup" element={<Signup />} />
//                   <Route path="/dashboard" element={<Dashboard user={this.state.user}/>} />
//                   <Route path="/guides" element={<Guides />} />
//                   <Route path="/rewards" element={<Products />} />
//                   {/* beware of migration from "component" to "element"
//                   and the syntax change https://reactrouter.com/docs/en/v6/faq */}
//                   {/* <Route path="/cart" element={<Cart user={this.state.user}/>} />
//                   <Route path='/checkout' element={<Cashout user={this.state.user} />} /> */}
//                   {/* might need to remove later to hide it from view */}
//                   {/* <Route path='/addproducts' element={<AddProducts />} /> */}
//                 </Routes>
//               </UserAuthContextProvider>
//             </div>
//           </Router>
//         </CartContextProvider>
//       </ProductsContextProvider>
//     );
//   }
// }

// export default App;

import React, {Component} from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './pages/dashboard'
import Rewards from './pages/rewards'
import Login from './pages/login'
import Signup from './pages/signup'
import Cart from './pages/cart'
import Guides from './pages/guides'
import "./index.css"
// import AddProducts from './util/AddProducts'

//for styling
import Background from "./images/Background2.jpg";
//Navbar
// import WithoutNav from "./components//WithoutNav";
import WithNav from "./components//WithNav";


var backgroundStyle = {
  minHeight: "100vh", 
  backgroundImage: `url(${Background})`,
  backgroundSize: "150%", 
  backgroundPosition: "center",
  backgroundRepeat: "repeat-y",
};

export class App extends Component {
  render() {
  return (
    <Router>
      <div className="App"></div>
      <div className="container" style={backgroundStyle}>
      <Routes>
        {/* <Route element={<WithoutNav />}> */}
          <Route exact path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        {/* </Route> */}
        <Route element={<WithNav />}>
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/guides" element={<Guides />} />
          {/* <Route path="/addproducts" element={<AddProducts/>} /> */}
          </Route>
          </Routes>
          </div>
        </Router>
        );
  }
}

        export default App