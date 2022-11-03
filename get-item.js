const { GetItemCommand } = require("@aws-sdk/client-dynamodb")
const { client } = require("./unauth-client.js")

exports.get_item = async (table, key) => {
    const params = {
      TableName: table,
      Key: key
    };

    try {
      const data = await client.send(new GetItemCommand(params));
      return data;  
    } catch (error) {
      console.log(error)
    }
  }
  