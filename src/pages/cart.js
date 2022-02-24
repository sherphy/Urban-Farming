import React,{useState, useEffect} from 'react'
// import Navbar from '../components/Navbar'
import {auth, db} from '../util/firebase'
import CartProducts from '../util/CartProducts';
//if we want to monetize
// import StripeCheckout from 'react-stripe-checkout';

const Cart = () => {

    // getting current user function
    function GetCurrentUser(){
        const [user, setUser]=useState(null);
        useEffect(()=>{
            auth.onAuthStateChanged(user=>{
                if(user){
                    db.collection('SignedUpUsersData').doc(user.uid).get().then(snapshot=>{
                        setUser(snapshot.data().FullName);
                    })
                }
                else{
                    setUser(null);
                }
            })
        },[])
        return user;
    }

    let userFound = GetCurrentUser();
    console.log(userFound);
    
    // state of cart products
    const [cartProducts, setCartProducts]=useState([]);

    // getting cart products from firestore collection and updating the state
    useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
                db.collection('Cart ' + user.uid).onSnapshot(snapshot=>{
                    const newCartProduct = snapshot.docs.map((doc)=>({
                        ID: doc.id,
                        ...doc.data(),
                    }));
                    setCartProducts(newCartProduct);                    
                })
            }
            else{
                console.log('user is not signed in to retrieve cart');
            }
        })
    },[])

    // console.log(cartProducts);

       // getting the qty from cartProducts in a seperate array
    //    const qty = cartProducts.map(cartProduct=>{
    //     return cartProduct.qty;
    // })

    // reducing the qty in a single value
    // const reducerOfQty = (accumulator, currentValue)=>accumulator+currentValue;

    // const totalQty = qty.reduce(reducerOfQty,0);

    // console.log(totalQty);

    // getting the TotalProductPrice from cartProducts in a seperate array
    const price = cartProducts.map((cartProduct)=>{
        return cartProduct.TotalProductPrice;
    })

    // reducing the price in a single value
    const reducerOfPrice = (accumulator,currentValue)=>accumulator+currentValue;

    const totalPrice = price.reduce(reducerOfPrice,0);


    let Product;
    
    // cart product increase function
    const cartProductIncrease=(cartProduct)=>{
        // console.log(cartProduct);
        Product=cartProduct;
        Product.qty=Product.qty+1;
        Product.TotalProductPrice=Product.qty*Product.price;
        // updating in database
        auth.onAuthStateChanged(user=>{
            if(user){
                db.collection('Cart ' + user.uid).doc(cartProduct.ID).update(Product).then(()=>{
                    console.log('increment added');
                })
            }
            else{
                console.log('user is not logged in to increment');
            }
        })
    }

    // cart product decrease functionality
    const cartProductDecrease =(cartProduct)=>{
        Product=cartProduct;
        if(Product.qty > 1){
            Product.qty=Product.qty-1;
            Product.TotalProductPrice=Product.qty*Product.price;
             // updating in database
            auth.onAuthStateChanged(user=>{
                if(user){
                    db.collection('Cart ' + user.uid).doc(cartProduct.ID).update(Product).then(()=>{
                        console.log('decrement');
                    })
                }
                else{
                    console.log('user is not logged in to decrement');
                }
            })
        }
    }

    // const currentPoints = () => {
    // if(user){
    // db.collection('SignedUpUsersData').doc(user.uid).get().then(snapshot=>{
    //     setUserPoints(snapshot.data().Points);
    // })
    // }
    // }

    function GetCurrentPoints(){
        const [userPoints, setUserPoints]=useState('');

        useEffect(()=>{
            //this probably reloads the console
            auth.onAuthStateChanged(user=>{
                if(user){
                    db.collection('SignedUpUsersData').doc(user.uid).get().then(snapshot=>{
                        setUserPoints(snapshot.data().Points);
                    })
                }
                else{
                    setUserPoints(null);
                }
            })
        },[])
        return userPoints;
    }
    const userPoints = GetCurrentPoints();
    const pointsAfterTransaction = userPoints - totalPrice;
    console.log(pointsAfterTransaction);


    // const completeOrder = () => {
    //     auth.onAuthStateChanged(user=>{
    //         if(user){
    //             db.collection('Cart ' + user.uid).doc().set({Paid: true});
    //             // might be buggy bc idk if u try to checkout another time aft paying
    //             // then it will show as like the new items also paid for
    //             // so udk whats in cart and whats alr paid 
    //             db.collection('SignedUpUsersData').doc(user.uid).update({Points: pointsAfterTransaction});
    //         }
    //     })
    // }

    // const CompleteOrder = (cartProduct) => {
    //     // useEffect(() => {
    //         auth.onAuthStateChanged(user => {
    //             if (user) {
    //                 const docRef = db.collection('Cart ' + user.uid).doc(cartProducts.id)
    //                 const docData = docRef
    //                     .get()
    //                     .then((doc) => doc.exists && doc.data())
    //                     .catch((error) => {
    //                         console.error('Error reading document')
    //                     });

    //                 if (docData) {
    //                     // document exists, create the new item
    //                     db.collection('Paid cart ' + user.uid)
    //                         .doc()
    //                         .set({ ...docData})
    //                         .catch((error) => {
    //                             console.error('Error creating document');
    //                         });
    //                     db.collection('SignedUpUsersData').doc(user.uid).update({Points: pointsAfterTransaction});

    //                 }
    //                 else {
    //                     console.log('checkout fail');
    //                 }
    //             }
    //         })
    //     // })
    // }

    function Checkout() {
        //copy the entire database over from Cart to Paid Cart
        auth.onAuthStateChanged(user => {
            if (user) {
                db.collection('Cart ' + user.uid).get()
                    .then((snapshot) => {
                        snapshot.forEach((doc) => {
                            // We are iterating on the documents of the collection
                            let data = doc.data();
                            console.log(doc.id, '=>', doc.data());
                            let setDoc = db.collection('Paid Cart ' + user.uid).doc(doc.id).set(data);
                            setDoc.then(res => {
                                console.log('Set: ', res);
                            });
                        })
                    })
                //now start minusing the points
                db.collection('SignedUpUsersData').doc(user.uid).set({Points: pointsAfterTransaction});
                //CURRENT PROBLEM: 
                //if users add an item that they already checked out before we reset their Paid Cart database
                //then their previous item gets overwritten

                //how about if Cart doc.id === Paid Cart doc.id, then db.collection Paid Cart field .qty += Cart field .qty

                db.collection('Cart ' + user.uid).get()
                  .then((snapshot) => {
                    snapshot.forEach((doc) => {
                        db.collection('Cart ' + user.uid).doc(doc.id).delete();
                    })
                  })
            }
            else {
                console.log('checkout fail');
            }
        })
    }

    // const successMsg = () => {

    // }

    return (
        <>
            {/* <Navbar user={user} totalProducts={totalProducts} />            */}
            <br></br>
            {cartProducts.length > 0 && (
                <div className='container-fluid'>
                    <h1 className='text-center'>Cart</h1>
                    <div className='products-box'>
                        <CartProducts cartProducts={cartProducts}
                           cartProductIncrease={cartProductIncrease}
                           cartProductDecrease={cartProductDecrease}
                        />
                    </div>
                    <div className='summary-box'>
                        <h5>Cart Summary</h5>
                        <div>
                        Total Points Required: <span> {totalPrice} Points </span>
                        </div>
                        <div>
                        Total Points You Have Now: <span> {userPoints} Points </span>
                        </div>
                        {pointsAfterTransaction >= 0 &&
                            <div>
                                You have enough points to purchase this!
                                <div />
                                You will have {pointsAfterTransaction} after this!
                                {/* make it green */}
                                <br />
                                <button onClick={Checkout}> Confirm order! </button>
                                {/* need to say something on click otherwise they confused */}
                                <div />
                                {/* {Checkout &&
                                    <h1> Your order is confirmed </h1>} */}
                            </div>
                        }
                        {pointsAfterTransaction < 0 &&
                            <div>
                                You do not have enough points to get this.
                                <br />
                                You need {-pointsAfterTransaction} more points!
                                {/* make it red */}
                            </div>
                        }
                    </div>                                    
                </div>
            )}
            {cartProducts.length < 1 && (
                <div className='container-fluid'>No products to show</div>
            ) }           
        </>
    )
}

export default Cart;