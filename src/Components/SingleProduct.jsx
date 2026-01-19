import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { DeleteSingleProduct, FetchSingleProduct } from '../Store/ProductSlice'
import { useDispatch, useSelector } from 'react-redux'

const SingleProduct = () => {
    const { id } = useParams()
    const Product = useSelector(state => state.Product)
    console.log("DATA : ", id)
    console.log("Product : ", Product)
    const dispatch = useDispatch()
    useEffect(() => {
        if (id) {

            dispatch(FetchSingleProduct(id))
        }
    }, [id, dispatch])

    if (Product.loading) return <h2>Loading...</h2>
    return (
        <div>

            <div className='sub-main-all'>
                <img src={Product.singleProduct
                    .image} alt="" />
                <h1>{Product.singleProduct
                    .title}</h1>
                <h3>{Product.singleProduct
                    .category}</h3>
                <span>{Product.singleProduct
                    .price}</span>
                <button onClick={() => {
                    dispatch(DeleteSingleProduct(id))
                }}>Add To Cart</button>
            </div>
        </div>
    )
}

export default SingleProduct
