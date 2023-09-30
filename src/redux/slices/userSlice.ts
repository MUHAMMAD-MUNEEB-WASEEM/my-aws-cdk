import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

export type AuthState = "SIGNED_IN" | "SIGNED_OUT" | null

type StateType = {
    authState: AuthState;
    authData: AuthDataType | null;
    userData: UserDataType | null;
};

const initialState: StateType = {
    authState: null,
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

