const canvas = d3.select('.canvas');


const svg = canvas.append('svg')
.attr('height', 600)
.attr('width', 600);

const group = svg.append('g')
    .attr('transform','translate(50, 50)');

//Append shapes to svg conntainer
group.append('rect')
.attr('height',100)
.attr('width', 100)
.attr('x',20)
.attr('y',20)
.attr('fill' ,'purple');

group.append('circle')
.attr('r',50)
.attr('cx',220)
.attr('cy',70)
.attr('fill' ,'orange')
.attr('stroke',"green")
.attr('stroke-width', 10 );

group.append('line')
.attr('x1',300)
.attr('x2',350)
.attr('y1',20)
.attr('y2',120)
.attr('stroke','red')
.attr('stroke-width', 7 );

svg.append('text')
.attr('x',25)
.attr('y',250)
.attr('fill' ,'#006cff')
.text('Hello, Wold!')
.style('font-family','Rage')
.style('font-size',50)
.style('font-weight','bold')
.style('text-decoration', 'underline');

