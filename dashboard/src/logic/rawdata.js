import { RawDataCard } from "../components/cards/rawData_input";

class RawData{
    data;

    constructor(){
        this.data = [];
    }

    info(){
        console.log(`Raw-Data: ${this.data}`)
    }

    convertCSVtoList(csv){
        return 1
    }

    getReactComponent(){
        return <RawDataCard />
    }

}

export {RawData}

