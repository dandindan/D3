document.addEventListener("DOMContentLoaded", function (event) {     

    /**
     * This script fetches data from a json file and prepares it for D3 drawing.
     */
    
    /**
    * Useful links
    * https://medium.com/dailyjs/the-trouble-with-d3-4a84f7de011f
    * http://learnjsdata.com
    * https://stackoverflow.com/questions/tagged/d3.js
    */
    
      d3.json("flare.json", function (error, data) {
        if (error)
          throw error;
    
        var docs = data.response.docs;
    
        var sorted = docs.sort(function (a, b) {
          return a.status - b.status;
        });
    
        var mapped = docs.map(function (d, i) {
          if (!d.hasOwnProperty('brand') || d.brand.trim() == '' || d.brand.trim().toLowerCase() == 'unknown') {
            d.brand = 'Unknown';
          }
          switch (d.status) {
            case 1:
              d.status = 'Fixed';
              break;
            case 2:
              d.status = 'Repairable';
              break;
            case 3:
              d.status = 'End of life';
              break;
            default:
              d.status = 'Unknown';
          }
          return d;
        });
    
        var vizData = d3.nest()
                .key(function (d) {
                  return d.cluster;
                }).sortKeys(d3.ascending)
                .key(function (d) {
                  return d.status;
                }).sortKeys(d3.ascending)
                .key(function (d) {
                  return d.category;
                }).sortKeys(d3.ascending)
                .key(function (d) {
                  return d.brand;
                }).sortKeys(d3.ascending)
                .rollup(function (v) {
                  return v.length;
                })
                .entries(docs);
    //    console.log(vizData);
    //    console.log(JSON.stringify(vizData, null, '\t'));
    
        var root = d3.hierarchy({values: vizData}, function (d) {
          return d.values
        })
                .sum(function (d) {
                  if (d.hasOwnProperty('value')) {
                    return d.value;
                  } else if (d.hasOwnProperty('values')) {
                    return d.values.length;
                  }
                  return 0;
                })
                .sort(function (a, b) {
                  return b.value - a.value;
                });
        draw(root);
        
      });
    
    });