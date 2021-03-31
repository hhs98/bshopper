import {Container} from "react-bootstrap";
import {HashRouter as Router, Route} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import HomeScreen from "./screens/HomeScreen";
import ShopScreen from "./screens/ShopScreen";
import ProductScreen from "./screens/ProductScreen";
import FavouriteScreen from "./screens/FavouriteScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import SearchScreen from "./screens/SearchScreen";
import ShopListScreen from "./screens/ShopListScreen";
import ShopEditScreen from "./screens/ShopEditScreen";

function App() {
    return (
        <div className="wrapper">
            <Router>
                <Header/>
                <main className="py-3">
                    <Container>
                        <Route path='/' component={HomeScreen} exact/>
                        <Route path='/search' component={SearchScreen} exact/>
                        <Route path='/login' component={LoginScreen}/>
                        <Route path='/register' component={RegisterScreen}/>
                        <Route path='/profile' component={ProfileScreen} exact/>
                        <Route path='/shop/:id' component={ShopScreen}/>
                        <Route path='/product/:id' component={ProductScreen} props={ShopScreen}/>
                        <Route path='/favourites/:id?' component={FavouriteScreen}/>

                        <Route path='/admin/userlist' component={UserListScreen}/>
                        <Route path='/admin/user/:id/edit' component={UserEditScreen}/>

                        <Route path='/admin/productlist' component={ProductListScreen}/>
                        <Route path='/admin/product/:id/edit' component={ProductEditScreen}/>

                        <Route path='/admin/shoplist' component={ShopListScreen}/>
                        <Route path='/admin/shop/:id/edit' component={ShopEditScreen}/>
                    </Container>
                </main>
                <Footer/>
            </Router>
        </div>
    );
}

export default App;
