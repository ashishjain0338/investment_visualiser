export function greet(name) {
    return `Hello, ${name}!`;
}


export function daysToQuaters(days) {
    let quaters = Math.floor(days/ (91.25));
    let remDays = days - 91.25*quaters;
    return [quaters, remDays]
}

 /*
    Format refers to type of period
    d: days
    m: months
    q: quarters
    y: years
*/
export function convertPeriodToYears(period, format){
    switch (format){
        case 'y':
            return period;
        case 'q':
            return period/4;
        case 'm':
            return period/12;
        case 'd':
            return period/365;
        default:
            console.error(`format ${format} not supported by convertPeriodToYears `)
            return -1;
    }
}