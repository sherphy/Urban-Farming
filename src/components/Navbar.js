import React, { useContext } from 'react'
import { Icon } from 'react-icons-kit'
import { cart } from 'react-icons-kit/entypo/cart'
import { CartContext } from '../util/CartContext'

// export const Navbar = ({ user }) => {
  export const Navbar = () => {
    const { totalQty } = useContext(CartContext);

    return (
        <div className='navbox'>
                <span><Icon icon={cart} /></span>
                <span className='no-of-products'>{totalQty}</span>
        </div>
    )
}