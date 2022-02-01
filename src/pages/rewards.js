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
import React, { useState, useEffect } from 'react'
import Products from '../util/Product'
import { auth, db } from '../util/firebase'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

    let Product;
    const addToCart = (product) => {
        if (uid !== null) {
            console.log(product);
            Product = product;
            Product['qty'] = 1;
            Product['TotalProductPrice'] = Product.qty * Product.price;
            db.collection('Cart ' + uid).doc(product.ID).set(Product).then(() => {
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
            })
        }
        else {
            props.history.push('/dashboard');
        }
    }

    return (
        <>
            <br></br>
            {products.length > 0 && (
                <div className='container-fluid'>
                    <h1 className='text-center'>Rewards</h1>
                    <h3 className='text-center'>Redeem real life items here!</h3>
                    <div className='products-box'>
                        <Products products={products} addToCart={addToCart} />
                    </div>
                </div>
            )}
            {products.length < 1 && (
                <div className='container-fluid'>Please wait....</div>
            )}
        </>
    )
}

export default Rewards;