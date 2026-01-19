import React from 'react'
import './Product.css'
import { Link, Outlet } from 'react-router-dom'
const Product = () => {
    return (
        <div>
            <div className="main">

                <div className="sidebar">
                    <Link to="/product/all">All Products</Link>
                    <hr />
                    <Link to="/product/add">Add Products</Link>

                </div>
                <div className="product">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default React.memo(Product)
