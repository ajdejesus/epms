const { UpdateItemCommand } = require("@aws-sdk/client-dynamodb")
const { client } = require("./unauth-client.js")

exports.update_item = async (table, key, expression_update, expression_attributes) => {
    const params = {
        TableName: table,
        Key: key,
        UpdateExpression: expression_update,
        ExpressionAttributeValues: expression_attributes
    };
    
    try {
        const data = client.send(new UpdateItemCommand(params))
        return data;
    } catch (error) {
        console.log(error)
    }
}

// Example of how parameters should be fed
// update_item(table = "clock-info", key = { id: { S: "1" }, date: { S: "October 26 2022" } }, expression_update = "set clockout = :s", expression_attributes = { ":s": { S: "11:00" } })
