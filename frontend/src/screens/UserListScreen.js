import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteUser, listUsers} from "../actions/usersActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {Button, Card, Table} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";

function UserListScreen({history}) {

    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)
    const {loading, error, users} = userList

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const {success: successDelete} = userDelete

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers())
        } else {
            history.push('/login')
        }

    }, [dispatch, history, userInfo, successDelete])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            dispatch(deleteUser(id))
        }
    }

    return (
        <div>
            <h1>Users</h1>
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
                                    <th>EMAIL</th>
                                    <th>ADMIN</th>
                                    <th></th>
                                    </thead>
                                    <tbody>
                                    {users.map(user => (
                                        <tr key={user.id}>
                                            <td>{user.id}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.isAdmin ? (
                                                    <i className='fas fa-check' style={{color: "green"}}></i>) :
                                                (<i className='fas fa-check' style={{color: "red"}}></i>)
                                            }</td>
                                            <td>
                                                <LinkContainer to={`/admin/user/${user.id}/edit`}>
                                                    <Button variant='light' className='btn-sm'>
                                                        <i className="fas fa-edit"></i>
                                                    </Button>
                                                </LinkContainer>
                                                <Button variant='danger' className='btn-sm'
                                                        onClick={() => deleteHandler(user.id)}>
                                                    <i className="fas fa-trash"></i>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    )
            }

        </div>
    );
}

export default UserListScreen;