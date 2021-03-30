import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
// import fakeData from '../../fakeData'
import Products from '../Products/Products';
import './Shop.css';

const Shop = () => {
    // const first10 = fakeData.slice(0,10);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() =>{
        fetch('https://enigmatic-sands-80972.herokuapp.com/products')
        .then(res => res.json())
        .then(data => setProducts(data))
    },[])

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
    }, [])
    const handleAddProduct= (product) => {
        const newCart = [...cart, product];
        setCart(newCart);
        const addedProducts = newCart.filter(pd => pd.key === product.key);
        const count = addedProducts.length;
        addToDatabaseCart(product.key, count);
    }
    return (
        <div className='shop-container'>
            <div className="product-container">
                {
                    products.map(product => <Products showAddToCart={true} product={product} handleAddProduct={handleAddProduct} key={product.key}></Products>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to='/review'>
                        <button className='main-btn'>Product Review</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;