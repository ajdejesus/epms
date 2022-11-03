const { get_item } = require("./get-item.js")

const table_info = get_item(table = "emp-info", key = { id: { S: "1" }, username: { S: "user1" }})

table_info.then (
    function (value) {
        console.log(value)
    },
    function (error) {
        console.log(error)
    }
)
