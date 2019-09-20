const dims = { height: 300, width: 300, radius: 150 };
const cent = { x: (dims.width / 2 + 5), y: (dims.height / 2 + 5)};
// #67 - https://github.com/iamshaunjp/data-ui-with-d3-firebase/tree/lesson-67
// create svg container
const svg = d3.select('.canvas')
  .append('svg')
  .attr('width', dims.width + 150)
  .attr('height', dims.height + 150);

const graph = svg.append('g')
  .attr("transform", `translate(${cent.x}, ${cent.y})`);
  // translates the graph group to the middle of the svg container

  
//const te = d3.easeBounceIn(t);

const pie = d3.pie()
  .sort(null)
  .value(d => d.cost);
  // the value we are evaluating to create the pie angles

const arcPath = d3.arc()
  .outerRadius(dims.radius)
  .innerRadius(dims.radius/3);

  const arcPathOver = d3.arc()
  .outerRadius(dims.radius +10)
  .innerRadius(dims.radius/3 -20);

// ordianl colour scale
const colour = d3.scaleOrdinal(d3["schemeCategory10"]);

// legend setup
const legendGroup = svg.append('g')
  .attr('transform', `translate(${dims.width + 40}, 10)`)

const legend = d3.legendColor()
  .shape('path', d3.symbol().type(d3.symbolCircle)())
  .shapePadding(15)
  .scale(colour)
//   .legendSize.scale(10)

// tooltips
const tip = d3.tip()
  .attr('class', 'tip card')
  .html(d => {
    let content = `<div class="name">item: ${d.data.name}</div>`;
    content += `<div class="cost">cost: $${d.data.cost}</div>`;
    content += `<div class="delete">Click slice to delete</div>`
    return content;
  });

graph.call(tip);

// update function
const update = (data) => {

  // update colour scale domain
  colour.domain(data.map(d => d.name));

   // update legend
   legendGroup.call(legend);
   legendGroup.selectAll('text')
    .attr('fill', 'white')
    .style('font-size',20);
  
  // join enhanced (pie) data to path elements
  const paths = graph.selectAll('path')
    .data(pie(data));

 // handle the exit selection
    paths.exit()
    .transition().duration(750)
    .attrTween("d", arcTweenExit)
    .remove();   

 // handle the current DOM path update
    paths.transition().duration(1750)
    .attrTween("d", arcTweenUpdate);
    // paths.attr('d', arcPath);

//   console.log(paths);

  paths.enter()
    .append('path')
      .attr('class', 'arc') 
 //   .attr('d', arcPath)
      .attr('stroke', '#000')
      .attr('stroke-width', 1)
      .attr('fill', d => colour(d.data.name))
      .transition().duration(1750).attrTween("d", arcTweenEnter);


 // add events
 graph.selectAll('path')
 .on('mouseover', (d,i,n) => {
   tip.show(d, n[i]);
   handleMouseOver(d, i, n);
 })
 .on('mouseout', (d,i,n) => {
   tip.hide();
   handleMouseOut(d, i, n);
 })
 .on('click', handleClick);

};


// data array and firestore
var data = [];

db.collection('expenses').orderBy('cost').onSnapshot(res => {

  res.docChanges().forEach(change => {

    const doc = {...change.doc.data(), id: change.doc.id};

    switch (change.type) {
      case 'added':
        data.push(doc);
        break;
      case 'modified':
        const index = data.findIndex(item => item.id == doc.id);
        data[index] = doc;
        break;
      case 'removed':
        data = data.filter(item => item.id !== doc.id);
        break;
      default:
        break;
    }

  });

  // call the update function
  update(data);

});

const arcTweenEnter = (d) => {
    var i = d3.interpolate(d.endAngle-0.1, d.startAngle);
  
    return function(t) {
      d.startAngle = i(t);
      return arcPath(d);
    };
  };
  const arcTweenExit = (d) => {
    var i = d3.interpolate(d.startAngle, d.endAngle);
  
    return function(t) {
      d.startAngle = i(t);
      return arcPath(d);
    };
  };
  
  // use function keyword to allow use of 'this'
  function arcTweenUpdate(d) {
    // console.log(this._current, d);
    // interpolate between the two objects
    var i = d3.interpolate(this._current, d);
    // update the current prop with new updated data
    this._current = i(1);
  
    return function(t) {
      // i(t) returns a value of d (data object) which we pass to arcPath
      return arcPath(i(t));
    };
  };

  // event handlers
const handleMouseOver = (d,i,n) => {
  //console.log(n[i]);
  name.value = "";
  cost.value = "";
  error.textContent = "";
  d3.select(n[i])
    .transition('changeSliceFill')
      .ease(d3.easeElasticOut.amplitude(1.5).period(0.15))
      .duration(1700)
      .attr('fill', d3.hsl(colour(d.data.name)).darker(0.6)) //brighter(0.5)
      .attr('d', arcPathOver)
      .attr('stroke', '#fff')
      .attr('stroke-width', 2);
};

const handleMouseOut = (d,i,n) => {
  //console.log(n[i]);
  d3.select(n[i])
    .transition('changeSliceFill').duration(300)
      .attr('fill', colour(d.data.name))
      .attr('d', arcPath)
      .attr('stroke', '#000')
      .attr('stroke-width', 1);
};

const handleClick = (d) => {
  const id = d.data.id;
  db.collection('expenses').doc(id).delete();
};