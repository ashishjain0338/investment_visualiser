import { RawDataCard } from "../components/cards/rawData_input";
import { convertCSVtoList, updateObjUsingAttrName, sortedInsertIndex, applyCess } from "./util";
import { TaxDataCard } from "../components/cards/tax_input";

/*
    Note: All Amount are in Lakhs,
    & Rate in %
*/
class Tax {
    taxSlabs;

    constructor(title = "Tax", taxSlabsRaw = [],
        grossIncome = "", deduction = 0, cessEnabled = false,
        preComputed = undefined, userVals = undefined) {

        this.title = title;
        this.cessEnabled = cessEnabled;
        this.grossIncome = grossIncome;
        this.deduction = deduction;


        if (taxSlabsRaw.length == 0) {
            taxSlabsRaw.push({ limit: Infinity, rate: 30 });
        }
        let lastTaxLimit = taxSlabsRaw[taxSlabsRaw.length - 1].limit
        if (lastTaxLimit == null) {
            // The Infinity changes to null when it is saved and loaded
            taxSlabsRaw[taxSlabsRaw.length - 1].limit = Infinity;
        } else if (lastTaxLimit != Infinity) {
            taxSlabsRaw.push({ limit: Infinity, rate: 30 });
        }

        this.taxSlabsRaw = taxSlabsRaw;
        // Process raw first
        this.taxSlabs = [...taxSlabsRaw];
        this.taxSlabs.sort((a, b) => a.limit - b.limit);
        this.preComputed = preComputed;
        if (this.preComputed == undefined) {
            this.preComputed = this.preComputeTaxGraphData();
        }

        this.userVals = userVals;
        if (this.userVals == undefined) {
            this.userVals = this.computeUserVals();
        }
    }

    clone() {
        return new Tax(this.title, this.taxSlabsRaw, this.grossIncome, this.deduction, this.cessEnabled, this.preComputed, this.userVals);
    }

    info() {
        console.log(`Tax: ${this.taxSlabs}`)
    }

    getClassName() {
        return 'Tax';
    }

    updateTaxTable(operationType, index = -1, attributeName = "", value = -1,) {
        switch (operationType) {
            case "delete":
                this.taxSlabsRaw.splice(index, 1);
                break;
            case "update":
                if (attributeName == "limit") {
                    this.taxSlabsRaw[index].limit = parseFloat(value);
                } else if (attributeName == "rate") {
                    this.taxSlabsRaw[index].rate = parseFloat(value);
                } else {
                    console.warn(`Invalid AttributeName ${attributeName} in updateEventFromTable`);
                }
                break;
            case "replace":
                this.taxSlabsRaw = value;

                break;
            case "add":
                this.taxSlabsRaw.splice(this.taxSlabsRaw.length - 1, 0, { limit: 0, rate: 0 });
                break;
            default:
                console.warn(`operationType ${operationType} is not valid for updateTaxTable`);
                return;
        }
        // Processed updated Raw taxSlabs
        this.taxSlabs = [...this.taxSlabsRaw];
        this.taxSlabs.sort((a, b) => a.limit - b.limit);
        this.preComputed = this.preComputeTaxGraphData();
        return;

    }

    updateField(attrName, value) {
        //Pre-Proces
        switch (attrName) {
            case 'deduction':
                value = parseFloat(value);
                if (isNaN(value)) {
                    value = 0;
                }
                break;
            case 'taxSlabsRaw':
                for(let i = 0;i < value.length; i++){
                    if(value[i].limit == null){
                        // During Dump, infinity is changed to null, overriding that
                        value[i].limit = Infinity;
                    }
                }
                break;
            default:
            //Do-Nothing
        }

        updateObjUsingAttrName(this, attrName, value);
        // Post-process
        switch (attrName) {
            case 'grossIncome':
                this.userVals = this.computeUserVals();
                break;
            case 'cessEnabled':
            case 'deduction':
                this.preComputed = this.preComputeTaxGraphData();
                this.userVals = this.computeUserVals();
                break;
            case 'taxSlabsRaw':
                console.log("here");
                this.taxSlabs = this.taxSlabsRaw.sort((a, b) => a.limit - b.limit);
                this.preComputed = this.preComputeTaxGraphData();
                this.userVals = this.computeUserVals();
                break;
            default:
            // Do nothing
        }
    }

    getHighlightPoints() {
        return convertCSVtoList(this.grossIncome);
    }

    taxFunction(taxableIncome) {
        if (taxableIncome < 0)
            return 0;
        let tax = 0;
        let previousLimit = 0;

        for (let slab of this.taxSlabs) {

            if (taxableIncome > slab.limit) {
                tax += (slab.limit - previousLimit) * (slab.rate / 100);
                previousLimit = slab.limit;
            } else {
                tax += (taxableIncome - previousLimit) * (slab.rate / 100);
                break;
            }
        }
        return tax;
    }



    taxFunctionArrayOptimal(startIncome, endIncome = 10, step = 0.1) {
        // console.log("Precomputing with Tax slabs : ", this.taxSlabs)
        let curTaxSlab = 0;
        let ySize = Math.floor((endIncome - startIncome) / step + 1);
        if(ySize == 0){
            return [[], []]
        }
        let y = new Array(ySize), x = new Array(ySize);
        y[0] = this.taxFunction(startIncome - this.deduction);
        x[0] = startIncome;
        for (let grossIncome = startIncome + step, i = 1; grossIncome <= endIncome; grossIncome += step, i++) {
            let income = grossIncome - this.deduction;
            // console.log("Check me : ", grossIncome, income, this.deduction);
            x[i] = grossIncome;
            if (income <= 0) {
                y[i] = 0;
                continue;
            }
            if (income <= this.taxSlabs[curTaxSlab].limit) {
                /*  This signifies taxSlab is not changed
                    Additional income from previous is step,
                    Addition-Tax will be step * rate
                 */
                y[i] = y[i - 1] + step * (this.taxSlabs[curTaxSlab].rate / 100);
            } else {
                /* 
                    A taxSlab change is observed
                */
                let [prevTaxLimit, prevTaxRate] = [this.taxSlabs[curTaxSlab].limit, (this.taxSlabs[curTaxSlab].rate / 100)];
                let [newTaxLimit, newTaxRate] = [this.taxSlabs[curTaxSlab + 1].limit, (this.taxSlabs[curTaxSlab + 1].rate / 100)];
                curTaxSlab++;
                let incomePrevRate = prevTaxLimit - (income - step);
                let incomeCurRate = income - prevTaxLimit;
                y[i] = y[i - 1] + incomePrevRate * prevTaxRate + incomeCurRate * newTaxRate;
            }

            //A Test-Check (Uncomment for checking)
            // if(y[i] != this.taxFunction(income)){
            //     console.log(`WARNING : MISMATCH from taxFunction : ${this.taxFunction(income)} :With OptimalArray calculation : ${y[i]} for Income : ${income}`)
            // }



        }
        return [x, y];
    }

    computeUserVals() {
        let x = convertCSVtoList(this.grossIncome);
        let y = []
        for (let i = 0; i < x.length; i++) {
            y.push(this.taxFunction(x[i] - this.deduction));
        }

        if (this.cessEnabled){
            applyCess(y);
        }
        
        return [x, y];
    }

    preComputeTaxGraphData() {
        let startIncome = 0, endIncome = 30, step = 1;
        let xyList = this.taxFunctionArrayOptimal(startIncome, endIncome, step);
        if(this.cessEnabled){
            applyCess(xyList[1]);
        }
        return xyList;
    }


    getOptimalStepSize() {
        /* You need a stepSize in such a way, that by taking one step, you should not jump one taxSlabs fully 
        (The optimal Calulation expects that)
        */
        let minSlabWidth = 10; // 10 Lakhs
        for (let i = 1; i < this.taxSlabs.length; i++) {
            if (this.taxSlabs[i].limit != Infinity) {
                let curWidth = this.taxSlabs[i].limit - this.taxSlabs[i - 1].limit;
                minSlabWidth = Math.min(minSlabWidth, curWidth);
            }
        }
        return minSlabWidth / 2;
    }

    mergePreComputedAndUserVals() {
        if (this.userVals == undefined) {
            return this.preComputed;
        }
        let [preX, preY] = this.preComputed;
        let [userX, userY] = this.userVals;
        let outX = [...preX], outY = [...preY];
        // x-axis must be sorted
        userX.map((val, index) => {
            let indexAfterAdd = sortedInsertIndex(outX, val);
            outX.splice(indexAfterAdd + 1, 0, val);
            outY.splice(indexAfterAdd + 1, 0, userY[index]);
        }
        )

        return [outX, outY];
    }

    getDataForPlot(period) {
        return this.mergePreComputedAndUserVals();
    }

    getReactComponent(index, parentUpdateFxn, deleteFxn, duplicateFxn) {
        return <TaxDataCard
            obj={this}
            index={index}
            parentUpdateFxn={parentUpdateFxn}
            deleteFxn={deleteFxn}
            duplicateFxn={duplicateFxn}
        />
    }

}

export { Tax }

