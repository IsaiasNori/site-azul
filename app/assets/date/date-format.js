function getCurrentDate() {
    const dt = new Date()

    const dtString = dt.getUTCDate() + "-" +
                    (dt.getUTCMonth()+1) + "-" +
                    dt.getUTCFullYear() + " " +
                    dt.getUTCHours() + ":" +
                    dt.getUTCMinutes();

    return dtString.toString()
}



function hourToString(hour, minute) {
    if (hour < 10) { hour = "0" + hour; }
    if (minute < 10) { minute = "0" + minute; }
    return  `${hour}:${minute}`;
}