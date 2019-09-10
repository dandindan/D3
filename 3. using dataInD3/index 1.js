const data = [ {width:200, height:200, fill:"purple"}];

const svg = d3.select('svg');

svg.select('rect')
.data(data)
.attr('width', function(d,i,n){return d.width})
// i is the index n is the current selection
.attr('height', function(d){return d.height})
.attr('fill', function(d){return d.fill});
