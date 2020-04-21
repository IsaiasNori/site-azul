function getCurrentDate() {
    const dt = new Date()

    const dtString = dt.getUTCDate() + "-" +
        (dt.getUTCMonth() + 1) + "-" +
        dt.getUTCFullYear() + " " +
        dt.getUTCHours() + ":" +
        dt.getUTCMinutes();

    return dtString.toString()
}

function hourToString(hour, minute) {
    if (hour < 10) {
        hour = "0" + hour;
    }
    if (minute < 10) {
        minute = "0" + minute;
    }
    return `${hour}:${minute}`;
}

function dateFormat(str) {
    let d = new Date(str);
    let hs = hourToString(d.getHours(), d.getMinutes());
    let dt = `${d.getUTCDate()}/${d.getUTCMonth() + 1}`;
    return `Dia ${dt} às ${hs} `;
}