import React, {useEffect, useState} from "react";
import {Button, Card, Col, Form, Image, ListGroup, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {getUserDetails, updateUserProfile} from "../actions/usersActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {USER_UPDATE_PROFILE_RESET} from "../constants/userConstants";
import {createShop, deleteShop, listShops} from "../actions/ShopActions";
import {Link} from "react-router-dom";
import {LinkContainer} from "react-router-bootstrap";

function ProfileScreen({history}) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const dispatch = useDispatch()
    const userDetails = useSelector(state => state.userDetails)
    const {error, loading, user} = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const shopList = useSelector((state) => state.shopList);
    const {shops} = shopList;

    const shopDelete = useSelector(state => state.shopDelete)
    const {loading: loadingDelete, error: errorDelete, success: successDelete} = shopDelete

    const shopCreate = useSelector(state => state.shopCreate)
    const {loading: loadingCreate, error: errorCreate, success: successCreate, shop: createdShop} = shopCreate

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {success} = userUpdateProfile

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user || !user.name || success || userInfo.id !== user.id) {
                dispatch({type: USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails('profile'))
            } else {
                setName(user.name)
                setEmail(user.email)
            }
            if (successCreate) {
                history.push(`/admin/shop/${createdShop.id}/edit`)
            } else {
                dispatch(listShops(userInfo.id))
            }
        }
    }, [dispatch, history, userInfo, user, success, successDelete, successCreate, createdShop])

    const submitHandler = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(updateUserProfile({
                'id': user.id,
                'name': name,
                'email': email,
                'password': password
            }))
            setMessage('')
        }
    }

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this shop?')) {
            dispatch(deleteShop(id))
        }
    }

    const createShopHandler = () => {
        dispatch(createShop())
    }

    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader/>}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            required
                            type='name'
                            placeholder='Enter Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        >

                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            required
                            type='email'
                            placeholder='Enter Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        >

                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Enter Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        >

                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='passwordConfirm'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        >

                        </Form.Control>
                    </Form.Group>
                    <Button type='submit' variant='primary'>
                        Update
                    </Button>
                </Form>
            </Col>

            <Col md={9}>
                <div className='d-flex justify-content-between mb-3'>
                    <h2>My Shops</h2>
                    <Button onClick={createShopHandler} variant='primary' className='btn-sm'>
                        <i className='fas fa-plus-circle'></i> Create New Shop
                    </Button>
                </div>
                {shops.length === 0 ? (
                    <Message variant="info">
                        You don't have any shops yet!
                    </Message>
                ) : (
                    <Card>
                        <Card.Body>
                            <ListGroup variant="flush">
                                {shops.map((shop) => (
                                    <ListGroup.Item key={shop.product}>
                                        <Row className="align-items-center">
                                            <Col md={2}>
                                                <Image src={shop.image} alt={shop.name} fluid/>
                                            </Col>
                                            <Col md={8}>
                                                <Link to={`/shop/${shop.id}`}><h3>{shop.name}</h3></Link>
                                            </Col>

                                            <Col md={2}>
                                                <LinkContainer to={`/admin/shop/${shop.id}/edit`}>
                                                    <Button variant='dark' className='btn-sm mr-3'>
                                                        <i className="fas fa-edit"></i>
                                                    </Button>
                                                </LinkContainer>
                                                <Button variant='danger' className='btn-sm'
                                                        onClick={() => deleteHandler(shop.id)}><i
                                                    className='fa fa-trash'></i></Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                )}
            </Col>
        </Row>
    )
}

export default ProfileScreen