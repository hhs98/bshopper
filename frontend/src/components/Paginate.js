import React from 'react';
import {Pagination} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'

function Paginate({pages, page, keyword = '', isAdmin = false, isShop = false, shopId = ''}) {

    if (keyword) {
        keyword = keyword.split('&')[0]
    }

    return (
        pages > 1 && (
            <Pagination>
                {[...Array(pages).keys()].map((x) => (
                    <LinkContainer
                        key={x + 1}
                        to={isShop ? `/shop/${shopId}/?keyword=${keyword}&page=${x + 1}`
                            : isAdmin ? `/admin/productlist/?keyword=${keyword}&page=${x + 1}`
                                : `/search/?keyword=${keyword}&page=${x + 1}`}
                    >
                        <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
                    </LinkContainer>
                ))}
            </Pagination>
        )
    );
}

export default Paginate;