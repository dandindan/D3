 const svg = d3.select('svg');

 d3.json('menu.json').then(data => {

     const y = d3.scaleLinear()
         .domain([0, 1000])
         .range([0, 500]);

     const x = d3.scaleBand()
         .domain(data.map(item => item.name))
         .range([0, 500])
         .paddingInner(0.2)
         .paddingOuter(0.2);

     const min = d3.min(data, d => d.order);
     const max = d3.max(data, d => d.order);
     const extent = d3.extent(data, d => d.order);

     // join the data to he rects
     const rects = svg.selectAll('rect')
         .data(data)



     rects.attr('width', x.bandwidth)
         .attr('height', d => y(d.order))
         .attr('fill', "orange")
         .attr('x', d => x(d.name));

     // append enter to the DOM
     rects.enter()
         .append('rect')
         .attr('width', x.bandwidth)
         .attr('height', d => y(d.order))
         .attr('fill', "orange")
         .attr('x', d => x(d.name));

 })