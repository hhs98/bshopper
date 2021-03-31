import React from "react";
import {Container, Image, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../actions/usersActions";
import SearchBox from "./SearchBox";
import logo from '../images/logo.png';

function Header() {

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <div>
            <header>
                <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                    <Container>
                        <LinkContainer to="/">
                            <Navbar.Brand>
                                <Image src={logo} fluid width='200'></Image>
                            </Navbar.Brand>
                        </LinkContainer>
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <SearchBox/>
                            <Nav className="ml-auto">
                                <LinkContainer to="/favourites">
                                    <Nav.Link><i className="fas fa-heart"></i> Favourites</Nav.Link>
                                </LinkContainer>

                                {userInfo ? (
                                    <NavDropdown id='username' title={userInfo.name}>
                                        <LinkContainer to='/profile'>
                                            <NavDropdown.Item><i
                                                className='fas fa-user'></i> Profile</NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Item onClick={logoutHandler}><i
                                            className='fas fa-power-off'></i> Logout</NavDropdown.Item>
                                    </NavDropdown>
                                ) : (
                                    <LinkContainer to="/login">
                                        <Nav.Link><i className="fas fa-user"></i> Login</Nav.Link>
                                    </LinkContainer>
                                )}
                                {userInfo && userInfo.isAdmin && (
                                    <NavDropdown id='adminmenu' title='Admin'>
                                        <LinkContainer to='/admin/userlist'>
                                            <NavDropdown.Item><i className='fa fa-users'></i> Users</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to='/admin/shoplist'>
                                            <NavDropdown.Item><i
                                                className='fa fa-shopping-cart'></i> Shops</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to='/admin/productlist'>
                                            <NavDropdown.Item><i
                                                className='fa fa-coffee'></i> Products</NavDropdown.Item>
                                        </LinkContainer>
                                    </NavDropdown>
                                )}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
        </div>
    );
}

export default Header;
