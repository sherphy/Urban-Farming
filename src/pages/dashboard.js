// const Dashboard = () => (
//     <div>
//         <h1> Welcome back, </h1>
//         <h3> Timelapse </h3>
//     </div>
// );

//for user database
// import firebase from "../util/firebase";
// import React, { useState } from "react";

const Dashboard = () => {
    //for user database
    // const [users, setUsers] = useState([]);
    // const [loading, setLoading] = useState(false);

    // const ref = firebase.firestore().collection("users");

    // if (loading) {
    //     return <h1>Loading...</h1>;
    // }

    return (
        <div>
            <h1>Welcome back</h1>
            {/* {users.map((user) => (
                <div key={user.name}>
                    <h2>{user.points}</h2>
                </div>
            ))} */}
        </div>
    );
}

export default Dashboard;

// import React, {useState, useEffect} from 'react'
// import { Navbar } from '../components/Navbar'
// import Products from './rewards'
// import { auth, db } from '../util/firebase'

// const Dashboard = (props) => {

//     // gettin current user uid
//     function GetUserUid(){
//         const [uid, setUid]=useState(null);
//         useEffect(()=>{
//             auth.onAuthStateChanged(user=>{
//                 if(user){
//                     setUid(user.uid);
//                 }
//             })
//         },[])
//         return uid;
//     }

//     const uid = GetUserUid();

//     // getting current user function
//     function GetCurrentUser(){
//         const [user, setUser]=useState(null);
//         useEffect(()=>{
//             auth.onAuthStateChanged(user=>{
//                 if(user){
//                     db.collection('users').doc(user.uid).get().then(snapshot=>{
//                         setUser(snapshot.data().FullName);
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
//     // console.log(user);
    
//     // state of products
//     const [products, setProducts]=useState([]);

//     // getting products function
//     const getProducts = async ()=>{
//         const products = await db.collection('Products').get();
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
//     const addToCart = (product)=>{
//         if(uid!==null){
//             // console.log(product);
//             Product=product;
//             Product['qty']=1;
//             Product['TotalProductPrice']=Product.qty*Product.price;
//             db.collection('Cart ' + uid).doc(product.ID).set(Product).then(()=>{
//                 console.log('successfully added to cart');
//             })

//         }
//         else{
//             props.history.push('/login');
//         }
        
//     }
    
//     return (
//         <>
//             <Navbar user={user}/>           
//             <br></br>
//             {products.length > 0 && (
//                 <div className='container-fluid'>
//                     <h1 className='text-center'>Products</h1>
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

// export default Dashboard;