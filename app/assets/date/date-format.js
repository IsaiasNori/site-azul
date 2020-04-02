function getCurrentDate() {
    const dt = new Date()

    const dtString = dt.getUTCDate() + "-" +
                    (dt.getUTCMonth()+1) + "-" +
                    dt.getUTCFullYear() + " " +
                    dt.getUTCHours() + ":" +
                    dt.getUTCMinutes();

    return dtString.toString()
}