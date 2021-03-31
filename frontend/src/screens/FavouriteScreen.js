import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Button, Card, Col, Image, ListGroup, Row,} from "react-bootstrap";
import Message from "../components/Message";

import {addToFavourite, removeFromFavourite} from "../actions/favouriteActions";

function FavouriteScreen({match, location, history}) {
    const productId = match.params.id;

    const dispatch = useDispatch();

    const favourite = useSelector((state) => state.favourite);
    const {favouriteItems} = favourite;

    useEffect(() => {
        if (productId) {
            dispatch(addToFavourite(productId));
        }
    }, [dispatch, productId]);

    const removeFromFavouriteHandler = (id) => {
        dispatch(removeFromFavourite(id));
    }

    return (
        <Row>
            <Col md={8}>
                <h1>Your Favourites</h1>
                {favouriteItems.length === 0 ? (
                    <Message variant="info">
                        Oops! Nothig is here yet <Link to="/">Go Back</Link>
                    </Message>
                ) : (
                    <Card>
                        <Card.Body>
                            <ListGroup variant="flush">
                                {favouriteItems.map((item) => (
                                    <ListGroup.Item key={item.product}>
                                        <Row className="align-items-center">
                                            <Col md={3}>
                                                <Image src={item.image} alt={item.name} fluid/>
                                            </Col>
                                            <Col md={6}>
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </Col>
                                            <Col md={2}>${item.price}</Col>

                                            <Col md={1}>
                                                <Button
                                                    type="button"
                                                    variant="light"
                                                    onClick={() => removeFromFavouriteHandler(item.product)}
                                                >
                                                    <i className="fa fa-trash"></i>
                                                </Button>
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
    );
}

export default FavouriteScreen;
