export function greet(name) {
    return `Hello, ${name}!`;
}


export function daysToQuaters(days) {
    let quaters = Math.floor(days / (91.25));
    let remDays = days - 91.25 * quaters;
    return [quaters, remDays]
}

/*
   Format refers to type of period
   d: days
   m: months
   q: quarters
   y: years
*/
export function convertPeriodToYears(period, format) {
    switch (format) {
        case 'y':
            return period;
        case 'q':
            return period / 4;
        case 'm':
            return period / 12;
        case 'd':
            return period / 365;
        default:
            console.error(`format ${format} not supported by convertPeriodToYears `)
            return -1;
    }
}

export function updateObjUsingAttrName(obj, attr, attrValue) {
    if (attr in obj) {
        obj[attr] = attrValue;
    } else {
        console.warn(`Attribute ${attr} doesn't belong to the given Object : ${obj}`)
    }
}

function getFloat(val) {
    val = parseFloat(val);
    if (isNaN(val)) {
        val = 0;
    }
    return val;
}

export function convertCSVtoList(csv) {
    let out = [];
    let cur = "";
    for (let i = 0; i < csv.length; i++) {
        if (csv[i] == ',') {
            if (cur.length != 0) {
                out.push(getFloat(cur));
                cur = "";
            }

        } else cur += csv[i];
    }
    if (cur.length != 0)
        out.push(getFloat(cur));
    return out;
}

/* 
If requiredSize = 8
out = [0, 0.25, 0.5, 1, 1.25, 1.5, 1.75, 2]
The function is used to get xLabels
*/
export function getYearQuaterinArray(requiredSize){
    let out = [];
    for(let i = 0, q = 0;i < requiredSize; i++, q += 0.25){
        out.push(q);
    }
    return out;
}