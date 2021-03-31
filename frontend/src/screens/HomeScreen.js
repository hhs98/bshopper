import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Col, Row} from "react-bootstrap";
import Shop from "../components/Shop";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {listShops} from "../actions/ShopActions";
import ProductCarousel from "../components/ProductCarousel";

function HomeScreen() {
    const dispatch = useDispatch();
    const shopList = useSelector((state) => state.shopList);
    const {error, loading, shops} = shopList;

    useEffect(() => {
        dispatch(listShops());
    }, [dispatch]);

    const listShopsHandler = (level) => {
        dispatch(listShops('', level));
    }

    return (
        <div>
            <ProductCarousel/>
            <div className="my-5 d-flex justify-content-between">
                <Button variant="dark" onClick={() => listShopsHandler('')}>All <i
                    className='fas fa-building'></i></Button>{' '}
                <Button variant="primary" onClick={() => listShopsHandler(1)}>Level 1</Button>{' '}
                <Button variant="secondary" onClick={() => listShopsHandler(2)}>Level 2</Button>{' '}
                <Button variant="success" onClick={() => listShopsHandler(3)}>Level 3</Button>{' '}
                <Button variant="warning" onClick={() => listShopsHandler(4)}>Level 4</Button>{' '}
                <Button variant="danger" onClick={() => listShopsHandler(5)}>Level 5</Button>{' '}
                <Button variant="info" onClick={() => listShopsHandler(6)}>Level 6</Button>
            </div>
            {loading ? (
                <Loader/>
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : shops.length === 0 ? (
                    <Message variant='danger'>No Shops Found</Message>
                )
                : (
                    <Row>
                        {shops.map((shop) => (
                            <Col key={shop.id} sm={12} md={6} lg={4} xl={3}>
                                <Shop shop={shop}/>
                            </Col>
                        ))}
                    </Row>
                )}
        </div>
    );
}

export default HomeScreen;
