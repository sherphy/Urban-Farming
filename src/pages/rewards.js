import React, { useContext } from 'react'
import { ProductsContext } from '../util/ProductsContext'
import { CartContext } from '../util/CartContext'

const Products = () => {

    const { products } = useContext(ProductsContext);

    const { dispatch } = useContext(CartContext);

    return (
        <>
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
                        {/* //trial to add the small buttons  */}
                        {/* <button className='inc' onClick={() => dispatch({ type: 'INC', id: product.ProductID, product })}>+1</button> */}
                    </div>
                ))}
            </div>
        </>
    )
}

export default Products

// import React from 'react'
// import IndividualProduct from '../components/individualProduct'

// const Products = ({products,addToCart}) => {
    
//     return products.map((individualProduct)=>(
//         <IndividualProduct key = {individualProduct.ID} individualProduct={individualProduct}
//            addToCart={addToCart}
//         />
//     ))
// }

// export default Products;