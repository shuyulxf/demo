let formatDate = (date) => {
    let dObj = null,
        format = "";

    if (date && typeof date == "string") {
        date = date.replace("-", "/");
        date = date.replace("T", " ");
    };

    if (date)  dObj = new Date(date);
    else dObj = new Date();

    let dates = [];
    dates.push(dObj.getFullYear());
    dates.push(dObj.getMonth()); 
    dates.push(dObj.getDate());

    format = dates.join("-");

    let times = [];
    times.push(dObj.getHours());
    times.push(dObj.getMinutes());
    times.push(dObj.getSeconds());
    format += " " + times.join(":");

    return format;
}


