import { RawDataCard } from "../components/cards/rawData_input";
import { updateObjUsingAttrName } from "./util";
import { convertCSVtoList } from "./util";

class Tax {
    taxSlabs;

    constructor(title = "Tax", taxSlabs = [], taxableIncome = "", cessEnabled = false) {
        taxSlabs = [
            { limit: 250000, rate: 0 },      // 0% for income up to ₹2,50,000
            { limit: 1000000, rate: 0.2 },   // 20% for ₹5,00,001 - ₹10,00,000
            { limit: 500000, rate: 0.05 },   // 5% for ₹2,50,001 - ₹5,00,000
            { limit: Infinity, rate: 0.3 }   // 30% for income above ₹10,00,000
        ];

        taxSlabs.sort((a, b) => a.limit - b.limit);
        this.taxSlabs = taxSlabs;
        this.title = title;
        this.taxableIncome = taxableIncome
        this.cessEnabled = cessEnabled;
    }

    clone() {
        return new Tax(this.title, this.taxSlabs, this.taxableIncome, this.cessEnabled);
    }

    info() {
        console.log(`Tax: ${this.taxSlabs}`)
    }

    getClassName() {
        return 'Tax';
    }

    updateField(attrName, value) {
        // Needs to updated
        updateObjUsingAttrName(this, attrName, value);
    }

    taxFunction(taxableIncome) {
        let tax = 0;
        let previousLimit = 0;

        for (let slab of this.taxSlabs) {

            if (taxableIncome > slab.limit) {
                tax += (slab.limit - previousLimit) * slab.rate;
                previousLimit = slab.limit;
            } else {
                tax += (taxableIncome - previousLimit) * slab.rate;
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

    taxFunctionArrayOptimal(startIncome, endIncome = 1000000, step = 10000) {
        let curTaxSlab = 0;
        let ySize = Math.floor((endIncome - startIncome)/step + 1);
        let y = new Array(ySize), x = new Array(ySize);
        y[0] = this.taxFunction(startIncome)
        x[0] = startIncome;
        for (let income = startIncome + step, i = 1; income <= endIncome; income += step, i++) {
            if (income <= this.taxSlabs[curTaxSlab].limit) {
                /*  This signifies taxSlab is not changed
                    Additional income from previous is step,
                    Addition-Tax will be step * rate
                 */
                y[i] = y[i - 1] + step * this.taxSlabs[curTaxSlab].rate;
            } else {
                /* 
                    A taxSlab change is observed
                */
                let [prevTaxLimit, prevTaxRate] = [this.taxSlabs[curTaxSlab].limit, this.taxSlabs[curTaxSlab].rate];
                let [newTaxLimit, newTaxRate] = [this.taxSlabs[curTaxSlab + 1].limit, this.taxSlabs[curTaxSlab + 1].rate];
                curTaxSlab++;
                let incomePrevRate = prevTaxLimit - (income - step);
                let incomeCurRate = income - prevTaxLimit;
                y[i] = y[i - 1] + incomePrevRate * prevTaxRate + incomeCurRate*newTaxRate;
            }
            x[i] = income;
            
            /* A Test-Check (Uncomment for checking)
            if(y[i] != this.taxFunction(income)){
                console.log(`WARNING : MISMATCH from taxFunction : ${this.taxFunction(income)} :With OptimalArray calculation : ${y[i]} for Income : ${income}`)
            }
            */
            

        }
        return [x, y];
    }

    getOptimalStepSize(){
        /* You need a stepSize in such a way, that by taking one step, you should not jump one taxSlabs fully 
        (The optimal Calulation expects that)
        */
        let minSlabWidth = 1000000; // 10 Lakhs
        for(let i = 1 ;i < this.taxSlabs.length; i++){
            if(this.taxSlabs[i].limit != Infinity){
                let curWidth = this.taxSlabs[i].limit - this.taxSlabs[i - 1].limit;
                minSlabWidth = Math.min(minSlabWidth, curWidth);
            }
        }
        return minSlabWidth / 2;
    }

    getDataForPlot(period) {
        let startIncome = 0, endIncome = 5000000, step = 10000;
        step = this.getOptimalStepSize();
        // endIncome = 50000;
        let [x, y] = this.taxFunctionArrayOptimal(startIncome, endIncome, step);
        return [x, y];
    }



    getReactComponent(index, parentUpdateFxn, deleteFxn, duplicateFxn) {
        return <RawDataCard
            obj={this}
            index={index}
            parentUpdateFxn={parentUpdateFxn}
            deleteFxn={deleteFxn}
            duplicateFxn={duplicateFxn}
        />
    }

}

export { Tax }

