import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'semantic-ui-css/semantic.min.css'
import 'react-toastify/dist/ReactToastify.min.css'
import './App.css'
import {store, StoreContext} from "./app/store/store";
import {createBrowserHistory} from 'history'
import {Router} from "react-router-dom";

export const history = createBrowserHistory()

ReactDOM.render(
    <StoreContext.Provider value={store}>
       <Router history={history}>
           <App />
       </Router>
    </StoreContext.Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
