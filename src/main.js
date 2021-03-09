import './assets/main.css';
import React from 'react';
import ReactDom from 'react-dom'

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import Form from './components/toDo/form.js'
import reducers from './reducers';

import 'bootstrap/dist/css/bootstrap.min.css';

const createStoreWithMiddleware = applyMiddleware()(createStore);

document.addEventListener('DOMContentLoaded', function(){
    
    ReactDom.render(
        <>
            <Provider store={createStoreWithMiddleware(reducers)}>
                <Form/>
            </Provider>
        </>,
        document.querySelector('#root')
    )
})



