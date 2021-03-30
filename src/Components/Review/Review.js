import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import happyImage from '../../images/giphy.gif';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Review.css';


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

        fetch('https://enigmatic-sands-80972.herokuapp.com/productByKeys',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys) 
        })
        .then(res=>res.json())
        .then(data=>{setCart(data)})
    },[]);
    const history = useHistory();
    const handleCheckoutOrder = () => {
        history.push('/shipment');
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
                    <button onClick={handleCheckoutOrder} className='main-btn'>Checkout Order</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;