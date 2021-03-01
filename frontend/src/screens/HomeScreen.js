import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Products from '../components/Product'
import axios from 'axios'


const HomeScreen = () => {

    // Has something to do with state
    const [products, setProducts] = useState([])

        useEffect(()=>{
            //Feteches a product from the backend by making a get request using axios
            const fetchProducts = async () =>{
                const { data } = await axios.get('/api/products')
                
                setProducts(data)
            }

            fetchProducts()


        },[])

    return (
        <>
            //Goes thru the object and displays all the products by utilizing the product component 
            
            <h1>Latest products</h1>
            <Row>
                {products.map( product=>(

                    <Col sm={12} md={6} lg={4} xl={3}>

                        <Products product={product} />
                    </Col>
                ))}

            </Row>
        </>
    )
}

export default HomeScreen
