import * as AWS from "aws-sdk";
const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

exports.handler = async (event: any) => {
    console.log("Event", event);

    const body = JSON.parse(event.body);
    console.log("Body", body);

    if(event.httpMethod !== "POST"){
        return {
            statusCode: 502,
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: `invalid HTTP Method`
        };
    }


    try{
        
        const login_params : any = {
            AuthFlow: 'ADMIN_USER_PASSWORD_AUTH',
            ClientId: process.env.USERPOOL_CLIENT || "",
            UserPoolId: process.env.USER_POOL_ID || "",
            AuthParameters: {
                USERNAME: body.email || "",
                PASSWORD: body.password || ""
            }
        }

        console.log("login_params", login_params)

        const login = await cognitoidentityserviceprovider.adminInitiateAuth(login_params).promise();
        console.log(login);

        return {
            statusCode: 200,
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(login?.AuthenticationResult?.AccessToken)
        };
    }
    catch(err){
        console.log(err);
        return {
            statusCode: 400,
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(err)
        };
    }
}