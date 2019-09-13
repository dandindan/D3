 
const svg = d3.select('svg');

d3.json('menu.json').then(data=>{
    // join the data to he rects
    const rects = svg.selectAll('rect')
    .data(data)


    
    rects.attr('width', 50)
    .attr('height', d => d.order)
    .attr('fill',"orange")
    .attr('x',(d,i)=> i*70);

    // append enter to the DOM
    rects.enter()
    .append('rect')
    .attr('width', 50)
    .attr('height', d => d.order)
    .attr('fill',"orange")
    .attr('x',(d,i)=> i*70);

})