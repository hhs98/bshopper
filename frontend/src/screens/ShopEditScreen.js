import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import FormContainer from "../components/FormContainer";
import {Button, Form} from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {listShopDetails, updateShop} from "../actions/ShopActions";
import {SHOP_UPDATE_RESET} from "../constants/ShopConstants";
import axios from "axios";

function ShopEditScreen({match, history}) {

    const shopId = match.params.id

    const [name, setName] = useState('')
    const [level, setLevel] = useState(0)
    const [image, setImage] = useState('')
    const [block, setBlock] = useState('')
    const [shop_number, setShopNumber] = useState('')
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const shopDetails = useSelector(state => state.shopDetails)
    const {shopError, shopLoading, shop} = shopDetails

    const shopUpdate = useSelector(state => state.shopUpdate)
    const {error: errorUpdate, loading: loadingUpdate, success: successUpdate} = shopUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch({type: SHOP_UPDATE_RESET})
            history.push('/admin/shoplist')
        } else {
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
        }

    }, [dispatch, shop, shopId, history, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateShop({
            id: shopId,
            name,
            level,
            image,
            block,
            shop_number,
            description
        }))
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('shop_id', shopId)

        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            const {data} = await axios.post('/api/shops/upload/', formData, config)
            setUploading(false)
            setImage(data)
        } catch (error) {
            setUploading(false)
        }
    }

    return (
        <div>
            <FormContainer>
                <h1>Shop Details</h1>
                {loadingUpdate && <Loader/>}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {shopLoading ? <Loader/> : shopError ? <Message variant='danger'>{shopError}</Message> : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Enter name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='image'>
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter image'
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            >
                            </Form.Control>
                            <Form.File
                                id='image-file'
                                label='Choose File'
                                custom
                                onChange={uploadFileHandler}
                            >
                            </Form.File>
                            {uploading && <Loader/>}

                        </Form.Group>

                        <Form.Group controlId='price'>
                            <Form.Label>Level</Form.Label>
                            <Form.Control

                                type='number'
                                placeholder='Enter price'
                                value={level}
                                onChange={(e) => setLevel(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='brand'>
                            <Form.Label>Block</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter brand'
                                value={block}
                                onChange={(e) => setBlock(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='countinstock'>
                            <Form.Label>Shop Number</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter stock'
                                value={shop_number}
                                onChange={(e) => setShopNumber(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='description'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control

                                type='text'
                                placeholder='Enter description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>


                        <Button type='submit' variant='info'>
                            Update
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </div>
    )
}

export default ShopEditScreen