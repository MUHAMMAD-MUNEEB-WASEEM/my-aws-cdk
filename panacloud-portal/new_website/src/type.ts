import { CognitoUserInterface } from "@aws-amplify/ui-components";

export interface CognitoUser extends CognitoUserInterface {
    signInUserSession?: {
        accessToken?: {
            jwtToken: string,
            payload: object,
        },
        idToken?: {
            jwtToken: string,
            payload: {
                aud: string, ["cognito:groups"]?: string[], ["cognito:username"]: string,
                email: string, email_verified: boolean, event_id: string, exp: number,
                iat: number, iss: string, phone_number: string, phone_number_verified?: boolean,
                sub: string, token_use: string,
            },
        }
        refreshToken?: { token: string },
    }
};


export type GraphqlError = {
    path: string[],
    data: object | null,
    errorType: string,
    errorInfo: null | object | string,
    locations: { line: number, column: number, sourceName: any }[],
    message: string,
}[]

export interface GraphQLResult<T> {
    data?: T;
    errors?: GraphqlError;
    extensions?: {
        [key: string]: any;
    };
}
