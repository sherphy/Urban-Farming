// //I SHOULD TRY TO GET NAME TO APPEAR INSTEAD OF EMAIL 
// import React, {useState, useEffect} from 'react'
// // import { Navbar } from '../components/Navbar'
// import Products from '../util/Product'
// import { auth, db } from '../util/firebase'

// const Rewards = (props) => {

//     // gettin current user uid
//     function GetUserEmail(){
//         const [email, setEmail]=useState(null);
//         useEffect(()=>{
//             auth.onAuthStateChanged(user=>{
//                 if(user){
//                     setEmail(user.email);
//                 }
//             })
//         },[])
//         return email;
//     }

//     const useremail = GetUserEmail();



//     // getting current user function
//     // this works
//     function GetCurrentUser(){
//         const [user, setUser]=useState(null);
//         useEffect(()=>{
//             auth.onAuthStateChanged(user=>{
//                 if(user){
//                     db.collection('SignedUpUsersData').doc(user.uid).get().then(snapshot=>{
//                         setUser(snapshot.data());
//                     })
//                 }
//                 else{
//                     setUser(null);
//                 }
//             })
//         },[])
//         return user;
//     }

//     const user = GetCurrentUser();
//     console.log(user);

//     // state of products
//     const [products, setProducts]=useState([]);

//     // getting products function
//     const getProducts = async ()=>{
//         const products = await db.collection('Products').orderBy("price","asc").get();
//         const productsArray = [];
//         for (var snap of products.docs){
//             var data = snap.data();
//             data.ID = snap.id;
//             productsArray.push({
//                 ...data
//             })
//             if(productsArray.length === products.docs.length){
//                 setProducts(productsArray);
//             }
//         }
//     }

//     useEffect(()=>{
//         getProducts();
//     },[])

//     let Product;
//     const addToCart = (product) => {
//         if ( useremail !== null) {
//             // console.log(product);
//             Product = product;
//             Product['qty'] += 1;
//             Product['TotalProductPrice'] = Product.qty * Product.price;
//             db.collection('Cart ' + useremail).doc(product.ID).set(Product).then(() => {
//                 console.log('successfully added to cart');
//             })
//         }
//         else{
//             props.history.push('/dashboard');
//         }

//     }

//     return (
//         <>
//             {/* <Navbar user={user}/>            */}
//             <br></br>
//             {products.length > 0 && (
//                 <div className='container-fluid'>
//                     <h1 className='text-center'>Rewards</h1>

//                     <div className='products-box'>
//                         <Products products={products} addToCart={addToCart}/>
//                     </div>
//                 </div>
//             )}
//             {products.length < 1 && (
//                 <div className='container-fluid'>Please wait....</div>
//             )}
//         </>
//     )
// }

// export default Rewards;

//BASICALLY NEED TO FIND A WAY TO ADD MORE THAN 1 
import { Typography } from "@material-ui/core";
// import React, { useContext,useState, useEffect } from "react";
import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/styles";
import useWindowDimensions from "../util/useWindowDimensions";
import shop from "../images/shop.png";
import Products from '../util/Product'
import { auth, db } from '../util/firebase'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Grid from '@mui/material/Grid';
import {useNavigate} from 'react-router-dom';
// import {userPoints} from "../util/streak"
// import Card from '@mui/material/Card';

toast.configure();

const Rewards = (props) => {

    // getting current user uid
    function GetUserUid() {
        const [uid, setUid] = useState(null);
        useEffect(() => {
            auth.onAuthStateChanged(user => {
                if (user) {
                    setUid(user.uid);
                }
            })
        }, [])
        return uid;
    }

    const uid = GetUserUid();

    // getting current user function
    function GetCurrentUser() {
        const [user, setUser] = useState(null);
        useEffect(() => {
            auth.onAuthStateChanged(user => {
                if (user) {
                    db.collection('SignedUpUsersData').doc(user.uid).get().then(snapshot => {
                        setUser(snapshot.data().FullName);
                    })
                }
                else {
                    setUser(null);
                }
            })
        }, [])
        return user;
    }

    const user = GetCurrentUser();
    console.log(user);

    // state of products
    const [products, setProducts] = useState([]);

    // getting products function
    const getProducts = async () => {
        const products = await db.collection('Products').orderBy("price", "asc").get();
        const productsArray = [];
        for (var snap of products.docs) {
            var data = snap.data();
            data.ID = snap.id;
            productsArray.push({
                ...data
            })
            if (productsArray.length === products.docs.length) {
                setProducts(productsArray);
            }
        }
    }

    useEffect(() => {
        getProducts();
    }, [])

    let rewardProduct;

    const addToCart = (product) => {
        if (uid !== null) {
            console.log(product);
            rewardProduct = product;
            if (rewardProduct['qty'] >= 1){
                rewardProduct['qty']++ ;
            }
            else {
                rewardProduct['qty'] = 1;
            }
                rewardProduct['Orderedby'] = user;
                rewardProduct['TotalProductPrice'] = rewardProduct['qty']*rewardProduct['price'];
                console.log(rewardProduct['TotalProductPrice']);
                db.collection('Cart ' + uid).doc(product.ID).set(rewardProduct).then(() => {
                    console.log('successfully added to cart');
                    //success notification procs even when quantity is more than 1 
                    //can uncomment once i find a way to increase qty from rewards itself

                    // if (Product.qty !== 1) {
                    toast.success('This product has been added to your cart', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined,
                    });
                })
                // }

                // toast.warn('This product is already in your cart', {
                //     position: "top-right",
                //     autoClose: 2000,
                //     hideProgressBar: false,
                //     closeOnClick: true,
                //     pauseOnHover: false,
                //     draggable: false,
                //     progress: undefined,
                // });

            //points 
            
        }
        else {
            props.history.push('/dashboard');
        }
    }

    let navigate = useNavigate();

    const dashNav = () => {
        navigate('/cart');
    }

    // const [cartProducts, setCartProducts]=useState([]);

    // // getting cart products from firestore collection and updating the state
    // useEffect(()=>{
    //     auth.onAuthStateChanged(user=>{
    //         if(user){
    //             db.collection('Cart ' + user.uid).onSnapshot(snapshot=>{
    //                 const newCartProduct = snapshot.docs.map((doc)=>({
    //                     ID: doc.id,
    //                     ...doc.data(),
    //                 }));
    //                 setCartProducts(newCartProduct);                    
    //             })
    //         }
    //         else{
    //             console.log('user is not signed in to retrieve cart');
    //         }
    //     })
    // },[])

    // // console.log(cartProducts);

    //    // getting the qty from cartProducts in a seperate array
    // //    const qty = cartProducts.map(cartProduct=>{
    // //     return cartProduct.qty;
    // // })

    // // reducing the qty in a single value
    // // const reducerOfQty = (accumulator, currentValue)=>accumulator+currentValue;

    // // const totalQty = qty.reduce(reducerOfQty,0);

    // // console.log(totalQty);

    // // getting the TotalProductPrice from cartProducts in a seperate array
    // const price = cartProducts.map((cartProduct)=>{
    //     return cartProduct.TotalProductPrice;
    // })
    
    // // cart product increase function
    // const cartProductIncrease=(cartProduct)=>{
    //     // console.log(cartProduct);
    //     rewardProduct=cartProduct;
    //     rewardProduct.qty=rewardProduct.qty+1;
    //     // updating in database
    //     auth.onAuthStateChanged(user=>{
    //         if(user){
    //             db.collection('Cart ' + user.uid).doc(cartProduct.ID).update(rewardProduct).then(()=>{
    //                 console.log('increment added');
    //             })
    //         }
    //         else{
    //             console.log('user is not logged in to increment');
    //         }
    //     })
    // }

    // // cart product decrease functionality
    // const cartProductDecrease =(cartProduct)=>{
    //     rewardProduct=cartProduct;
    //     if(rewardProduct.qty > 1){
    //         rewardProduct.qty=rewardProduct.qty-1;
    //          // updating in database
    //         auth.onAuthStateChanged(user=>{
    //             if(user){
    //                 db.collection('Cart ' + user.uid).doc(cartProduct.ID).update(rewardProduct).then(()=>{
    //                     console.log('decrement');
    //                 })
    //             }
    //             else{
    //                 console.log('user is not logged in to decrement');
    //             }
    //         })
    //     }
    // }

    function GetCurrentUserPoints(){
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

    const getUserPoints = GetCurrentUserPoints();

    //frontend
    const useStyles = makeStyles((theme) => ({
        title: {
          marginTop: 0, 
          marginBottom: 10,
        },
        container: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          margin: "8px",
          padding: "20px 20px 20px 20px",
          background: "rgba(250, 243, 221, 0.85)",
          borderRadius: "10px",
        },
        bodyText: {
          marginTop: 10,
          marginBottom: 10,
        },
      }));
      

  const { height, width } = useWindowDimensions();
  const classes = useStyles();
  const theme = useTheme();

  let stlWidth, stlHeight;
  let imgWidth, imgHeight;
  let productWidth, productHeight;
  if (width <= 960) {
    stlWidth = 250;
    stlHeight = 250;
    imgWidth = 200;
    imgHeight = 200;
  } else {
    stlWidth = 400;
    stlHeight = 400;
    imgWidth = 350;
    imgHeight = 350;
  }

  return (
    <>
    <div className={classes.container}>
     <img src={shop} alt="Logo" style={{ height: imgHeight, width: imgWidth }}/>
     {products.length > 0 && (
       <div>
         <Typography inline variant="h4" align="center" className={classes.bodyText}>Rewards</Typography>
         <Typography inline variant="h4" align="center" className={classes.bodyText}>Redeem real life items here!</Typography>
         <Typography inline variant="h6" align="center" className={classes.bodyText}>You have {getUserPoints} points</Typography>
         {/* <div className='products-box'>
                        <CartProducts cartProducts={cartProducts}
                            cartProductIncrease={cartProductIncrease}
                            cartProductDecrease={cartProductDecrease}
                        />
                    </div> */}
         <div class="lists">
           <Grid container spacing={1} direction="row" justifyContent="space-evenly" alignItems="center">
               <Products className="item" products={products} addToCart={addToCart}/>
            </Grid>
         </div>
       </div>
      )}
      {products.length < 1 && (
        <div className='container-fluid'>Please wait....</div>
      )} 
      <button style={{backgroundColor: "offwhite"}} onClick={dashNav}>Click here to go to cart</button>
    </div>
    </>
)
}

export default Rewards;