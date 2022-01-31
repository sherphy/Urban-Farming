// import React, { useContext } from 'react'
// import { ProductsContext } from '../util/ProductsContext'
// import { CartContext } from '../util/CartContext'

// const Products = () => {

//     const { products } = useContext(ProductsContext);

//     const { dispatch } = useContext(CartContext);

//     return (
//         <>
//             {products.length !== 0 && <h1>Reward Shop</h1>}
//             <h3>Redeem your points for real life items here!</h3> 
//             <div className='products-container'>
//                 {products.length === 0 && <div>Loading</div>}
//                 {products.map(product => (
//                     <div className='product-card' key={product.ProductID}> 
//                     {/* need to add icreasing price view */}
//                         <div className='product-img'>
//                             <img src={product.ProductImg} alt="not found" />
//                         </div>
//                         <div className='product-name'>
//                             {product.ProductName}
//                         </div>
//                         <div className='product-price'>
//                             {product.ProductPrice} points
//                     </div>
//                         <button className='addcart-btn' onClick={() => dispatch({ type: 'ADD_TO_CART', id: product.ProductID, product })}>ADD TO CART</button>
//                         {/* //trial to add the small buttons  */}
//                         {/* <button className='inc' onClick={() => dispatch({ type: 'INC', id: product.ProductID, product })}>+1</button> */}
//                     </div>
//                 ))}
//             </div>
//         </>
//     )
// }

// export default Products

// // import React from 'react'
// // import IndividualProduct from '../components/individualProduct'

// // const Products = ({products,addToCart}) => {
    
// //     return products.map((individualProduct)=>(
// //         <IndividualProduct key = {individualProduct.ID} individualProduct={individualProduct}
// //            addToCart={addToCart}
// //         />
// //     ))
// // }

// // export default Products;

import React, {useState, useEffect} from 'react'
import { Navbar } from '../components/Navbar'
import Products from '../util/Product'
import { auth, db } from '../util/firebase'

const Rewards = (props) => {

    // gettin current user uid
    function GetUserUid(){
        const [uid, setUid]=useState(null);
        useEffect(()=>{
            auth.onAuthStateChanged(user=>{
                if(user){
                    setUid(user.uid);
                }
            })
        },[])
        return uid;
    }

    const uid = GetUserUid();

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

    const user = GetCurrentUser();
    // console.log(user);
    
    // state of products
    const [products, setProducts]=useState([]);

    // getting products function
    const getProducts = async ()=>{
        const products = await db.collection('Products').get();
        const productsArray = [];
        for (var snap of products.docs){
            var data = snap.data();
            data.ID = snap.id;
            productsArray.push({
                ...data
            })
            if(productsArray.length === products.docs.length){
                setProducts(productsArray);
            }
        }
    }

    useEffect(()=>{
        getProducts();
    },[])
    
    let Product;
    const addToCart = (product)=>{
        if(uid!==null){
            // console.log(product);
            Product=product;
            Product['qty']=1;
            Product['TotalProductPrice']=Product.qty*Product.price;
            db.collection('Cart ' + uid).doc(product.ID).set(Product).then(()=>{
                console.log('successfully added to cart');
            })

        }
        else{
            props.history.push('/login');
        }
        
    }
    
    return (
        <>
            <Navbar user={user}/>           
            <br></br>
            {products.length > 0 && (
                <div className='container-fluid'>
                    <h1 className='text-center'>Products</h1>
                    <div className='products-box'>
                        <Products products={products} addToCart={addToCart}/>
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