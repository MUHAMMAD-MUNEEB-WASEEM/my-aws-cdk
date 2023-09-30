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
        
        const signup_params = {
            ClientId: process.env.USERPOOL_CLIENT || "",
            Password: body.password,
            Username: body.email,
            UserAttributes: [
                {
                    Name: "name",
                    Value: body.name
                }
            ]
        }

        console.log("signup_params", signup_params)

        const signup = await cognitoidentityserviceprovider.signUp(signup_params).promise();

        var confirm_signup_params: any = {
            UserPoolId: process.env.USER_POOL_ID,
            Username: body.email
        }

        const signup_confirm = await cognitoidentityserviceprovider.adminConfirmSignUp(confirm_signup_params).promise();
        console.log(signup_confirm);

        return {
            statusCode: 200,
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                message: "done"
            })
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