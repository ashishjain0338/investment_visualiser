function getQuaterLabels(size) {
    let yearCount = 0, quaterCount = 0;
    let out = []
    for (let i = 0; i < size; i++, quaterCount++) {
        let cur = 'Q' + quaterCount;
        if (i % 4 == 0) {
            cur = 'Y' + yearCount;
            yearCount++;
            quaterCount = 0;
        }
        out.push(cur);
    }
    return out;
}



function convertToPercentage2D(arr){
    for(let i = 0;i < arr.length; i++){
        arr[i] = convertToPercentage(arr[i]);
    }
    return arr;
}

function convertToPercentage(cur) {
    if (cur.length == 0) {
        return cur;
    }
    let base = cur[0];
    for (let i = 0; i < cur.length; i++) {
        cur[i] = (cur[i] - base)/base * 100;
    }
    return cur;
}

function getBaseIndex(cur){
    // The one series that will have the lowest last value will be treated as base
    let baseIndex = 0, baseLength = cur[0].length;
    let lowestValue = cur[0][baseLength - 1];

    for (let i = 1; i < cur.length; i++) {
        const lastValue = cur[i][cur[i].length - 1];
        if (lastValue < lowestValue) {
            lowestValue = lastValue;
            baseIndex = i;
        }
    }
    return baseIndex;
}

function diffViewUnevenLength(cur, index = -1) {
    // Check for uneven lengths in the arrays
    // Find the base series (array with the lowest last value)
    let baseIndex = index;
    if(index == -1){
        baseIndex = getBaseIndex(cur);
    }
    
    const baseSeries = cur[baseIndex];
    // If baseseries is small, last element of baseSeries will be used for used
    let result = [];
    for(let i = 0; i < cur.length; i++){
        let inter = [], k = 0;
        for(let j = 0; j < cur[i].length; j++){
            inter.push(cur[i][j] - baseSeries[k]);
            
            if(k < baseSeries.length - 1){
                // Stop Incrementing when it has reached last element of baseSeries
                k++;
            }
        }
        result.push(inter);
        
    }
    

    return result;
}

export {diffViewUnevenLength, convertToPercentage2D, getQuaterLabels}