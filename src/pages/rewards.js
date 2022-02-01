//handles the frontend and backend for the reward shop
import { Typography } from "@material-ui/core";
import React, { useContext } from "react";
import { makeStyles, useTheme } from "@material-ui/styles";
import useWindowDimensions from "../util/useWindowDimensions";
import shop from "../images/shop.png";
import Box from "@material-ui/core/Box";
import { ProductsContext } from '../util/ProductsContext'
import { CartContext } from '../util/CartContext'

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
const Products = () => {

  const { products } = useContext(ProductsContext);

  const { dispatch } = useContext(CartContext);

  //frontend
  const { height, width } = useWindowDimensions();
  const classes = useStyles();
  const theme = useTheme();

  let stlWidth, stlHeight;
  let imgWidth, imgHeight;
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
        {products.length !== 0 && <h1>Reward Shop</h1>}
        <h3>Redeem your points for real life items here!</h3> 
        <div className='products-container'>
            {products.length === 0 && <div>Loading</div>}
            {products.map(product => (
                <div className='product-card' key={product.ProductID}>
                {/* need to add icreasing price view */}
                    <div className='product-img'>
                        <img src={product.ProductImg} alt="not found" />
                    </div>
                    <div className='product-name'>
                        {product.ProductName}
                    </div>
                    <div className='product-price'>
                        {product.ProductPrice} points
                </div>
                    <button className='addcart-btn' onClick={() => dispatch({ type: 'ADD_TO_CART', id: product.ProductID, product })}>ADD TO CART</button>
                </div>
            ))}
        </div>
    </div>
    </>
)
}

export default Products
