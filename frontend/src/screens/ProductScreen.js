import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import  Rating from '../components/Rating'
import axios from 'axios'

const ProductScreen = ({match}) => {

    //has something to do with state 
   const [product, setProduct] = useState({})

   //What exactly is the useEffect
   useEffect(()=>{

       //Fetching a particular product using an It's id from the URL
    const fetchProduct = async () =>{
        const { data } = await axios.get(`/api/products/${match.params.id}`)
        
        //What exactly is a match?
        setProduct(data)
    }

    fetchProduct()


    },[match])

    return( 
    // Dispays the paticular product grabbed by the above function
    <>
    <Link className='btn btn-dark my-3' to='/'> 
        {/* {product.name} */}
            Go Back
    </Link>
     <Row>
         <Col md={6}>
             <Image src={product.image} alt={product.name} fluid/>
         </Col>
         <Col md={3}>
             <ListGroup varient='flush'>
                 <ListGroup.Item>
                     <h3>{product.name}</h3>
                 </ListGroup.Item>
                 <ListGroup.Item>
                    <Rating 
                        value ={product.rating}
                        text={`${product.numReviews} reviews`}
                    />
                 </ListGroup.Item>
                 <ListGroup.Item>
                     Price: ${product.price}
                 </ListGroup.Item>
                 <ListGroup.Item>
                     Description: ${product.description}
                 </ListGroup.Item>
                 
             </ListGroup>
         </Col>
         <Col md={3}>
             <Card>
                 <ListGroup varient='flush'>
                     <ListGroup.Item>
                         <Row>
                             <Col>
                                Price:
                             </Col>
                             <Col>
                                <strong>{product.price}</strong>
                             </Col>
                         </Row>
                     </ListGroup.Item>

                     <ListGroup.Item>
                         <Row>
                             <Col>
                                Status
                             </Col>
                             {product.countInStock > 0 ? 'In Stock' : 'Out of stock'}
                             <Col>
                             <strong>{product.price}</strong>
                             </Col>
                         </Row>
                     </ListGroup.Item>

                     <ListGroup>
                         <Button 
                         class='btn-block' 
                         type='button'
                         disabled={product.countInStock === 0}
                         
                         >
                             Add To Cart
                         </Button>
                     </ListGroup>

                 </ListGroup>
             </Card>
         </Col>
     </Row>
    
    
    
    
    
    </>
    )
    
}

export default ProductScreen