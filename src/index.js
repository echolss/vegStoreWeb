import { createStore,applyMiddleware, compose } from 'redux';//compose可以组合函数
import thunk from 'redux-thunk';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import reducer  from './redux/reducers/reducer';
import { BrowserRouter as Router } from 'react-router-dom';
import './config';
import Home from './Home';
import './index.css';



const reduxDevtools = window.devToolsExtension ? window.devToolsExtension() : f=>f;
//1、新建store，传入reducer
 const store = createStore(
     reducer,
     compose(applyMiddleware(thunk),reduxDevtools)
 );

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Home/>
        </Router>
    </Provider>,
    document.getElementById('root')
)
/*
renderToNodeStream:

ReactDOM.hydrate(
    <Provider store={store}>
        <Router>
            <Home/>
        </Router>
    </Provider>,
    document.getElementById('root')
)
*/



  