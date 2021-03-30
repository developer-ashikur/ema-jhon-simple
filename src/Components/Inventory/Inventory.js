import React from 'react';

const Inventory = () => {
    const handleAddProduct = () => {
        const products = {};
        fetch('https://enigmatic-sands-80972.herokuapp.com/addProduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(products)
        })
    }
    return (
        <>
            <form action="">
                <p><span>Name: </span><input type="text" name="" id=""/></p>
                <p><span>Price: </span><input type="text" name="" id=""/></p>
                <p><span>Quantity: </span><input type="text" name="" id=""/></p>
                <p><span>Product Image</span><input type="file" name="" id=""/></p>
                <button onClick={handleAddProduct}>Add Product</button>
            </form>
        </>
    );
};

export default Inventory;