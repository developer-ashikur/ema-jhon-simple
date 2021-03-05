import React from 'react';
import './ReviewItem.css';

const ReviewItem = ({product, removeProduct}) => {
    const {name, quantity, price} = product;
    return (
        <div className='review-item'>
            <h1>{name}</h1>
            <h2>Quantity: {quantity}</h2>
            <h2>Price: ${price} </h2>
            <button className='main-btn' onClick={() => removeProduct(product.key)}>Remove</button>
        </div>
    );
};

export default ReviewItem;