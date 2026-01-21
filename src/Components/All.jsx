import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteSingleProduct, FetchProduct, FetchSingleProduct, remove, reset } from '../Store/ProductSlice'
import { useNavigate } from 'react-router-dom'

const All = () => {
    const data = useSelector(state => state.Product)
    // console.log(data)
    const dispatch = useDispatch()
    const nav = useNavigate()
    // useEffect(() => {
    //     dispatch(FetchProduct())
    // }, [])
    useEffect(() => {
        if (data.item.length === 0) {
            dispatch(FetchProduct())
        }
    }, [])

    if (data.loading) {
        return <h1>loading....</h1>
    }
    return (
        <>
            <div className="main-all" >

                {data.item.map((value, index) => (
                    <div key={value.id} className='sub-main-all' >
                        <div className="temp" onClick={() => {
                            nav(`/Product/${value.id}`)
                        }}>
                            <img src={value.image} alt="" />
                            <h1>{value.title}</h1>
                            <h3>{value.category}</h3>
                            <span>{value.price}</span>
                        </div>
                        {data.deletingId === value.id ? 'Deleting...' : ''}
                        <button onClick={() => {
                            if (value.id > 1000) {
                                dispatch(remove(value.id))
                            } else {
                                dispatch(DeleteSingleProduct(value.id))
                            }
                        }}>Delete</button>
                    </div>
                ))}
            </div>
        </>
    )
}

export default React.memo(All)


//https://pool-collision-da5.notion.site/React-Toastify-Complete-Notes-517088518d144ee39a1743bd2f9d8ea6
