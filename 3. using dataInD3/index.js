const data = [ {width:200, height:200, fill:"purple"}];

const svg = d3.select('svg');

svg.select('rect')
.data(data)
.attr('width', (d,i,n) => {
    console.log(n[i])
    //the n[i] replace the this in arrow function
    return d.width})
.attr('height', function(d){
        console.log(this)
       // can use the this keyword in a regular function!
    return d.height})
.attr('fill', function(d){return d.fill});
