import { RawDataCard } from "../components/cards/rawData_input";
import { convertCSVtoList, updateObjUsingAttrName, getYearQuaterinArray } from "./util";


class RawData {
    csv;

    constructor(title = "Raw-Data", csv = "") {
        this.csv = csv;
        this.title = title;
    }

    clone() {
        return new RawData(this.title, this.csv);
    }

    info() {
        console.log(`Raw-Data: ${this.csv}`)
    }

    getClassName(){
        return 'RawData';
    }

    updateField(attrName, value) {
        updateObjUsingAttrName(this, attrName, value);
    }

    getDataForPlot(days){
        let y = this.getData();
        let x = getYearQuaterinArray(y.length);
        return [x, y];
    }

    getData() {
        return convertCSVtoList(this.csv);
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

export { RawData }

