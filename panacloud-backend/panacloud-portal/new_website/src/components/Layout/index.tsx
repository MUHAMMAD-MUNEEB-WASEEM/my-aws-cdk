import React, { FC, useEffect } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import PureLayout from './PureLayout';
import { Auth } from "aws-amplify";
import { useAppDispatch, RootStateType } from '../../redux/store';
import { signedInUser } from '../../redux/slices/userSlice';
import { CognitoUser } from "../../type";
import { useSelector } from 'react-redux';

const Layout: FC = ({ children }) => {
    const dispatch = useAppDispatch();
    const user = useSelector((state: RootStateType) => state.user);
    const handleUserSignedIn = (data: CognitoUser) => {
        dispatch(signedInUser({
            authData: {
                client_id: data.signInUserSession?.idToken?.payload.aud!,
                issuedAt: data.signInUserSession?.idToken?.payload.iat!,
                expiry: data.signInUserSession?.idToken?.payload.exp!,
                jwtToken: data.signInUserSession?.idToken?.jwtToken!
            },
            userData: {
                email: data.signInUserSession?.idToken?.payload.email!,
                userId: data.signInUserSession?.idToken?.payload.sub!,
                username: data.signInUserSession?.idToken?.payload['cognito:username']!,
            }
        }))
    }
    /* Checking if the user is authenticated or not */
    useEffect(() => {
        let isMount = true;

        Auth.currentAuthenticatedUser()
            .then((data) => {
                if (typeof data === "object") {
                    console.log("currentAuthenticatedUser ===>", data);
                    isMount && handleUserSignedIn(data);
                }
            })
            .catch(err => err)

        return () => { isMount = false; }
    }, []);


    return (
        <PureLayout
            Footer={Footer}
            Navbar={() => <Navbar authData={
                (user.authState === "SIGNED_IN") ?
                    { username: user.userData?.username!, heroImageUrl: user.userData?.imageUrl! } :
                    undefined
            } />
            }
        >
            {children}
        </PureLayout>
    )
}
export default Layout;

