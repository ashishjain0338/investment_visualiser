import { daysToQuaters, convertPeriodToYears, updateObjUsingAttrName } from "./util.js";

class FD{
    #private_attr
    data;

    /*
     Cumulative_freq will be:
        0 : None
        1: Monthly
        4: Quatery
        6: 6months
        12: Anually
    */
    constructor(principal, rate, cumulative_freq = 0){
        this.principal = principal;
        this.rate = rate/100;
        this.cumulative_freq = cumulative_freq;
        this.data = [];
        this.#private_attr = -1;
    }

    info(){
        console.log(`Principal: ${this.principal}, Rate: ${this.rate} %`)
    }

    /*
        Period must be in quaters
    */
    calculate(period){
        // let out = new Float32Array(period + 1); // Quaterly data
        let out = new Array(period + 1);
        let quaterInterest = 0;
        switch(this.cumulative_freq){
            
            case 0:
                // Simple-Interest
                quaterInterest = this.principal*this.rate/4;
                out[0] = this.principal;
                for(let i = 1;i < out.length; i++){
                    out[i] = out[i - 1] + quaterInterest;
                }

                break;
            case 1:
                let monthlyInterest = this.principal*this.rate/12;
                let k = 1;
                out[0] = this.principal;
                let cur = this.principal;
                for(let i = 0;i < 3*period; i++){
                    cur += monthlyInterest;
                    // Month passed, Update interest
                    monthlyInterest = cur*this.rate/12;
                    if(i % 3 == 2){
                        // 3-Months passed, Update in out
                        out[k++] = cur;
                    }
                }
                break;
            case 4:
                // Quateryly Cumulative
                quaterInterest = this.principal*this.rate/4;
                out[0] = this.principal;
                for(let i = 1;i < out.length; i++){
                    out[i] = out[i - 1] + quaterInterest;
                    // Quater has passed, Update Interest
                    quaterInterest = out[i]*this.rate/4;
                    
                }
                break;
            case 6:
                // Twice in year Cumulative
                quaterInterest = this.principal*this.rate/4;
                out[0] = this.principal;
                for(let i = 1;i < out.length; i++){
                    
                    out[i] = out[i - 1] + quaterInterest;
                    if(i % 2 == 0){
                        // 6 Months has passed, Update Interest
                        quaterInterest = out[i]*this.rate/4;
                    }
                }
                break;
            case 12:
                // Annual Cumulative
                quaterInterest = this.principal*this.rate/4;
                out[0] = this.principal;
                for(let i = 1;i < out.length; i++){
                    
                    out[i] = out[i - 1] + quaterInterest;
                    if(i % 4 == 0){
                        // Year has passed, Update Interest
                        quaterInterest = out[i]*this.rate/4;
                    }
                }
                break;
        }
        // console.log(out);
        this.data = out;
        return out;
    }

    /*
        Format refers to type of period
        d: days
        m: months
        q: quarters
        y: years
    */
    byFormula(period, format='y'){

        let time = convertPeriodToYears(period, format);
        console.debug("byFormula-period : ", time);
        let out = -1;
        switch(this.cumulative_freq){
            case 0:
                out = this.principal + this.principal*this.rate*time;
                break;
            case 1:
                out = this.principal * (1 + this.rate/12)**(12*time);
                break;
            case 4:
                out = this.principal * (1 + this.rate/4)**(4*time);
                break;
            case 6:
                out = this.principal * (1 + this.rate/2)**(2*time);
                break;
            case 12:
                out = this.principal * (1 + this.rate)**time;
                break;
        }
        return out;
    }

    /* 
        Period is in days,
        The current implementation may produce slight inaccuracies when cumulative_freq equals 1, with deviations potentially around 0.1%
    */
   calculateFromDays(days){
        // console.log("Here -->", daysToQuaters(days));
        const [quaterCount, daysLeft] = daysToQuaters(days);
        let out = this.calculate(quaterCount);
        // For rest-days
        let interestLastDays = 0;
        switch(this.cumulative_freq){
            case 0:
                interestLastDays = this.principal*this.rate*daysLeft/365;
                break;
            case 1: 
            case 4:
            case 6:
            case 12:
                interestLastDays = (out[out.length - 1])*this.rate*daysLeft/365;
                break;
            default:
                console.error(`Cumulative-Frequency ${this.cumulative_freq} NOT SUPPORTED`)

        }
        out.push(out[out.length - 1] + interestLastDays);
        return out; 
   }

}

function big_test_suite(years){
    for(let i = 1; i <= 4*years; i++){
        console.log("Case : Quaters = ", i);
        test_suite(i);
    }
    console.log("-------------------DAY CASE START -------------------------------");
    for(let i = 400; i <= 500; i++){
        console.log("Case : Days = ", i);
        test_suite_days(i);
    }

}

function test_suite(quaterCount){
    let period = quaterCount;// Quaters
    const obj = new FD(100, 10);
    // Simple-Interest Test
    console.debug("Simple-Interest Test");
    let data = obj.calculate(period);
    let got = data[data.length - 1]; 
    let expected = obj.byFormula(period, 'q');
    console.assert(got == expected, "Simple-Interest : Test-Failed: Not equal " + `${got} == ${expected}`);

    console.debug("Monthly-Cumulative Test");
    obj.cumulative_freq = 1;
    data = obj.calculate(period);
    got = data[data.length - 1]; 
    expected = obj.byFormula(period, 'q');
    console.assert(Math.abs(got - expected) <= 2, "Compund-Interest-Compunded-Monthly : Test-Failed: Not equal " + `${got} == ${expected}`);

    console.debug("Quaterly-Cumulative Test");
    obj.cumulative_freq = 4;
    data = obj.calculate(period);
    got = data[data.length - 1]; 
    expected = obj.byFormula(period, 'q');
    console.assert(Math.abs(got - expected) <= 2, "Compund-Interest-Compunded-6-Months : Test-Failed: Not equal " + `${got} == ${expected}`);

    console.debug("6-Months-Cumulative Test");
    obj.cumulative_freq = 6;
    data = obj.calculate(period);
    got = data[data.length - 1]; 
    expected = obj.byFormula(period, 'q');
    console.assert(Math.abs(got - expected) <= 2, "Compund-Interest-Compunded-6-Months : Test-Failed: Not equal " + `${got} == ${expected}`);

    console.debug("Annual-Cumulative Test");
    obj.cumulative_freq = 12;
    data = obj.calculate(period);
    got = data[data.length - 1]; 
    expected = obj.byFormula(period, 'q');
    console.assert(Math.abs(got - expected) <= 2, "Compund-Interest-Compunded-annually : Test-Failed: Not equal " + `${got} == ${expected}`);
}

function test_suite_days(days){
    let period = days;// Quaters
    const obj = new FD(1000, 10);
    // Simple-Interest Test
    console.debug("Simple-Interest Test");
    let data = obj.calculateFromDays(period);
    let got = data[data.length - 1]; 
    let expected = obj.byFormula(period, 'd');
    console.assert(Math.abs(got - expected) <= 2, "Simple-Interest : Test-Failed: Not equal " + `${got} == ${expected}`);

    console.debug("Monthly-Cumulative Test");
    obj.cumulative_freq = 1;
    data = obj.calculateFromDays(period);
    got = data[data.length - 1]; 
    expected = obj.byFormula(period, 'd');
    console.assert(Math.abs(got - expected) <= 2, "Compund-Interest-Compunded-Monthly : Test-Failed: Not equal " + `${got} == ${expected}`);
    

    console.debug("Quaterly-Cumulative Test");
    obj.cumulative_freq = 4;
    data = obj.calculateFromDays(period);
    got = data[data.length - 1]; 
    expected = obj.byFormula(period, 'd');
    console.assert(Math.abs(got - expected) <= 2, "Compund-Interest-Compunded-6-Months : Test-Failed: Not equal " + `${got} == ${expected}`);

    console.debug("6-Months-Cumulative Test");
    obj.cumulative_freq = 6;
    data = obj.calculateFromDays(period);
    got = data[data.length - 1]; 
    expected = obj.byFormula(period, 'd');
    console.assert(Math.abs(got - expected) <= 2, "Compund-Interest-Compunded-6-Months : Test-Failed: Not equal " + `${got} == ${expected}`);

    console.debug("Annual-Cumulative Test");
    obj.cumulative_freq = 12;
    data = obj.calculateFromDays(period);
    got = data[data.length - 1]; 
    expected = obj.byFormula(period, 'd');
    console.assert(Math.abs(got - expected) <= 2, "Compund-Interest-Compunded-annually : Test-Failed: Not equal " + `${got} == ${expected}`);
}


function main(){
    console.debug = () => {};
    // big_test_suite(5);
    // test_suite(10);
    // const obj = new FD(100, 10);
    // let period = 4;
    // console.debug("Monthly-Cumulative Test");
    // obj.cumulative_freq = 1;
    // let data = obj.calculate(period);
    // let got = data[data.length - 1]; 
    // let expected = obj.byFormula(period, 'q');
    // console.assert(Math.abs(got - expected) <= 2, "Compund-Interest-Compunded-Monthly : Test-Failed: Not equal " + `${got} == ${expected}`);

    
    const obj = new FD(1000, 10);
    console.log(obj)
    updateObjUsingAttrName(obj, "principal", 123);
    
    updateObjUsingAttrName(obj, "principal2", 123);
    console.log(obj)
}

main();
