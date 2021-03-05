import React from 'react';
import './Products.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Products = ({product, handleAddProduct, showAddToCart}) => {
    const {name, seller, price, stock, img, key} = product;
    return (
        <div className='product'>
            <div className="product-img">
                <h2><img src={img} alt=""/></h2>
            </div>
            <div className="product-info">
                <h2><Link to={'/product/'+key}>{name}</Link></h2>
                <h3>By-{seller}</h3>
                <h1>${price}</h1>
                <h3>Only {stock} left in stock -Order soon.</h3>
                {showAddToCart && <h1><button className='main-btn' onClick={() => handleAddProduct(product)}><FontAwesomeIcon icon={faShoppingCart} /> Add to Cart</button></h1>}
            </div>
        </div>
    );
};

export default Products;