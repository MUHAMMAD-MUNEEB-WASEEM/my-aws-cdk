import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiCardProps } from "./ApiCard";
import { LeftPaneProps } from "./LeftPane";


type StateType = {
    leftPaneItems: LeftPaneProps['items'],
    apiList: ApiCardProps[],
};

const initialState: StateType = {
    apiList: [],
    leftPaneItems: []
};

const slice = createSlice({
    name: "apiBazaar",
    initialState,
    reducers: {
        updateApiListData: (state: StateType, { payload }: PayloadAction<{ apiList: StateType['apiList'] }>) => {
            // console.log("Action ==> ", payload);
            state.apiList = payload.apiList;
        },
        updateLeftPaneData: (state: StateType, { payload }: PayloadAction<{ leftPaneItems: StateType['leftPaneItems'] }>) => {
            // console.log("Action ==> ", payload);
            state.leftPaneItems = payload.leftPaneItems;
        }
    },
});

export const { updateApiListData, updateLeftPaneData } = slice.actions;

export default slice.reducer;

