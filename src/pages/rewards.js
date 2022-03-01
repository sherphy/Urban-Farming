//handles the frontend and backend for the reward shop
import { Typography } from "@material-ui/core";
import React, { useContext,useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/styles";
import useWindowDimensions from "../util/useWindowDimensions";
import shop from "../images/shop.png";
import Box from "@material-ui/core/Box";
import { ProductsContext } from '../util/ProductsContext'
import { CartContext } from '../util/CartContext'
import Products from '../util/Product'
import { auth, db } from '../util/firebase'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';

toast.configure();

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

//backend
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
            Product['Orderedby'] = user;
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

  //frontend
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
         <Typography inline variant="h5" align="center" className={classes.bodyText}>Redeem real life items here!</Typography>
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
    </div>
    </>
)
}

export default Rewards
