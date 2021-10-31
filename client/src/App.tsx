import React, {useEffect} from 'react';
import {Route, Switch} from "react-router-dom";
import {Container} from "semantic-ui-react";
import Home from "./app/pages/Home";
import Product from "./app/pages/Product";
import LoginForm from "./app/pages/auth/LoginForm";
import {useStore} from "./app/store/store";
import {ToastContainer} from "react-toastify";
import {observer} from "mobx-react-lite";
import PrivateRoute from "./app/components/PrivateRoute";
import NavBar from "./app/pages/parts/NavBar";
import Dashboard from "./app/pages/Dashboard";
import AddProduct from "./app/pages/AddProduct";
import PublicRoute from "./app/components/PublicRoute";
import RegisterForm from "./app/pages/auth/RegisterForm";


function App() {
    const {userStore, commonStore} = useStore()
    useEffect(() => {

        if (commonStore.token) {
            userStore.getUser().finally(() => commonStore.setAppLoaded())
        } else {
            commonStore.setAppLoaded()
        }
    }, [commonStore, userStore])
    return (
        <>
            <ToastContainer position='bottom-right' hideProgressBar/>
                <div className="App">
                    <NavBar />
                    <Container style={{marginTop: '7em'}}>
                        <Switch>
                            <Route path='/' exact={true}>
                                <Home/>
                            </Route>
                            <Route path='/products/:id'>
                                <Product/>
                            </Route>
                            <PublicRoute path='/login' component={LoginForm} />
                            <PublicRoute path='/register' component={RegisterForm} />
                            <PrivateRoute exact={true} path='/dashboard' component={Dashboard} />
                            <PrivateRoute path='/dashboard/add' component={AddProduct} />
                        </Switch>
                    </Container>
                </div>
        </>
    );
}

export default observer(App);
