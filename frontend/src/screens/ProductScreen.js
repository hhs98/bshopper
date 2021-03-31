import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Button, Card, Col, Form, Image, ListGroup, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {createProductReview, deleteProduct, listProductDetails} from "../actions/ProductActions";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {PRODUCT_CREATE_REVIEW_RESET} from "../constants/ProductConstants";
import {LinkContainer} from "react-router-bootstrap";

function ProductScreen({match, history}) {
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const dispatch = useDispatch();

    const productDetails = useSelector((state) => state.productDetails);
    const {error, loading, product} = productDetails;

    const userLogin = useSelector((state) => state.userLogin);
    const {userInfo} = userLogin;

    const productDelete = useSelector(state => state.productDelete)
    const {loading: loadingDelete, error: errorDelete, success: successDelete} = productDelete

    const productReviewCreate = useSelector((state) => state.productReviewCreate);
    const {
        error: errorProductReview,
        loading: loadingProductReview,
        success: successProductReview
    } = productReviewCreate;

    useEffect(() => {
        if (successProductReview) {
            setRating(0)
            setComment('')
            dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
        }
        dispatch(listProductDetails(match.params.id));
    }, [dispatch, match, successProductReview, successDelete]);

    const addToFavouriteHandler = () => {
        history.push(`/favourites/${match.params.id}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(
            match.params.id, {
                rating,
                comment
            }
        ))
    }

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            dispatch(deleteProduct(id))
        }
    }

    return (
        <div>
            {loadingDelete && <Loader/>}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {loading ? (
                <Loader/>
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <div>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col md={6}>
                                    <Image src={product.image} alt={product.name} fluid/>
                                </Col>
                                <Col md={3}>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <h4>{product.name}</h4>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Rating
                                                value={product.rating}
                                                text={`${product.numReviews} reviews`}
                                                color={"#f8e825"}
                                            />
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            {product.description}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                                <Col md={3}>
                                    <Card>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Price:</Col>
                                                    <Col>
                                                        <strong>{product.price} Tk</strong>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Status:</Col>
                                                    <Col>
                                                        {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Button
                                                    onClick={addToFavouriteHandler}
                                                    className="btn-block"
                                                    disabled={product.countInStock == 0}
                                                    type="button"
                                                >
                                                    Add to Favourites
                                                </Button>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Link to={`/shop/${product.shop}`}>
                                                    <Button variant='light' className='btn-lg btn-block'>
                                                        <i className='fas fa-shopping-cart'></i> Go To Seller
                                                    </Button>
                                                </Link>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card>
                                    {userInfo && userInfo.id === product.owner &&
                                    <div className='my-3'>
                                        <LinkContainer to={`/admin/product/${product.id}/edit`}>
                                            <Button variant='light' className='btn-sm mr-3'>
                                                <i className="fas fa-edit"></i>
                                            </Button>
                                        </LinkContainer>
                                        <Button variant='danger' className='btn-sm'
                                                onClick={() => deleteHandler(product.id)}>
                                            <i className="fas fa-trash"></i>
                                        </Button>
                                    </div>
                                    }
                                </Col>
                            </Row>

                        </Card.Body>
                    </Card>
                    <Card className='mt-3'>
                        <Card.Body>
                            <Row>
                                <Col md={6}>
                                    <h4>REVIEWS</h4>
                                    {product.reviews.length === 0 && <Message variant='info'>No Reviews</Message>}
                                    <ListGroup variant='flush'>
                                        {product.reviews.map((review) => (
                                            <ListGroup.Item key={review.id}>
                                                <strong>{review.name}</strong>
                                                <Rating value={review.rating} color='#f8e825'></Rating>
                                                <p>{review.createdAt.substring(0, 10)}</p>
                                                <p>{review.comment}</p>
                                            </ListGroup.Item>
                                        ))}
                                        <ListGroup.Item>
                                            <h4>Write A Review</h4>
                                            {loadingProductReview && <Loader/>}
                                            {successProductReview && <Message variant='info'>Review Submitted</Message>}
                                            {errorProductReview &&
                                            <Message variant='danger'>{errorProductReview}</Message>}
                                            {userInfo ? (
                                                <Form>
                                                    <Form.Group controlId='rating'>
                                                        <Form.Label>Rating</Form.Label>
                                                        <Form.Control
                                                            as='select'
                                                            value={rating}
                                                            onChange={(e) => setRating(e.target.value)}
                                                        >
                                                            <option value="">Select...</option>
                                                            <option value="1">1 - Poor</option>
                                                            <option value="2">2 - Fair</option>
                                                            <option value="3">3 - Good</option>
                                                            <option value="4">4 - Very Good</option>
                                                            <option value="5">5 - Excellent</option>
                                                        </Form.Control>
                                                    </Form.Group>
                                                    <Form.Group controlId='comment'>
                                                        <Form.Label>Review</Form.Label>
                                                        <Form.Control
                                                            as='textarea'
                                                            rows='5'
                                                            value={comment}
                                                            onChange={(e) => setComment(e.target.value)}
                                                        >

                                                        </Form.Control>
                                                    </Form.Group>
                                                    <Button
                                                        disabled={loadingProductReview}
                                                        type='submit'
                                                        variant='primary'
                                                        onClick={submitHandler}
                                                    >SUBMIT
                                                    </Button>
                                                </Form>
                                            ) : (
                                                <Message variant='info'>
                                                    Please <Link to='/login'>Login</Link> to write a review
                                                </Message>
                                            )}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </div>
            )}
        </div>
    );
}

export default ProductScreen;
