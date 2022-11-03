const { PutItemCommand } = require("@aws-sdk/client-dynamodb")
const { client } = require("./unauth-client.js")

exports.put_item = async (table, item) => {
    const params = {
        TableName: table,
        Item: item
    };

    try {
        const data = await client.send(new PutItemCommand(params));
        console.log("Item added to table '" + table + "'");
        console.log("Item: " + item);
        return data;
    } catch (error) {
        console.log(error)
    }
}
