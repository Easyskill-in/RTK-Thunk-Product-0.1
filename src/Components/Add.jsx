import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { add, AddSingleProduct, reset } from '../Store/ProductSlice'
import { useNavigate } from 'react-router-dom'

const Add = () => {
    const [Product, setProduct] = useState({

        title: "",
        price: 0,
        category: "",
        image: "",
    })
    const nav = useNavigate()
    const dispatch = useDispatch()

    function handleChange(e) {
        setProduct({ ...Product, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <form action="" onSubmit={(e) => {
                e.preventDefault()
                console.log(Product)

                // dispatch(add(Product))
                dispatch(AddSingleProduct(Product))
                setProduct({
                    title: "",
                    price: 0,
                    category: "",
                    image: "",
                })

                nav("/product/all")

            }}>

                <input type="text" name='title' value={Product.title} onChange={handleChange} placeholder='Enter Your Title' /><br></br><br />
                <input type="number" name='price' value={Product.price} onChange={handleChange} placeholder='Enter Your Price' /><br></br><br />
                <input type="text" name='category' value={Product.category} onChange={handleChange} placeholder='Enter Your category' /><br></br><br />
                <input type="text" name='image' value={Product.image} onChange={handleChange} placeholder='Enter Your image' /><br></br><br />
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default React.memo(Add)
