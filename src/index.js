import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {getStore} from "./redux/store";
import {Provider} from "react-redux";
import {persistStore} from "redux-persist";


const store = getStore();
const persistor = persistStore(store);

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <PersistGate
                loading={<div>Loading...</div>}
                persistor={persistor}>
                <App/>
            </PersistGate>
        </React.StrictMode>
    </Provider>,
    document.getElementById('root')
);


