const svg = d3.select('.canvas')
  .append('svg')
  .attr('width', 600)
  .attr('height', 600);

/*--------------------------------
  SETUP
--------------------------------*/
// create margins and dimensions
const margin = {
  top: 20, right: 20, bottom: 100, left: 100,
};
const graphWidth = 600 - margin.left - margin.right;
const graphHeight = 600 - margin.top - margin.bottom;

const graph = svg.append('g')
  .attr('width', graphWidth)
  .attr('height', graphHeight)
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

const xAxisGroup = graph.append('g')
  .attr('transform', `translate(0, ${graphHeight})`);
const yAxisGroup = graph.append('g');

xAxisGroup.selectAll('text')
  .attr('transform', 'rotate(-30)')
  .attr('text-anchor', 'end')
  .attr('fill', 'darkorange');
// create scales
const y = d3.scaleLinear()
  .range([graphHeight, 0]);

const x = d3.scaleBand()
  .range([0, 500])
  .paddingInner(0.2)
  .paddingOuter(0.2);

// create and call the axis
const xAxis = d3.axisBottom(x);
const yAxis = d3.axisLeft(y).ticks(3).tickFormat(d => `${d} orders`);

// // NOT WORKING
// transitions
// const t = d3.transition().duration(1000);

/*--------------------------------
  UPDATE FUNCTION
--------------------------------*/
const update = (data) => {
  // updating scale domains
  y.domain([0, d3.max(data, d => d.orders)]);
  x.domain(data.map(item => item.name));

  // join the data to rects
  const rects = graph.selectAll('rect').data(data);

  // remove unwanted (if any) shapes from the DOM
  rects.exit().remove();

  // update current shapes in DOM
  rects.attr('fill', 'darkorange')
    .attr('width', x.bandwidth)
    .attr('x', d => x(d.name));

  // create virtual rects if more data than rects & append to DOM
  rects.enter()
    .append('rect')
    .attr('fill', 'darkorange')
    .attr('width', x.bandwidth)
    .attr('x', d => x(d.name))
    .attr('height', 0)
    .attr('y', graphHeight)
    .merge(rects)
    .transition()
    .duration(1000)
    .attr('y', d => y(d.orders))
    .attr('height', d => graphHeight - y(d.orders));

  // call axis
  xAxisGroup.call(xAxis);
  yAxisGroup.call(yAxis);
};

/*--------------------------------
  GET REALTIME DATA FROM FIREBASE
--------------------------------*/
let data = [];

db.collection('dishes').onSnapshot((res) => {
  res.docChanges().forEach((change) => {
    const doc = { ...change.doc.data(), id: change.doc.id };

    switch (change.type) {
      case 'added':
        data.push(doc);
        break;
      case 'removed':
        data = data.filter(item => item.id !== doc.id);
        break;
      case 'modified': {
        const index = data.findIndex(item => item.id === doc.id);
        data[index] = doc;
        break;
      }
      default:
        break;
    }
  });

  update(data);
});
