import { fetchAllPublicApis, getPublicApisCountByType } from '../../graphql/queries';
import { API } from 'aws-amplify';
import { GraphQLResult } from '../../type';
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api-graphql';
import { apiType as ApiSaasType, fetchallPublicApisOutput, getPublicApisCountByTypeOutput } from '../../graphql/API';


export const FetchAllPublicApis = async (apiType?: ApiSaasType): Promise<GraphQLResult<{ fetchAllPublicApis: fetchallPublicApisOutput }>> => {
    try {
        const res = await API.graphql({
            query: fetchAllPublicApis, variables: { input: { apiType, pageNumber: 1, pageSize: 10 } },
            authMode: GRAPHQL_AUTH_MODE.API_KEY
        })
        // console.log("fetchAllPublicApis ==>", res);
        return res as any
    } catch (e) {
        console.log("fetchAllPublicApis_ERROR==>", e)
        return e;
    }
}

export const FetchPublicApisCountByType = async (): Promise<GraphQLResult<{ getPublicApisCountByType: getPublicApisCountByTypeOutput[] }>> => {
    try {
        const res = await API.graphql({ query: getPublicApisCountByType, authMode: GRAPHQL_AUTH_MODE.API_KEY })
        // console.log("getPublicApisCountByType", res);
        return res as any
    } catch (e) {
        return e;
    }
}