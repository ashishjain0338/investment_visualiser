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
      className: instance.constructor.name,
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
  
export {DumpClass, LoadClass}