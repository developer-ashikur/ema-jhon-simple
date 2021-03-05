import React from 'react';
import './Cart.css';

const Cart = (props) => {
    // console.log(cart);
    let total = 0;
    for (let i = 0; i < props.cart.length; i++) {
        const product = props.cart[i];
        total = total + product.price * (product.quantity || 1);
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
            <h2>Items Ordered: {props.cart.length} </h2>
            <h2>Product Price: ${Math.round(total)} </h2>
            <h2>Shipping Cost: ${Math.round(shipping)}</h2>
            <h2>Tax + VAT: ${Math.round(vat)} </h2>
            <h2>Total Price: ${Math.round(grandTotal + vat)} </h2>
            {props.children}
            </div>
    );
};

export default Cart;