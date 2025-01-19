import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const Play = () => {
  const [jsonData, setJsonData] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file && file.type === "application/json") {
      const reader = new FileReader();

      reader.onload = () => {
        try {
          // Parse the JSON data
          const parsedData = JSON.parse(reader.result);
          setJsonData(parsedData); // Store the parsed data in state
        } catch (error) {
          alert("Invalid JSON file");
        }
      };

      reader.readAsText(file); // Read the file as text
    } else {
      alert("Please upload a valid JSON file");
    }
  };

  return (
    <div>
      <Form>
        {/* Hidden file input */}
        <input
          type="file"
          accept=".json"
          onChange={handleFileChange}
          id="jsonFileInput"
          style={{ display: "none" }} // Hide the default file input
        />
        {/* Custom button styled as "Load" */}
        <Button 
          variant="primary" 
          onClick={() => document.getElementById('jsonFileInput').click()} 
        >
          Load
        </Button>
      </Form>
      
      {jsonData && (
        <div>
          <h3>Parsed JSON Data:</h3>
          <pre>{JSON.stringify(jsonData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export {Play};
