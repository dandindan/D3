const canvas = d3.select('.canvas');


const svg = canvas.append('svg')
.attr('height', 600)
.attr('width', 600);

//Append shapes to svg conntainer

svg.append('rect')
.attr('height',100)
.attr('width', 100)
.attr('x',20)
.attr('y',20)
.attr('fill' ,'purple');

svg.append('circle')
.attr('r',50)
.attr('cx',220)
.attr('cy',70)
.attr('fill' ,'orange')
.attr('stroke',"green")
.attr('stroke-width', 10 );

svg.append('line')
.attr('x1',300)
.attr('x2',350)
.attr('y1',20)
.attr('y2',120)
.attr('stroke','red')
.attr('stroke-width', 7 );
