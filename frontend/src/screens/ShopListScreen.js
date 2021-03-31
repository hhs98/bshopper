import React, {useEffect} from 'react';
import Loader from "../components/Loader";
import Message from "../components/Message";
import {Button, Card, Col, Row, Table} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {SHOP_CREATE_RESET} from "../constants/ShopConstants";
import {createShop, deleteShop, listShops} from "../actions/ShopActions";

function ShopListScreen({history, match}) {
    const dispatch = useDispatch()

    const shopList = useSelector(state => state.shopList)
    const {loading, error, shops} = shopList

    const shopDelete = useSelector(state => state.shopDelete)
    const {loading: loadingDelete, error: errorDelete, success: successDelete} = shopDelete

    const shopCreate = useSelector(state => state.shopCreate)
    const {loading: loadingCreate, error: errorCreate, success: successCreate, shop: createdShop} = shopCreate

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin


    useEffect(() => {
        dispatch({type: SHOP_CREATE_RESET})
        if (!userInfo.isAdmin) {
            history.push('/login')
        }

        if (successCreate) {
            history.push(`/admin/shop/${createdShop.id}/edit`)
        } else {
            dispatch(listShops())
        }

    }, [dispatch, history, userInfo, successDelete, successCreate, createdShop])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this shop?')) {
            dispatch(deleteShop(id))
        }
    }

    const createShopHandler = () => {
        dispatch(createShop())
    }
    return (
        <div>
            <Row className='align-items-center'>
                <Col>
                    <h1>Shops</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createShopHandler}><i className='fas fa-plus-circle'></i> Create
                        Shop</Button>
                </Col>
            </Row>
            {loadingDelete && <Loader/>}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {loadingCreate && <Loader/>}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
            {loading
                ? <Loader/>
                : error
                    ? <Message variant='danger'>{error}</Message>
                    : (
                        <Card>
                            <Card.Body>
                                <Table striped bordered hover responsive className='table-sm'>
                                    <thead>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>LEVEL</th>
                                    <th>BLOCK</th>
                                    <th>SHOP NUMBER</th>
                                    <th></th>
                                    </thead>
                                    <tbody>
                                    {shops.map(shop => (
                                        <tr key={shop.id}>
                                            <td>{shop.id}</td>
                                            <td>{shop.name}</td>
                                            <td>{shop.level}</td>
                                            <td>{shop.block}</td>
                                            <td>{shop.shop_number}</td>
                                            <td>
                                                <LinkContainer to={`/admin/shop/${shop.id}/edit`}>
                                                    <Button variant='light' className='btn-sm'>
                                                        <i className="fas fa-edit"></i>
                                                    </Button>
                                                </LinkContainer>
                                                <Button variant='danger' className='btn-sm'
                                                        onClick={() => deleteHandler(shop.id)}>
                                                    <i className="fas fa-trash"></i>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    )
            }
        </div>
    )
}

export default ShopListScreen;