const { DynamoDB } = require("@aws-sdk/client-dynamodb")
const { fromCognitoIdentityPool } = require("@aws-sdk/credential-provider-cognito-identity")
const { CognitoIdentityClient } = require("@aws-sdk/client-cognito-identity")

exports.client = new DynamoDB({
    region: "us-east-1",
    credentials: fromCognitoIdentityPool({
        client: new CognitoIdentityClient({ region: "us-east-1" }),
        identityPoolId: "us-east-1:a36a5ddb-b420-4ed2-913a-961752d8538c" // IDENTITY_POOL_ID
    })
});
