const { get_item } = require("./get-item.js")
const { put_item } = require("./write-item.js")
const { update_item } = require("./update-item.js")

// helper function to format units of time from the "Date" object

function format_time(date) { 
    let hours = date.getHours()
    let minutes = date.getMinutes().toString()
    let am_or_pm = "am"

    if (date.getHours() > 12) {
        hours = (hours - 12).toString()
        am_or_pm = "pm"
    } else {
        hours = hours.toString()
    }

    if (date.getMinutes() < 10) {
        minutes = "0" + minutes
    }

    const formatted_time = {
        hours: date.getHours().toString(),
        minutes: minutes,
        complete_time: hours + ":" + minutes + am_or_pm
    }

    return formatted_time; 
}

// helper function to format dates from the "Date" object

function format_date(date) {

    switch(date.getMonth()) {
        case 0:
            month = "January";
            break;
        case 1:
            month = "February";
            break;
        case 2:
            month = "March";
            break;
        case 3:
            month = "April";
            break;
        case 4:
            month = "May";
            break;
        case 5:
            month = "June";
            break;
        case 6:
            month = "July";
            break;
        case 7:
            month = "August";
            break;
        case 8:
            month = "September";
            break;
        case 9:
            month = "October";
            break;
        case 10:
            month = "November";
            break;
        case 11:
            month = "December";
            break;
    }

    formatted_date = {
        month: month,
        day: date.getDate().toString(),
        year: date.getFullYear().toString(),
        complete_date: month + " " + date.getDate().toString() + ", " + date.getFullYear().toString()
    }

    return formatted_date;
}

// function will communicate with dynamodb to store clock in and clock out times
// TODO it is a good idea to combine the clock in and clock out functions and seperate them with an if statement

function clock_in() {
    const date = new Date()
    const f_date = format_date(date)
    const f_time = format_time(date)
    const clock = document.getElementById("clock")
    const btnPanel1 = document.getElementById("btn-panel1")
    const btnPanel2 = document.getElementById("btn-panel2")

    const table_info = put_item(table = "clock-info", item = { id: { S: sessionStorage.getItem("id") }, date: { S: f_date.complete_date }, clockin_hour: { S: f_time.hours }, clockin_min: { S: f_time.minutes } })

    table_info.then (
        function (value) {
            console.log("Added successfully")
            
            clock.innerHTML = f_time.complete_time

            btnPanel1.style.display = "none"
            btnPanel2.style.display = "inline-block"
        },
        function (error) {
            console.log(error)
        }
    )
}

function break_in() {
    const date = new Date();
    const f_time = format_time(date);
    const f_date = format_date(date);
    const sub_panel = document.getElementById("sub-panel");
    const start_break = document.getElementById("start-break-btn");
    const end_break = document.getElementById("end-break-btn");

    const table_info = update_item(table = "clock-info", key = { id: { S: sessionStorage.getItem("id") }, date: { S: f_date.complete_date } }, expression_update = "set breakin_hour = :h, breakin_min = :m", expression_attributes = { ":h": { S: f_time.hours }, ":m": { S: f_time.minutes } });

    table_info.then (
        function (value) {
            console.log("Added successfully\n", value.Item);

            sub_panel.innerHTML = "Took your break at " + format_time.complete_time
            start_break.style.display = "none";
            end_break.style.display = "inline-block";
        },
        function (error) {
            console.log(error);
        }
    )
}

function break_out() {
    const date = new Date();
    const f_time = format_time(date);
    const f_date = format_date(date);
    const sub_panel = document.getElementById("sub-panel");
    const start_break = document.getElementById("start-break-btn");
    const end_break = document.getElementById("end-break-btn");

    const table_info = update_item(table = "clock-info", key = { id: { S: sessionStorage.getItem("id") }, date: { S: f_date.complete_date } }, expression_update = "set breakout_hour = :h, breakout_min = :m", expression_attributes = { ":h": { S: f_time.hours }, ":m": { S: f_time.minutes } });

    table_info.then (
        function (value) {
            console.log("Added successfully\n", value.Item);

            sub_panel.innerHTML = "Welcome back " + document.getElementById("emp-name").innerHTML + "!"
            start_break.style.display = "inline-block";
            end_break.style.display = "none";
        },
        function (error) {
            console.log(error);
        }
    )
}

function clock_out() {
    const date = new Date();
    const f_time = format_time(date);
    const f_date = format_date(date);
    const clock = document.getElementById("clock");
    const btnPanel1 = document.getElementById("btn-panel1");
    const btnPanel2 = document.getElementById("btn-panel2");

    const table_info = update_item(table = "clock-info", key = { id: { S: sessionStorage.getItem("id") }, date: { S: f_date.complete_date } }, expression_update = "set clockout_hour = :h, clockout_min = :m", expression_attributes = { ":h": { S: f_time.hours }, ":m": { S: f_time.minutes } });

    table_info.then (
        function (value) {
            console.log("Added successfully\n", value.Item);
            clock.innerHTML = clock.innerHTML + " - " + f_time.complete_time;

            btnPanel1.style.display = "none";
            btnPanel2.style.display = "none";
        },
        function (error) {
            console.log(error);
        }
    )
}

// function to avoid the webpage from resetting after refreshing  or leaving the page

function verify_timecard_status() {
    console.log("Verifying timecard status...")

    const date = new Date();
    const f_date = format_date(date)
    const clock = document.getElementById("clock");
    const sub_panel = document.getElementById("sub-panel");
    const btnPanel1 = document.getElementById("btn-panel1");
    const btnPanel2 = document.getElementById("btn-panel2");

    const table_info = get_item(table = "clock-info", key = { id: { S: sessionStorage.getItem("id") }, date: { S: f_date.complete_date } })

    table_info.then (
        function (value) {
            // console.log(value.Item.clockin_hour.S)
            if (value.Item.clockin_hour != undefined) {
                clock.innerHTML = value.Item.clockin_hour.S + ":" + value.Item.clockin_min.S
                btnPanel1.style.display = "none"
                btnPanel2.style.display = "inline-block"
                console.log("first if")

                if (value.Item.breakin_hour != undefined && value.Item.breakout_hour == undefined) {
                    sub_panel.innerHTML = "Took your break at " + value.Item.breakin_hour.S
                    console.log("second if", sub_panel.innerHTML)
                } else if (value.Item.breakin_hour != undefined && value.Item.breakout_hour != undefined) {
                    sub_panel.innerHTML = "Welcome back " + document.getElementById("emp-name").innerHTML + "!"
                    console.log("third if", sub_panel.innerHTML)
                } else if (value.Item.clockout_hour != undefined) {                    
                    clock.innerHTML = clock.innerHTML + " - " + value.Item.clockout_hour.S + ":" + value.Item.clockout_min.S
                    btnPanel1.style.display = "none"
                    btnPanel2.style.display = "none"
                    console.log("fourth if")
                }
            }
        },
        function (error) {
            console.log(error)
        }
    )
}

// functions loads work week information and pay rate
// TODO fix the work week display so it does not show dates over 30 or 31

function load_workweek_info() {
    console.log("Loading work week info...")

    const week_info = document.getElementById("work-week")
    const date = new Date()
    const f_date = format_date(date)
    const todays_earnings = document.getElementById("todays-earning")
    // const overtime = document.getElementById("overtime")
    const weeks_earnings = document.getElementById("weeks-earning")
    let today_hours = 0

    const table_info = get_item(table = "clock-info", key = { id: { S: sessionStorage.getItem("id") }, date: { S: f_date.complete_date } })
    
    table_info.then (
        function (value) {
            // this function will create time variables for the rate to be calculated
            if (value.Item.clockin_hour != undefined && value.Item.clockout_hour != undefined) {
                const hour_in = +value.Item.clockin_hour.S
                const hour_out = +value.Item.clockout_hour.S
                const min_in = +value.Item.clockin_min.S / 60
                const min_out = +value.Item.clockout_min.S / 60 
    
                today_hours = (hour_out + min_out) - (hour_in + min_in)
            }
        },
        function (error) {
            console.log(error)
        }
    )

    const rate_info = get_item(table = "rate-info", key = { id: { S: sessionStorage.getItem("id") } })

    rate_info.then (
        function (value) {
            // this function will display earnings information
            const rate = +value.Item.rate.N
            const pay = rate * today_hours

            // console.log(pay, rate, today_hours)

            todays_earnings.innerHTML = "$" + pay.toFixed(2)
        },
        function (error) {
            console.log(error)
        }
    )

    // const week_start_date = date.getDate() + date.getDay()

    week_info.innerHTML = f_date.month + " " + (date.getDate() - date.getDay()) + " - " + (date.getDate() + (6 - date.getDay()))
}

// function to load employee information, retrieves it from DynamoDB for display

function load_emp_info () {
    console.log("Loading employee information...")
    
    const id = document.getElementById("emp-id")
    const name = document.getElementById("emp-name")
    const dept = document.getElementById("dept-info")
    const sub_panel = document.getElementById("sub-panel")

    const table_info = get_item(table = "emp-info", key = { id: { S: sessionStorage.getItem("id") }, username: { S: sessionStorage.getItem("username") } })

    table_info.then (
        function (value) {
            // console.log(value.Item)
            id.innerHTML = value.Item.id.S
            name.innerHTML = value.Item.fname.S + " " + value.Item.lname.S  
            dept.innerHTML = value.Item.department.S
            sub_panel.innerHTML = "Welcome to your shift " + value.Item.fname.S + "!"
        },

        function (error) {
            console.log("Error:", error)
        }
    )
}

function load_everything() {
    load_emp_info();
    load_workweek_info();
    verify_timecard_status();
}

window.clock_in = clock_in;
window.break_in = break_in;
window.break_out = break_out;
window.clock_out = clock_out;
window.load_everything = load_everything;
