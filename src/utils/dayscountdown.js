export function getDaysBetween(dateString1, dateString2) {
    let startDate = Date.parse(dateString1);
    let endDate = Date.parse(dateString2);
    return (startDate - endDate) / (1 * 24 * 60 * 60 * 1000);
}

/* getDaysBetween("2023/12/24", nowTime)
nowTime: new Date().toLocaleDateString(),
倒计时天数
*/


//