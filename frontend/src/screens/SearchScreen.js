import React, {useEffect} from 'react';
import Loader from "../components/Loader";
import Message from "../components/Message";
import {listProducts} from "../actions/ProductActions";
import {useDispatch, useSelector} from "react-redux";
import {Col, Row} from "react-bootstrap";
import Product from "../components/Product";
import Paginate from "../components/Paginate";

function SearchScreen({history}) {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const {error, loading, products, page, pages} = productList;

    let keyword = history.location.search
    keyword = keyword.substring(9)

    useEffect(() => {
        dispatch(listProducts('', keyword));
    }, [dispatch, keyword]);
    return (
        <div>
            {keyword ?
                (
                    <h1>Search Results for {keyword.split("&")[0]}</h1>
                ) : (
                    <h1>All products</h1>
                )}

            {loading ? (
                <Loader/>
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <div>
                    <Row>
                        {products.length === 0 && <Col><Message variant="danger">No Products Found</Message></Col>}
                        {products.map((product) => (
                            <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product}/>
                            </Col>
                        ))}
                    </Row>
                    <Paginate page={page} pages={pages} keyword={keyword}/>
                </div>
            )}
        </div>
    );
}

export default SearchScreen;