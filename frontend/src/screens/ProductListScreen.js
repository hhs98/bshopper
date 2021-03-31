import React, {useEffect} from 'react';
import Loader from "../components/Loader";
import Message from "../components/Message";
import {Button, Card, Col, Row, Table} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {createProduct, deleteProduct, listProducts} from "../actions/ProductActions";
import {PRODUCT_CREATE_RESET} from "../constants/ProductConstants";
import Paginate from "../components/Paginate";

function ProductListScreen({history, match}) {
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const {loading, error, products, page, pages} = productList

    const productDelete = useSelector(state => state.productDelete)
    const {loading: loadingDelete, error: errorDelete, success: successDelete} = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const {loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct} = productCreate

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    let keyword = history.location.search
    keyword = keyword.substring(9)

    useEffect(() => {
        dispatch({type: PRODUCT_CREATE_RESET})
        if (!userInfo.isAdmin) {
            history.push('/login')
        }

        if (successCreate) {
            history.push(`/admin/product/${createdProduct.id}/edit`)
        } else {
            dispatch(listProducts('', keyword))
        }

    }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct, keyword])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            dispatch(deleteProduct(id))
        }
    }

    const createProductHandler = () => {
        dispatch(createProduct(''))
    }
    return (
        <div>
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createProductHandler}><i className='fas fa-plus'></i> Create
                        Product</Button>
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
                                    <th>PRICE</th>
                                    <th>SHOP NAME</th>
                                    <th></th>
                                    </thead>
                                    <tbody>
                                    {products.map(product => (
                                        <tr key={product.id}>
                                            <td>{product.id}</td>
                                            <td>{product.name}</td>
                                            <td>{product.price} Tk.</td>
                                            <td>{product.shopName}</td>
                                            <td>
                                                <LinkContainer to={`/admin/product/${product.id}/edit`}>
                                                    <Button variant='light' className='btn-sm'>
                                                        <i className="fas fa-edit"></i>
                                                    </Button>
                                                </LinkContainer>
                                                <Button variant='danger' className='btn-sm'
                                                        onClick={() => deleteHandler(product.id)}>
                                                    <i className="fas fa-trash"></i>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </Table>
                                <Paginate pages={pages} page={page} isAdmin={true}/>
                            </Card.Body>
                        </Card>
                    )
            }
        </div>
    )
}

export default ProductListScreen;