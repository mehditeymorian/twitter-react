import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {getStore} from "./redux/store";
import {Provider} from "react-redux";


const store = getStore();

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    </Provider>,
    document.getElementById('root')
);


