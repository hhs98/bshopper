import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {Button, Card, Col, Image, Row} from "react-bootstrap";
import {listShopDetails} from "../actions/ShopActions";
import {createProduct, listProducts} from "../actions/ProductActions";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {PRODUCT_CREATE_RESET} from "../constants/ProductConstants";
import Paginate from "../components/Paginate";

function ShopScreen({match, history}) {
    const shopId = match.params.id
    const [name, setName] = useState('')
    const [level, setLevel] = useState(0)
    const [image, setImage] = useState('')
    const [block, setBlock] = useState('')
    const [shop_number, setShopNumber] = useState('')
    const [description, setDescription] = useState('')

    const dispatch = useDispatch();

    const shopDetails = useSelector((state) => state.shopDetails);
    const {shopError, shopLoading, shop} = shopDetails;

    const productList = useSelector((state) => state.productList);
    const {error, loading, products, page, pages} = productList;

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const productCreate = useSelector(state => state.productCreate)
    const {loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct} = productCreate

    let keyword = history.location.search
    keyword = keyword.substring(9)

    useEffect(() => {
        dispatch({type: PRODUCT_CREATE_RESET})
        if (!shop.name || shop.id !== Number(shopId)) {
            dispatch(listShopDetails(shopId))
        } else {
            setName(shop.name)
            setLevel(shop.level)
            setImage(shop.image)
            setBlock(shop.block)
            setShopNumber(shop.shop_number)
            setDescription(shop.description)
        }
        if (successCreate) {
            history.push(`/admin/product/${createdProduct.id}/edit`)
        } else {
            dispatch(listProducts(match.params.id, keyword));
        }
    }, [dispatch, match, history, successCreate, createdProduct, keyword, shopId, shop]);

    const createProductHandler = () => {
        dispatch(createProduct(shopId))
    }

    return (
        <div>
            <Link to="/" className="btn btn-light my-3">
                <i className='fa fa-home'></i> Go Home
            </Link>
            {shopLoading ? <Loader/> : shopError ? <Message variant='danger'>{shopError}</Message> : (
                <Card>
                    <Card.Body>
                        <Row>
                            <Col md={3}>
                                <Image src={image} alt={name} fluid/>
                            </Col>

                            <Col md={9}>
                                <h1>{name}</h1>

                                <p>{description}</p>
                                <Card.Text as="p">
                                    Level: {level}, Block: {block}, Shop:{" "}
                                    {shop_number}
                                </Card.Text>
                                <Card.Text as="p" className='text-right'>
                                    {userInfo && userInfo.id === shop.user &&
                                    <span>Add Product <Button variant='primary' className='btn-circle btn-xl'
                                                              onClick={createProductHandler}>
                                        <i className='fas fa-plus-circle'></i></Button></span>}
                                </Card.Text>

                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            )}
            <div>
                {loading ? (
                    <Loader/>
                ) : error ? (
                    <Message variant="danger">{error}</Message>
                ) : (
                    <div>
                        <Row>
                            {products.map((product) => (
                                <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                                    <Product product={product}/>
                                </Col>
                            ))}
                        </Row>
                        <Paginate shopId={match.params.id} page={page} pages={pages} isShop={true}/>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ShopScreen;
