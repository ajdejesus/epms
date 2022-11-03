const { DeleteItemCommand } = require("@aws-sdk/client-dynamodb")
const { client } = require("./unauth-client.js")

exports.delete_item = async(table, key) => {
    const params = {
        TableName: table,
        Key: key
    };

    try {
        const data = client.send(new DeleteItemCommand(params))
        return data;
    } catch (error) {
        console.log(error)
    }
}