import React,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'


// This is the login screen 
// not sure what the location and history paras are?
const LoginScreen = ({location, history}) => {
    // we are setting the email and pw of the user to the
    //state 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // Using dispatch from redux 
    const dispatch = useDispatch()
    
    // we are selecting the userLogin state storing 
    // loading, error and userLogin it it 
    const userLogin = useSelector(state => state.userLogin)
    
    //here from userLogin, loading sta, error and userinfo
    //will be in their appropriate variables
    const {loading, error, userInfo} = userLogin
   
    //Not sure about this redirect 
    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() =>{
        //if userInfo exists, we redirect 
        if(userInfo){
            history.push(redirect)
        } // not sure about the below block of code 
        }, [history, userInfo, redirect])
    
        // when we click submit on the btton 
        // we dispatch the login action with the email
        //pw we got from the usrInfo state 
    const submitHandler= (e) =>{
        e.preventDefault()
        dispatch(login(email, password))
    }

    

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message varient='danger'>{error}</Message>}
            {loading && <Loader/>}
            
            
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control 
                    type='email'
                    placeHolder= "Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                    type='password'
                    placeHolder= "Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Button type='submit' varient='primary'>Sign In</Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    New Customer?{' '} 
                    <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                        Register 
                    </Link>
                </Col>
            </Row>

        </FormContainer>
    )
}

export default LoginScreen
