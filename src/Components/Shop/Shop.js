import React, { useEffect, useState } from 'react';
import './Shop.css';
import fakeData from '../../fakeData'
import Products from '../Products/Products';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop = () => {
    const first10 = fakeData.slice(0,10);
    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCarts = getDatabaseCart();
        const productKeys = Object.keys(savedCarts);

        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCarts[key];
            return product;
        })
        setCart(cartProducts);
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