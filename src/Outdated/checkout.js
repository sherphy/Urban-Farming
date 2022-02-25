// import React, { useState, useEffect, useContext } from 'react'
// import { auth, db } from '../util/firebase'
// import { CartContext } from '../util/CartContext'
// import { Navbar } from '../components/Navbar';
// import { useNavigate } from 'react-router-dom'

// const Cashout = (props) => {

//     const history = useNavigate();

//     const { shoppingCart, dispatch, totalPrice, totalQty } = useContext(CartContext);

//     // defining state
//     const [email, setEmail] = useState('');
//     const [error, setError] = useState('');
//     const [successMsg, setSuccessMsg] = useState('');

//     useEffect(() => {
//         auth.onAuthStateChanged(user => {
//             if (user) {
//                 db.collection('SignedUpUsersData').doc(user.uid).onSnapshot(snapshot => {
//                     setEmail(snapshot.data().Email);
//                 })
//             }
//             else {
//                 history.push('/login')
//             }
//         })
//     })

//     const cashoutSubmit = (e) => {
//         e.preventDefault();
//         auth.onAuthStateChanged(user => {
//             if (user) {
//                 const date = new Date();
//                 const time = date.getTime();
//                 db.collection('Buyer-info ' + user.uid).doc('_' + time).set({
//                     BuyerEmail: email,
//                     BuyerPayment: totalPrice,
//                     BuyerQuantity: totalQty
//                 }).then(() => {
//                     dispatch({ type: 'EMPTY' })
//                     setSuccessMsg('Your order has been placed successfully. Thanks for visiting us. You will be redirected to home page after 5 seconds');
//                     setTimeout(() => {
//                         history.push('/')
//                     }, 5000)
//                 }).catch(err => setError(err.message))
//             }
//         })
//     }

//     return (
//         <>
//             <Navbar user={props.user} />
//             <div className='container'>
//                 <br />
//                 <h2>Cashout Details</h2>
//                 <br />
//                 {successMsg && <div className='success-msg'>{successMsg}</div>}
//                 <form autoComplete="off" className='form-group' onSubmit={cashoutSubmit}>
//                     <label htmlFor="email">Email</label>
//                     <input type="email" className='form-control' required
//                         value={email} disabled />
//                     <br />
//                     <label htmlFor="Price To Pay">Price To Pay</label>
//                     <input type="number" className='form-control' required
//                         value={totalPrice} disabled />
//                     <br />
//                     <label htmlFor="Total No of Products">Total No of Products</label>
//                     <input type="number" className='form-control' required
//                         value={totalQty} disabled />
//                     <br />
//                     <button type="submit" className='btn btn-success btn-md mybtn'>SUBMIT</button>
//                 </form>
//                 {error && <span className='error-msg'>{error}</span>}
//             </div>
//         </>
//     )
// }

// export default Cashout;