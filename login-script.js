const { get_item } = require("./get-item")

function auth () {
    const table_info = get_item(table = "login-info", key = { username: { S: document.getElementById("usr").value } });

    table_info.then(
        function (value) {
            if (value.Item != undefined && value.Item.password.S == document.getElementById("pwd").value) {
                sessionStorage.setItem("username", value.Item.username.S);
                sessionStorage.setItem("id", value.Item.id.S);
                window.location.href = "./dashboard.html";
            } else {
                alert("No match");
            }
        },

        function (error) {
            console.log("Error: ", error);
        }
    )
}

window.auth = auth;
