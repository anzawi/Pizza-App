import React from "react";
import {Button, Dropdown, Menu} from "semantic-ui-react";
import {NavLink} from "react-router-dom";
import {useStore} from "../../store/store";
import {observer} from "mobx-react-lite";



function NavBar() {

    //const {userStore} = useStore()
    const {userStore: {user, isLogin, logout}} = useStore()

    return (
        <nav className='main-nav'>
            <Menu size='large'>
                <Menu.Item
                    as={NavLink}
                    to='/'
                    name='home'
                />
                {
                    isLogin
                        ? <Menu.Item as={NavLink} to='/dashboard' name='dashboard'/>
                        : null

                }

                <Menu.Menu position='right'>
                    {
                        isLogin
                        ? (
                                <Dropdown item text={user?.name}>
                                    <Dropdown.Menu>
                                        <Dropdown.Item as={NavLink} to='/dashboard'>Dashboard</Dropdown.Item>
                                        <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            )
                            : null
                    }

                    {
                        !isLogin
                        ?(
                                <Menu.Item>
                                    <Button.Group>
                                        <Button as={NavLink} to='/login'>Login</Button>
                                        <Button.Or />
                                        <Button as={NavLink} to='/register' positive>Register</Button>
                                    </Button.Group>
                                </Menu.Item>
                            )
                            : null
                    }
                </Menu.Menu>
            </Menu>
        </nav>
    )
}


export default observer(NavBar)