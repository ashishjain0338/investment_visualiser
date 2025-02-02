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

/*
    Returns the index after which you should add x to maintain sorted array
*/
export function sortedInsertIndex(arr, x) {
    if (arr.length === 0) return -1; // Empty array, insert at 0
    if (arr[0] >= x) return -1;      // Insert before the first element
    if (arr[arr.length - 1] < x) return arr.length - 1; // Insert at the end

    let l = 0, r = arr.length - 1;

    while (l <= r) {
        let mid = Math.floor((l + r) / 2);

        if (arr[mid] === x) {
            return mid; // If `x` already exists, return its position
        } else if (arr[mid] < x && arr[mid + 1] > x) {
            return mid; // Found correct position
        } else if (arr[mid] < x) {
            l = mid + 1;
        } else {
            r = mid - 1;
        }
    }

    return r; // The correct position after which `x` should be inserted
}


export function applyCess(arr, cess = 0.04){
    for(let i = 0; i < arr.length; i++){
        arr[i] += arr[i]* cess;
    }
}