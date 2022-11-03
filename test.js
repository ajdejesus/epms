const date = new Date()
let hours = date.getHours()
let minutes = date.getMinutes().toString()
let am_or_pm = "am"

console.log(hours + " " + minutes)

if (date.getHours() > 12) {
    hours = (hours - 12).toString()
    am_or_pm = "pm"
} else {
    hours = hours.toString()
}

console.log(hours + " " + minutes)

if (date.getMinutes() < 10) {
    minutes = "0" + minutes
}

console.log(hours + " " + minutes)

const formatted_time = {
    hours: hours,
    minutes: minutes,
    complete_time: hours + ":" + minutes + am_or_pm
}