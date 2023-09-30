import React from "react";
import Amplify, { Auth } from "aws-amplify";
import awsmobile from "./aws-exports";
import { Provider } from 'react-redux';
import store from './redux/store';

export default ({ element }) => {

    Amplify.configure(awsmobile);
    Auth.configure(awsmobile);

    return (
        <Provider store={store} >
            {element}
        </Provider>
    );
}