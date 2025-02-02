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



function convertToPercentage2D(xyList){
    for(let i = 0;i < xyList.length; i++){
        xyList[i][1] = convertToPercentage(xyList[i][1]);
    }
    return xyList;
}

function convertToPercentage(cur) {
    if (cur.length == 0) {
        return cur;
    }
    let base = cur[0];
    if(base == 0){
        console.warn("Can't calculate Percentage because starting-point is 0| Defaulting");
        return cur;
    }
    for (let i = 0; i < cur.length; i++) {
        cur[i] = (cur[i] - base)/base * 100;
    }
    return cur;
}

function getBaseIndex(xyList){
    // The one series that will have the lowest last value will be treated as base
    if(xyList.length == 0){
        return 0;
    }
    let baseIndex = 0, baseLength = xyList[0][1].length;
    let lowestValue = xyList[0][1][baseLength - 1];

    for (let i = 1; i < xyList.length; i++) {
        let y = xyList[i][1];
        const lastValue = y[y.length - 1];
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
    if(cur.length == 0)
        return cur;
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

function diffViewUnevenLengthWithXY(xyList, index = -1) {
    // Check for uneven lengths in the arrays
    // Find the base series (array with the lowest last value)
    if(xyList.length == 0)
        return xyList;
    let baseIndex = index;
    if(index == -1){
        baseIndex = getBaseIndex(xyList);
    }
    // Make a copy because while processing xyList contents will change modifying the baseSeries, Since baseSeries were getting referenced to xyList before
    const baseSeries = [...xyList[baseIndex]]; 
    const baseX = [...baseSeries[0]], baseY = [...baseSeries[1]];

    for(let i = 0; i < xyList.length; i++){
        let curXy = xyList[i];
        let curX = curXy[0], curY = curXy[1];
        let baseRunningIndex = 0;

        for(let curIndex = 0; curIndex < curX.length; curIndex++){
            while(baseRunningIndex < baseX.length){
                if(baseX[baseRunningIndex] > curX[curIndex]){
                    // The base-X value is greater than current X,
                    break; 
                }
                baseRunningIndex ++;
            }

            let subtractVal = (baseRunningIndex == 0 ? baseY[baseRunningIndex]: baseY[baseRunningIndex - 1]);
            xyList[i][1][curIndex] -= subtractVal;
        }
    }
    return xyList;
}

export {diffViewUnevenLength, convertToPercentage2D, getQuaterLabels, diffViewUnevenLengthWithXY}