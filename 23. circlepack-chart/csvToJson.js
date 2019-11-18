var blob = new Blob([JSON.stringify(json)], {type: "text/plain;charset=utf-8"});  
saveAs(blob, "hsa.JSON");
// hsa_Nagaraj_2011.csv
// https://stackoverflow.com/questions/46399237/how-to-save-json-data-built-in-a-d3-js-script