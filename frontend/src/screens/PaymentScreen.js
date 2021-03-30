import React,{ useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'


const PaymentScreen = ({ history }) => {
    
    // we are getting the cart state from the global state using useSelector 
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    if(!shippingAddress){history.push('/shipping')}

    const [ paymentMethod, setPaymentMethod ] = useState('PayPal')
    
    // here we are using useDispatch from reat redux
    const dispatch = useDispatch()


    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3/>
            <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label as="legend">Select Method</Form.Label>
            </Form.Group>
            <Col>
                <Form.Check
                type='radio'
                label='PayPal or Credit Card'
                id='PayPal'
                name="paymentMethod"
                value='PayPal'
                checked
                onChange={(e)=> setPaymentMethod(e.target.value)}
                ></Form.Check>
            </Col>
            <br/>
            <Button type='submit' varient='primary'> Continue </Button>

        </Form>
        </FormContainer>
    )
}

export default PaymentScreen
