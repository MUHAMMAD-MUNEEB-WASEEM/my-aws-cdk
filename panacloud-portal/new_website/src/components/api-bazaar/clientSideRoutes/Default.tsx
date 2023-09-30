import React, { FC, useEffect, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Grid } from '@material-ui/core';
import ApiCard, { ApiCardProps } from '../ApiCard';
import mockData from '../ApiCard/mockData';
import LeftPane, { LeftPaneProps } from '../LeftPane';
import useStyles from '../style';
import { Header } from '../pageComponents';
import { apiType as APISaasTypeEnum } from '../../../graphql/API';
import { FetchAllPublicApis, FetchPublicApisCountByType } from '../services';
import { RootStateType, useAppDispatch } from '../../../redux/store';
import { updateApiListData, updateLeftPaneData } from '../apiBazaarSlice';
import { AuthState } from '../../../redux/slices/userSlice';
import { useSelector } from 'react-redux';
import { navigate } from 'gatsby-link';


type StateType = {
    leftPaneItems?: LeftPaneProps['items'],
    apiList?: ApiCardProps[],
}

//////////////////////////////////  Component ///////////////////////////////////////
const Default: FC<RouteComponentProps> = ({ location }) => {
    const classes = useStyles();
    const state = useSelector((state: RootStateType) => state.apiBazaar);
    const CURRENT_AUTH_STATE = useSelector((state: RootStateType) => state.user.authState);
    const dispatch = useAppDispatch();
    const [queryParam, setQueryParam] = useState<ReturnType<typeof getQueryParams>>(getQueryParams(location?.search));

    const _updateLeftPaneData = (leftPaneItems: StateType['leftPaneItems']) => { leftPaneItems && dispatch(updateLeftPaneData({ leftPaneItems })) }
    const _updateApiList = (apiList: StateType['apiList']) => { apiList && dispatch(updateApiListData({ apiList })) }

    const handleLeftPaneItemClick: LeftPaneProps['onListItemClick'] = (listTitle, listNestedItemTitle) => {
        navigate(`?status=${listTitle}&saasType=${listNestedItemTitle}`)
    }
    // console.log(queryParam);
    // console.log("state==>", state);


    /* load data according to the CURRENT_AUTH_STATE */
    useEffect(() => {
        if (CURRENT_AUTH_STATE === "SIGNED_IN" || CURRENT_AUTH_STATE === 'SIGNED_OUT') {
            loadLeftPaneItems(CURRENT_AUTH_STATE, _updateLeftPaneData);
        }
    }, [CURRENT_AUTH_STATE])

    /* when query string change in the url set the queryParams to update the state */
    useEffect(() => {
        setQueryParam(getQueryParams(location?.search))
    }, [location?.search])

    /* when queryParam update load APIs data */
    useEffect(() => {
        if (queryParam.apiSaasType) {
            loadApiList(undefined, queryParam.apiSaasType as APISaasTypeEnum, _updateApiList);
        }
    }, [queryParam])

    /* if no query string in the url then redirect to default query string used in the useEffect callback */
    useEffect(() => {
        if (!queryParam.apiSaasType && !queryParam.apiStatus) {
            const apiStatus = "Public APIs"; const apiSaasType = "All"
            navigate(`?status=${apiStatus}&saasType=${apiSaasType}`)
        }
    }, [])


    return (
        <div className={classes.container} >
            <Header authstate={CURRENT_AUTH_STATE} />
            <Grid justify='space-between' container >
                <LeftPane
                    items={state?.leftPaneItems || []}
                    defaultselectedItem={{ listNestedItemTitle: queryParam.apiSaasType || "All", listTitle: queryParam.apiStatus || "Public APIs" }}
                    onListItemClick={handleLeftPaneItemClick}
                />
                <div className={classes.apiCardList} >
                    {state?.apiList?.map((apidata, idx) => {
                        return <ApiCard {...apidata} key={idx} onClick={() => { navigate(`/api-bazaar/${apidata?.apiId}`) }} />
                    })}
                </div>
            </Grid>
        </div>
    )
}

export default Default;



////////////////////////////////////////  Functions /////////////////////////////////////

async function loadLeftPaneItems(authState: AuthState, updateData?: (state: StateType['leftPaneItems']) => void): Promise<StateType['leftPaneItems']> {
    const publicApisCount = await FetchPublicApisCountByType()
    // console.log("publicApisCount", publicApisCount)
    const getPublicApisCountByType = publicApisCount.data?.getPublicApisCountByType
    const totalPublicApisCount = getPublicApisCountByType?.map((val) => val.count || 0).reduce((a, b) => a + b, 0) || 0

    const apiSaasTypeList = [
        { title: "All", count: totalPublicApisCount },
        // ...Object.values(APISaasTypeEnum).map(val => ({ title: val, count: 19 }))
        ...getPublicApisCountByType?.map((val) => ({
            title: val.type, count: val.count,
        })) || []

    ]

    const publicApiList = [{ listTitle: "Public APIs", listItems: apiSaasTypeList, listCount: totalPublicApisCount }]

    const otherApisList = [
        { listTitle: "Company Private APIs", listItems: apiSaasTypeList, listCount: 21 },
        { listTitle: "My Published APIs", listItems: apiSaasTypeList, listCount: 21 },
        { listTitle: "My Under Development APIs", listItems: apiSaasTypeList, listCount: 21 },
        { listTitle: "My API Subscriptions", listItems: apiSaasTypeList, listCount: 21 },
    ]

    let leftPaneData
    if (authState === 'SIGNED_OUT' || authState === null) {
        leftPaneData = publicApiList
    }
    if (authState === 'SIGNED_IN') {
        leftPaneData = [
            ...publicApiList,
            ...otherApisList
        ]
    }

    updateData && updateData(leftPaneData);
    // console.log('===== left pane list count set =====')
    return leftPaneData

}

async function loadApiList(apiStatus?: string, apiSaasType?: APISaasTypeEnum, updateData?: (state: StateType['apiList']) => void,) {
    apiSaasType = Object.values(APISaasTypeEnum).includes(apiSaasType!) ? apiSaasType : undefined
    const { data } = await FetchAllPublicApis(apiSaasType);

    // console.log("FetchAllPublicApis", data)


    const apiListData = data?.fetchAllPublicApis?.apis?.map((api) => ({
        apiId: api?.apiId,
        apiKind: api?.apiKind!,
        title: api?.title || "",
        ownerName: api?.owner?.id || "",
        imageUrl: api?.imageUrl || "",
        publishDate: mockData[0].publishDate,
        ratings: mockData[0].ratings
    }))


    updateData && updateData(apiListData);
    // console.log('===== api list set =====, ', apiSaasType)
    return apiListData

}

function getQueryParams(queryString?: string) {
    const urlParams = new URLSearchParams(queryString);
    // console.log("location : status ==>", urlParams.get('status'));
    // console.log("location : saasType ==>", urlParams.get('saasType'));
    return {
        apiStatus: urlParams.get('status'),
        apiSaasType: urlParams.get('saasType')
    }
}