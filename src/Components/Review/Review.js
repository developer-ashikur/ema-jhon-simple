import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Review.css';
import happyImage from '../../images/giphy.gif';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [placeOrder, setPlaceOrder] = useState(false);
    const removeProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    useEffect(() => {
        const savedCarts = getDatabaseCart();
        const productKeys = Object.keys(savedCarts);

        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCarts[key];
            return product;
        })
        setCart(cartProducts);
    },[]);
    const handlePlaceOrder = () => {
        processOrder();
        setPlaceOrder(true);
        setCart([]);
    }
    return (
        <div className="review-container">
            <div className='product-container'>
            {
                cart.map(pd => <ReviewItem product={pd} key={pd.key} removeProduct={removeProduct} ></ReviewItem>)
            }
            {
                placeOrder && <img src={happyImage} alt=""/>
            }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handlePlaceOrder} className='main-btn'>Place Order</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;