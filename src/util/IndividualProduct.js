import React from 'react'

const IndividualProduct = ({individualProduct, addToCart}) => {
    const handleAddToCart=()=>{
        addToCart(individualProduct);
    }   
    return (
        <div className='product'>
            <div className='product-img'>
                <img src={individualProduct.url} alt="product-img"/>
            </div>
            <div className='product-text title'>{individualProduct.title}</div>
            <div className='product-text description'>{individualProduct.description}</div>
            <div className='product-text price'> {individualProduct.price} Points</div>
            <button className='btn btn-danger btn-md cart-btn' onClick={handleAddToCart}>ADD TO CART</button>
        </div> 
    )
}

export default IndividualProduct;