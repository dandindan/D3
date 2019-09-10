const data = [{
    width: 200,
    height: 200,
    fill: "purple"
}];

const svg = d3.select('svg');

svg.select('rect')
    .data(data)
    .attr('width', (d, i, n) => d.width)
    // if its only one parameter no need for parentheses!!
    .attr('height', d => d.height)
    .attr('fill', d => d.fill);