import '../src/styles/global.css';
import { Provider } from 'react-redux';
import store from '../src/redux/store';
// import Amplify, { Auth } from "aws-amplify";
// import awsmobile from "../src/aws-exports";
// import dotenv from 'dotenv';
// dotenv.config({ path: "../.env.development" });

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

export const decorators = [
  (Story) => {

    // Amplify.configure(awsmobile);
    // Auth.configure(awsmobile);

    return <Provider store={store} >
      <Story />
    </Provider>

  },
];