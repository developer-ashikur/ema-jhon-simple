import React from 'react';

const Cart = ({cart}) => {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price;
    }
    let shipping = 0;
    if (total > 50){
        shipping = 9.99;
    }
    else if (total < 50 && total > 1){
        shipping = 14.99;
    }
    let grandTotal = total + shipping;
    let vat = grandTotal * .1;
    return (
        <div>
            <h1>Order summery</h1>
            <h2>Items Ordered: {cart.length} </h2>
            <h2>Product Price: {Math.round(total)} </h2>
            <h2>Shipping Cost: {Math.round(shipping)}</h2>
            <h2>Tax + VAT: {Math.round(vat)} </h2>
            <h2>Total Price: {Math.round(grandTotal + vat)} </h2>
        </div>
    );
};

export default Cart;