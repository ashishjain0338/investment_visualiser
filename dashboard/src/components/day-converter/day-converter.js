import { useState, useEffect } from "react"
import { InputGroup, Form } from "react-bootstrap";

function DayConverter() {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [out, setOut] = useState("");

  function getInteger(val){
    val = parseInt(val);
    if (isNaN(val)) {
      val = 0;
    }
    return val;
  }

  useEffect(() => {
    let y = getInteger(year), m = getInteger(month), d = getInteger(day);
    let converted = 365 * y + (30.5) * m + d;
    setOut(converted);
  },
    [year, month, day]
  )

  return (
    <div>
      <InputGroup className="mb-3">
        <Form.Control aria-label="Year"
          defaultValue={year}
          onChange={(e) => { setYear(e.target.value) }}
        />
        <InputGroup.Text>Year</InputGroup.Text>

        <Form.Control aria-label="Month"
          defaultValue={month}
          onChange={(e) => { setMonth(e.target.value) }}
        />
        <InputGroup.Text>Month</InputGroup.Text>
        <Form.Control aria-label="Days"
          defaultValue={day}
          onChange={(e) => { setDay(e.target.value) }}
        />
        <InputGroup.Text>Days</InputGroup.Text>
        <InputGroup.Text>=</InputGroup.Text>
        <Form.Control aria-label="Days"
          defaultValue={out}
          disabled
        />
      </InputGroup>
    </div>
  )
}

export { DayConverter }