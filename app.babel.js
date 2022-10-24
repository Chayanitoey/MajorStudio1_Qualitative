d3.select('.sankey-canvas')
    .style('position', 'absolute');

  const margin = { top: 100, right: 1, bottom: 6, left: 0 };
  const width = 1000 - margin.left - margin.right;
  const height = 1000 - margin.top - margin.bottom;

  const formatNumber = d3.format('.0%');
  const format = d => `${formatNumber(d)}`;
  const color = d3.scale.category20();

  const svg = d3.select('.sankey-graph')
    .style('position', 'absolute')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

  const sankey = d3.sankey()
    .nodeWidth(15)
    .nodePadding(10)
    .size([width, height]);

  const path = sankey.link();

  /* let freqCounter = 1; */


  d3.json('graph.json', graph => {
    sankey
      .nodes(graph.nodes)
      .links(graph.links)
      .layout(32);

    const link = svg.append('g').selectAll('.linkage')
      .data(graph.links)
      .enter().append('path')
        .attr('class', 'linkage')
        .attr('d', path)
        .style('stroke-width', d => Math.max(1, d.dy))
        .style({
          fill: 'none',
          stroke: '#000',
          'stroke-opacity': 0.15
        })
        .sort((a, b) => b.dy - a.dy)

    link
      .on('mouseover', function () {
        d3.select(this)
          .style('stroke-opacity', 0.25);
      })
      .on('mouseout', function () {
        d3.select(this)
          .style('stroke-opacity', 0.15);
      });

    link.append('title')
      .text(d => `${format(d.label)} of ${d.source.name} → ${d.target.name}\n${format(d.value)} of ${graph.nodes[0].name}`)

    const node = svg.append('g').selectAll('.node_sankey')
      .data(graph.nodes)
      .enter().append('g')
        .attr('class', 'node_sankey')
        .attr('transform', d => `translate(${d.x}, ${d.y})`)
        .call(d3.behavior.drag()
        .origin(d => d)
        .on('dragstart', function () { this.parentNode.appendChild(this); })
        .on('drag', dragmove));

    node.append('rect')
      .attr('height', d => d.dy)
      .attr('width', sankey.nodeWidth())
      .style('fill', (d, i) => {
        // d.color = color(d.name.replace(/ .*/, ''));
        d.color = color(i);
        return d.color;
      })
      .style({
        stroke: 'none',
        cursor: 'move',
        'fill-opacity': 0.9,
        'shape-rendering': 'crispEdges'
      })
      .append('title')
        .text(d => `${format(d.value)} ${d.name}`);

    node.append('text')
      .attr('x', -6)
      .attr('y', d => d.dy / 2)
      .attr('dy', '.35em')
      .attr('text-anchor', 'end')
      .attr('transform', null)
      .style({
        'pointer-events': 'none',
        'text-shadow': '0 1px 0 #fff',
        'font-size': '12px'

      })
      .text(d => d.name)
      .filter(d => d.x < width / 2)
        .attr('x', 6 + sankey.nodeWidth())
        .attr('text-anchor', 'start')
        .style('font-size', '12px');

    function dragmove(d) {
      d3.select(this)
        .attr('transform', `translate(${d.x}, ${(d.y = Math.max(0, Math.min(height - d.dy, d3.event.y)))})`);
      sankey.relayout();
      link.attr('d', path);
    }

    const linkExtent = d3.extent(graph.links, d => d.value);

    const frequencyScale = d3.scale.linear()
      .domain(linkExtent)
      .range([0.05, 1]);

    /* const particleSize = */ d3.scale.linear()
      .domain(linkExtent)
      .range([1, 5]);

    graph.links.forEach(currentLink => {
      currentLink.freq = frequencyScale(currentLink.value);
      currentLink.particleSize = 2;
      currentLink.particleColor = d3.scale.linear().domain([0, 1])
      .range([currentLink.source.color, currentLink.target.color]);
    });

    /* const t = */ d3.timer(tick, 1000);
    let particles = [];

    function tick(elapsed /* , time */) {
      particles = particles.filter(d => d.current < d.path.getTotalLength());

      d3.selectAll('path.linkage')
      .each(
        function (d) {
  //        if (d.freq < 1) {
          for (let x = 0; x < 2; x++) {
            const offset = (Math.random() - 0.5) * (d.dy - 4);
            if (Math.random() < d.freq) {
              const length = this.getTotalLength();
              particles.push({
                link: d,
                time: elapsed,
                offset,
                path: this,
                length,
                animateTime: length,
                speed: 0.5 + (Math.random())
              });
            }
          }
  //        }
  /*        else {
            for (let x = 0; x<d.freq; x++) {
              let offset = (Math.random() - .5) * d.dy;
              particles.push({link: d, time: elapsed, offset: offset, path: this})
            }
          } */
        });

      particleEdgeCanvasPath(elapsed);
    }

    function particleEdgeCanvasPath(elapsed) {
      const context = d3.select('.sankey-canvas').node().getContext('2d');

      context.clearRect(0, 0, 1000, 1000);

      context.fillStyle = 'gray';
      context.lineWidth = '1px';
      for (const x in particles) {
        if ({}.hasOwnProperty.call(particles, x)) {
          const currentTime = elapsed - particles[x].time;
  //        let currentPercent = currentTime / 1000 * particles[x].path.getTotalLength();
          particles[x].current = currentTime * 0.15 * particles[x].speed;
          const currentPos = particles[x].path.getPointAtLength(particles[x].current);
          context.beginPath();
          context.fillStyle = particles[x].link.particleColor(0);
          context.arc(
            currentPos.x,
            currentPos.y + particles[x].offset,
            particles[x].link.particleSize,
            0,
            2 * Math.PI
          );
          context.fill();
        }
      }
    }
  });