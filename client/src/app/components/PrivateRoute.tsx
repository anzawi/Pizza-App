import React from "react";
import {Redirect, Route} from "react-router-dom";

interface Props {
    path: string
    component: any
    exact?: boolean
}

export default function PrivateRoute(props: Props) {
    return (
        <>
            {
                window.localStorage.getItem('jwt') !== null
                    ? (<Route {...props} />)
                    : <Redirect to='/login' />
            }
            </>
    )
}