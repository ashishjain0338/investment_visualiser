import { FD } from "./fd";
import { RawData } from "./rawdata";

// Registry to map class names to classes
const classRegistry = {
  FD,
  RawData,
};

// Dump function
function DumpClass(instance) {
  return JSON.stringify({
    className: instance.getClassName(),
    ...instance,
  });
}

// Load function
function LoadClass(dumpedString) {
  const obj = JSON.parse(dumpedString);
  const { className, ...properties } = obj;

  if (!classRegistry[className]) {
    throw new Error(`Class "${className}" not found in registry.`);
  }

  // Create a new instance of the class and assign properties
  const instance = new classRegistry[className]();
  Object.assign(instance, properties);

  // return instance;
  return instance;
}

function DownloadData(data, filename) {
  const jsonBlob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json"
  });

  // Create a temporary anchor element for download
  const link = document.createElement("a");
  link.href = URL.createObjectURL(jsonBlob);
  link.download = filename; // Specify the file name
  link.click(); // Simulate a click to start the download
}

function saveToLocalStorage(key, obj) {
  localStorage.setItem(key, JSON.stringify(obj));
}

function loadFromLocalStorage(key) {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : null; // Convert back to an object
}

export { DumpClass, LoadClass, DownloadData, saveToLocalStorage, loadFromLocalStorage}