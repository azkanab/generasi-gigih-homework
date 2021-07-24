export function changeDateFormat(date) {
    var monthNames = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];

    var newDate = new Date(date);
    var formattedDate = `${newDate.getDate()} ${monthNames[newDate.getMonth()]} ${newDate.getFullYear()}`
    return formattedDate
}