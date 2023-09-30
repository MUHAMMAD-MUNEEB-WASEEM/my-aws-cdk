import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "@aws-amplify/ui-components";

type AuthDataType = {
    client_id: string;
    issuedAt: number;
    expiry: number;
    jwtToken: string;
}
type UserDataType = {
    userId: string;
    username: string;
    email: string;
    imageUrl?: string;
}

type StateType = {
    authState: "SIGNED_IN" | "SIGNED_OUT";
    authData: AuthDataType | null;
    userData: UserDataType | null;
};

const initialState: StateType = {
    authState: "SIGNED_OUT",
    authData: null,
    userData: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signedInUser: (state: StateType, { payload }: PayloadAction<{ userData: UserDataType, authData: AuthDataType }>) => {
            // console.log("Action ==> ", payload);
            state.authState = "SIGNED_IN";
            state.userData = payload.userData;
            state.authData = payload.authData;
        },
        signedOutUser: (state: StateType) => {
            state.authState = "SIGNED_OUT";
            state.userData = null;
            state.authData = null;
        }
    },
});

export const { signedInUser, signedOutUser } = userSlice.actions;

export default userSlice.reducer;

