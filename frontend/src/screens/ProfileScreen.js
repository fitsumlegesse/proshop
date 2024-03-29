import React,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'

const ProfileScreen = ({location, history}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userDetails = useSelector((state) => state.userDetails)
    const {loading, error, user} = userDetails

    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo} = userLogin
    // const redirect = location.search ? location.search.split('=')[1] : '/'

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
    const {success} = userUpdateProfile

    useEffect(() =>{
        if(!userInfo){
            history.push('/login')
        }else{
            if(!user.name){
                dispatch(getUserDetails('profile'))
            }else{
                setName(user.name)
                setEmail(user.email)
            }
        }
        }, [dispatch,history, userInfo,user])

    const submitHandler= (e) =>{
        e.preventDefault()
        if(password !== confirmPassword ){
            setMessage('Passwords do not match')
        }else{
            dispatch(updateUserProfile({id: userInfo._id, name, email, password}))
        }

    }

    

    return (
        <Row>
        <Col md={3}>
        <h2>User Profile</h2>
            {message && <Message varient='danger'>{message}</Message>}
            {error && <Message varient='danger'>{error}</Message>}
            {success && <Message varient='success'>Success</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='name'>
                    <Form.Label> Name </Form.Label>
                    <Form.Control 
                    type='name'
                    placeHolder= "Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control 
                    type='email'
                    placeHolder= "Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                    type='password'
                    placeHolder= "Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control 
                    type='password'
                    placeHolder= "Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Button type='submit' varient='primary'>Update</Button>
            </Form>

        </Col>
        <Col md={9}>
            <h2> My Orders </h2>
        </Col>

    </Row>

    )
    

}

export default ProfileScreen
