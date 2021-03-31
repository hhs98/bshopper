import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {useHistory} from "react-router-dom";

function SearchBox() {
    const [keyword, setKeyword] = useState('')

    let history = useHistory()

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword) {
            history.push(`/search/?keyword=${keyword}&page=1`)
        } else {
            history.push(history.push(history.location.pathname))
        }
    }
    return (
        <Form onSubmit={submitHandler} inline>
            <Form.Control
                type='text'
                name='q'
                placeholder='Search Products'
                onChange={(e) => setKeyword(e.target.value)}
                className='mr-sm-2 ml-sm-5'
            >

            </Form.Control>
            <Button
                type='submit'
                variant='light'
                className='p-2 btn-sm'
            ><i className='fas fa-search'> </i> Search
            </Button>
        </Form>
    );
}

export default SearchBox;