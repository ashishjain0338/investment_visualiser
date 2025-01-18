import { RawDataCard } from "../components/cards/rawData_input";
import { updateObjUsingAttrName } from "./util";
import { convertCSVtoList } from "./util";

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

    updateField(attrName, value) {
        updateObjUsingAttrName(this, attrName, value);
    }

    calculateFromDays(days) {
        return convertCSVtoList(this.csv);
    }

    getReactComponent(index, parentUpdateFxn) {
        return <RawDataCard obj={this} index={index} parentUpdateFxn={parentUpdateFxn} />
    }

}

export { RawData }

