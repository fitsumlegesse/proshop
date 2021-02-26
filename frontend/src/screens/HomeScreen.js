import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Products from '../components/Product'
import products from '../products'

const HomeScreen = () => {
    return (
        <>
            <h1>Latest products</h1>
            <Row>
                {products.map(product=>(

                    <Col sm={12} md={6} lg={4} xl={3}>
                        <Products product={product} />
                    </Col>
                ))}

            </Row>
        </>
    )
}

export default HomeScreen
