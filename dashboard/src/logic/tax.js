import { RawDataCard } from "../components/cards/rawData_input";
import { updateObjUsingAttrName } from "./util";
import { TaxDataCard } from "../components/cards/tax_input";

/*
    Note: All Amount are in Lakhs,
    & Rate in %
*/
class Tax {
    taxSlabs;

    constructor(title = "Tax", taxSlabsRaw = [], taxableIncome = "", cessEnabled = false) {
        if (taxSlabsRaw.length == 0 || taxSlabsRaw[taxSlabsRaw.length - 1].limit != Infinity) {
            taxSlabsRaw.push({ limit: Infinity, rate: 30 });
        }
        this.taxSlabsRaw = taxSlabsRaw;
        // Process raw first
        this.taxSlabs = [...taxSlabsRaw];
        this.taxSlabs.sort((a, b) => a.limit - b.limit);
        this.preComputed = this.preComputeTaxGraphData();
        this.title = title;
        this.taxableIncome = taxableIncome
        this.cessEnabled = cessEnabled;
    }

    clone() {
        return new Tax(this.title, this.taxSlabsRaw, this.taxableIncome, this.cessEnabled);
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
        // Needs to updated
        // switch (attrName) {
        //     case 'principal':
        //     case 'rate':
        //     case 'period':
        //     case 'premature':
        //         value = parseFloat(value);
        //         if (isNaN(value)) {
        //             value = 0;
        //         }
        //     case 'cumulative_freq':
        //         value = parseInt(value);
        //         if (isNaN(value)) {
        //             value = 0;
        //         }
        //     default:
        //     // Do nothing
        // }
        updateObjUsingAttrName(this, attrName, value);
    }

    taxFunction(taxableIncome) {
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

        // Apply 4% Health & Education Cess
        let cess = 0;
        if (this.cessEnabled) {
            cess = 0.04 * tax;
        }
        return tax + cess;
    }

    taxFunctionArrayOptimal(startIncome, endIncome = 10, step = 0.1) {
        let curTaxSlab = 0;
        let ySize = Math.floor((endIncome - startIncome) / step + 1);
        let y = new Array(ySize), x = new Array(ySize);
        y[0] = this.taxFunction(startIncome)
        x[0] = startIncome;
        for (let income = startIncome + step, i = 1; income <= endIncome; income += step, i++) {
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
            x[i] = income;

            //A Test-Check (Uncomment for checking)
            // if(y[i] != this.taxFunction(income)){
            //     console.log(`WARNING : MISMATCH from taxFunction : ${this.taxFunction(income)} :With OptimalArray calculation : ${y[i]} for Income : ${income}`)
            // }



        }
        return [x, y];
    }

    preComputeTaxGraphData(){
        let startIncome = 0, endIncome = 30, step = 1;
        return this.taxFunctionArrayOptimal(startIncome, endIncome, step);
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

    getDataForPlot(period) {
       return this.preComputed;
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

