import axios from 'axios'
import {CART_ADD_ITEM} from '../constants/cartConstants'

//The addTocart function below has a para id and quantity and an sync function of dispatch 
// That dispatches a reducer 
export const addToCart = (id, qty)=> async(dispatch, getState)=>{
    
    // Below the data var make a request to an api with a specific product id 
    //It will then have all the datas for that product
    const {data} = await axios.get(`/api/products/${id}`)

    // we then dispath the data grabbed by the above request to the reducer
    dispatch({
        payload :{
            product:data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty,
        },
    })


    //we then set the local storage to store the data in a string format
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
