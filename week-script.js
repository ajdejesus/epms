const { get_item } = require("./get-item.js");
const { put_item } = require("./write-item.js");
const { update_item } = require("./update-item.js");
const { delete_item } = require("./delete-item.js");
const { home, signOut } = require('./navbar.js')

// helper function to format units of time from the "Date" object

function format_time(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes().toString();
    let am_or_pm = "am";

    if (date.getHours() > 12) {
        hours = (hours - 12).toString();
        am_or_pm = "pm";
    } else {
        hours = hours.toString();
    }

    if (date.getMinutes() < 10) {
        minutes = "0" + minutes;
    }

    const formatted_time = {
        hours: date.getHours().toString(),
        minutes: minutes,
        complete_time: hours + ":" + minutes + am_or_pm
    };

    return formatted_time;
}

// helper function to format dates from the "Date" object

function format_date(date) {

    switch (date.getMonth()) {
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
    };

    formatted_date = {
        month: month,
        day: date.getDate().toString(),
        year: date.getFullYear().toString(),
        complete_date: month + " " + date.getDate().toString() + ", " + date.getFullYear().toString()
    };

    return formatted_date;
}

function displayDates() {
    const date_array = ['day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7'];
    for (let i = 0; i < date_array.length; i++) {
        // console.log(date_array[i]);
        document.getElementById(date_array[i]).innerHTML = f_date.month + ' ' + (date.getDate() - date.getDay() + i).toString();
    }
}

const date = new Date();
const f_date = format_date(date);

const day_list = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

get_item(table = "rate-info", key = { id: { S: sessionStorage.getItem("id") } }).then(
    value => {
        const rate = +value.Item.rate.N;
        for (let i = 0; i < day_list.length; i++) {
            const day = f_date.month + ' ' + (date.getDate() - date.getDay() + i).toString() + ', ' + f_date.year;
            // console.log(day);
            get_item(table = "clock-info", key = { id: { S: sessionStorage.getItem("id") }, date: { S: day } }).then(
                value => {
                    if (value.Item != undefined) {
                        const hour_in = +value.Item.clockin_hour.S;
                        const hour_out = +value.Item.clockout_hour.S;
                        const hour_breakin = +value.Item.breakin_hour.S;
                        const hour_breakout = +value.Item.breakout_hour.S;
                        const min_breakin = +value.Item.breakin_min.S / 60;
                        const min_breakout = +value.Item.breakout_min.S / 60;
                        const min_in = +value.Item.clockin_min.S / 60;
                        const min_out = +value.Item.clockout_min.S / 60;
                        const total_hours = ((hour_out + min_out) - (hour_in + min_in)) - ((hour_breakout + min_breakout) - (hour_breakin + min_breakin))

                        document.getElementById('earned-' + day_list[i]).innerHTML = (total_hours * rate).toFixed(2);
                        document.getElementById('clockIn-' + day_list[i]).innerHTML = value.Item.clockin_hour.S + ':' + value.Item.clockin_min.S;
                        document.getElementById('clockOut-' + day_list[i]).innerHTML = value.Item.clockout_hour.S + ':' + value.Item.clockout_min.S;
                        document.getElementById('totalHours-' + day_list[i]).innerHTML = total_hours.toFixed(1);
                    }
                },
                error => {
                    console.log(error);
                }
            )
        }
    }
)

console.log('js loaded');
displayDates();
window.home = home;
window.signOut = signOut;
