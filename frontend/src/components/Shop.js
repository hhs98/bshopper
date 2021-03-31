import React from "react";
import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";

function Shop({shop}) {
    return (
        <Card className="my-3 p-3">
            <Link to={`/shop/${shop.id}`}>
                <Card.Img src={shop.image}/>
            </Link>

            <Card.Body>
                <Link to={`/shop/${shop.id}`}>
                    <Card.Title as="div">
                        <strong>{shop.name}</strong>
                    </Card.Title>
                </Link>
                <Card.Text as="p">Level: {shop.level}, Block: {shop.block}</Card.Text>
                <Card.Text as="p">Shop Number: {shop.shop_number}</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Shop;
