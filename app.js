//first add scroll to show progress bar
const progressbar = document.querySelector('progress');
const article = document.querySelector('article');

let isScrolling = false;

document.addEventListener('scroll', e => isScrolling = true);

render();

function render() {

  requestAnimationFrame(render);

  if (!isScrolling) return;

  progressbar.value = window.scrollY / (article.offsetHeight - window.innerHeight) * 100;

  isScrolling = false;

}


var w = window.innerWidth;
var h = window.innerHeight ;

//making the country list 
// storying all the data from json to arr array
let arr =[]

 d3.json('Data/municipleWaste.json').then(function (data) {

    arr.push(data);
    
    let country = data.map(d => d.Country);

    for(var i =0; i < country.length; i++){
        let list = document.getElementById("myList");
        const node = document.createElement("option");
        const textnode = document.createTextNode(country[i]);
        node.appendChild(textnode);
        document.getElementById("myList").appendChild(node);

    }



});

var dataset = {
    "nodes": [
        { 
            "name" : "Collection",
            "id": 0
        },
        { 
            "name" : "Waste Pre-Treatment",
            "id": 1
        },
        { 
            "name" : "Exported Waste",
            "id": 2
        },
        { 
            "name" : "Sorting",
            "id": 3
        },
        { 
            "name" : "Biological Treatment",
            "id": 4
        },
        { 
            "name" : "Waste Treatment",
            "id": 5
        },
        { 
            "name" : "Incineration to generate energy",
            "id": 6
        },
        { 
            "name" : "Composting",
            "id": 7
        },
        { 
            "name" : "Waste Recovery",
            "id": 8
        },
        { 
            "name" : "Re-Use",
            "id": 9
        },
        { 
            "name" : "Recycling",
            "id": 10
        },
        { 
            "name" : "Waste Disposal",
            "id": 11
        },
        { 
            "name" : "Landfill",
            "id": 12
        },
        { 
            "name" : "Incineration",
            "id": 13
        },
        { 
            "name" : "Other",
            "id": 14
        }
    ],
    "links":[
        {
            "source": 0,
            "target": 1,
            "value": 0.5,
            "label": 0.5
        },
        {
            "source": 0,
            "target": 2,
            "value": 0.1,
            "label": 0.1
        },
        {
            "source": 1,
            "target": 3,
            "value": 0.1,
            "label": 0.
        },
        {
            "source": 1,
            "target": 4,
            "value": 0.2,
            "label": 0.3
        },
        {
            "source": 4,
            "target": 5,
            "value": 0.2,
            "label": 0.3
        },
        {
            "source": 5,
            "target": 6,
            "value": 0.2,
            "label": 0.09
        },
        {
            "source": 5,
            "target": 7,
            "value": 0.2,
            "label": 0.2
        },
        {
            "source": 3,
            "target": 8,
            "value": 0.3,
            "label": 0.3
        },
        {
            "source": 3,
            "target": 11,
            "value": 0.3,
            "label":0.2
        },
        {
            "source": 8,
            "target": 9,
            "value": 0.3,
            "label":0.2
        },
        {
            "source": 8,
            "target": 10,
            "value": 0.3,
            "label":0.3
        }, 
        {
            "source": 11,
            "target": 12,
            "value": 0.1,
            "label":0.1
        },
        {
            "source": 11,
            "target": 13,
            "value": 0.3,
            "label":0.1
        },
        {
            "source": 11,
            "target": 14,
            "value": 0.1,
            "label":0.1
        }
    
    ]
    
}


let landfilled = 0 ;
let Incinerated = 0;
let Recycled = 0;
let Composted = 0;
let Other = 0;
let Reuse = 0;
let Inceneration_to_energy = 0;
let Exported_Waste = 0;

// console.log(dataset.links[0].value)


function getListValue() {
 var selectedOption = document.getElementById("myList").selectedIndex;
 var st = document.getElementById("myList").options[selectedOption].value

    let firstArray = arr[0]

    for(var i = 0; i < firstArray.length; i++){
        if( st == firstArray[i].Country){
            // var num = firstArray[i].Average_waste_per_capita;
           var data = firstArray[i];
            console.log(data);
            createCircle(data);
            
      


            
             //Updating the particle size based on the selected country
            if(data.Exported_Waste != 0){
            document.getElementById('exportWaste').innerHTML = data.Exported_Waste;
            }
            
            if(data.landfilled != 0){
            document.getElementById('landFill').innerHTML = data.landfilled;
            }
            
            if(data.Incinerated != 0){
            document.getElementById('incinerate').innerHTML = data.Incinerated;
            }
            
            if(data.Recycled != 0){
            document.getElementById('recycled').innerHTML = data.Recycled;
            }
            
            if(data.Composted != 0){
            document.getElementById('composted').innerHTML = data.Composted;
            }
            
            if(data.Reuse != 0){
            document.getElementById('re_use').innerHTML = data.Reuse;
            }
            
            if(data.Inceneration_to_energy != 0){
            document.getElementById('incinerateToEnergy').innerHTML = data.Inceneration_to_energy;
            }




            
            //declaring the percentage of waste management of the selected country
           
           
            //landfilled is target num 12 , 11th element in the link array
             dataset.links[11].value = (data.landfilled /10);
            //Incineration is target 13 , 12th element 
             dataset.links[12].value = (data.Incinerated  /10);
             //Recycled is target 10, 10th element 
             dataset.links[10].value = data.Recycled /10 ;
             //Composted is target 7, 6th element
              dataset.links[6].value = data.Composted /10 ;
             //Other is target 14, 13th element
              dataset.links[13].value = data.Other /10;
             //Reuse is target 9, 9th element
             dataset.links[9].value = data.Reuse /10 ;
             //Inceneration_to_energy is target 6, 5th element 
             dataset.links[5].value = data.Inceneration_to_energy /10 ;
             //Exported_Waste is target 2, 2nd element in the link array
             dataset.links[1].value = data.Exported_Waste /10 ;
             //Waste Recovery is target 8, 8th element in the link array ** it combines waste reuse and recycling 
             dataset.links[7].value = (data.Reuse /10 )+ (data.Recycled/10);
             //Waste Disposal is target 11, 9th element in the link array ** it combines Landfill, Incineration, Other 
             dataset.links[8].value = (data.landfilled/10) + (data.Incinerated/10) + (data.Other/10);
              //Waste Treatment is target 5, 5th element in the link array ** it combines inceneration to energy and Compoosting  
             dataset.links[4].value = (data.Inceneration_to_energy /10) + (data.Composted/10);
              //Sorting is target 3, 3rd element in the link array ** it combines waste recovery and waste disposal  
             dataset.links[2].value =  ((data.Reuse /10 )+ (data.Recycled/10)) + ((data.landfilled/10) + (data.Incinerated/10) + (data.Other/10)) ;
             
            //Biological treatment is target 4, 4th element in the link array ** it is essentially waste treatment   
             dataset.links[3].value =  (data.Inceneration_to_energy /10) + (data.Composted/10);

              //Waste Pre-treatmnt is target 1, 1st element in the link array ** it combines biological treatmnt and sorting
             dataset.links[0].value =  ((data.Reuse /10 )+ (data.Recycled/10)) + ((data.landfilled/10) + (data.Incinerated/10) + (data.Other/10)) + (data.Inceneration_to_energy /10) + (data.Composted/10);



              
            makegraph(dataset)
            
            
            
            //DOM manipulation updating the html text ** to reflect selected country
   
            document.getElementById('year').innerHTML = data.Year;
            document.getElementById('countryName').innerHTML = data.Country;
            document.getElementById('countryName1').innerHTML = data.Country;
            document.getElementById('countryName2').innerHTML = data.Country;
            document.getElementById('wasteCollected').innerHTML = data.Municipal_waste_collected;
            document.getElementById('wasteCollected2').innerHTML = data.Municipal_waste_collected;
            document.getElementById('year2').innerHTML = data.Year;
            document.getElementById('exportedWaste2').innerHTML = data.Exported_Waste + ' %';
            document.getElementById('wastePretreatment2').innerHTML =  Math.round(dataset.links[0].value * 10) + ' %';
            document.getElementById('incinerateToEnergy2').innerHTML = data.Inceneration_to_energy + ' %';
            document.getElementById('composting2').innerHTML = data.Composted + ' %';
            document.getElementById('landfill2').innerHTML = data.landfilled + ' %';
            document.getElementById('incineration2').innerHTML = data.Incinerated + ' %';
            document.getElementById('wasteRecovery2').innerHTML = Math.round(dataset.links[7].value * 10)+ ' %';



            
            console.log('landfilled',dataset.links[11].value)
            console.log('Incinerated',dataset.links[12].value)
            console.log('Recycled',dataset.links[10].value)
            console.log('Composted',dataset.links[6].value)
            console.log('Other',dataset.links[13].value)
            console.log('Reuse',dataset.links[9].value)
            console.log('Inceneration_to_energy',dataset.links[5].value)
            console.log('Exported_Waste',dataset.links[1].value)
            
            }
    
    }

}



//creating sankey of that country 
function makegraph(graph) {


  let freqCounter = 1; 
  d3.select('#svg_Sankey_country').remove();


    
    
  const margin = { top: 1, right: 1, bottom: 6, left: 0 };
  const width = 2300 - margin.left - margin.right;
  const height = 1000 - margin.top - margin.bottom;

  const formatNumber = d3.format('.0%');
  const format = d => `${formatNumber(d)}`;
  const color = d3.scale.category20c();
  
  //   const canvas = 
  d3.select('#allCountry_canvas')
    .style('position', 'absolute')
    .attr('width', 2300)
    .attr('height', 1000);

  const svg = d3.select('#svg_sankey')
    .style('position', 'absolute')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
      .attr('id','svg_Sankey_country')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

  const sankey = d3.sankey()
    .nodeWidth(15)
    .nodePadding(10)
    .size([width, height]);

  const path = sankey.link();

    sankey
      .nodes(graph.nodes)
      .links(graph.links)
      .layout(32);

    const link = svg.append('g').selectAll('.link2')
      .data(graph.links)
      .enter()
      .append('path')
        .attr('class', 'link2')
        .attr('d', path)
        .style('stroke-width', d => Math.max(1, d.dy))
        .style({
          fill: 'none',
          stroke: '#000',
          'stroke-opacity': 0.15
        })
        .sort((a, b) => b.dy - a.dy)

    // link.on('mouseover', function () {
    //     d3.select(this)
    //       .style('stroke-opacity', 0.25);
    //   })
    //   .on('mouseout', function () {
    //     d3.select(this)
    //       .style('stroke-opacity', 0.15);
    //   });
	



    //   link.on("mouseover", function(d) {      
      
    //     });
    
    // rect.on("mouseover", function(d) {      
                
    //         })                  
   
  
    
         	  	  

    link.append('title')
    .text(function(d) {
            return d.source.name + " → " + 
                d.target.name + "\n" + format(d.value/10); });
                
    //   .text(d => `${format(d.label)} of ${d.source.name} → ${d.target.name}\n${format(d.value)} of ${graph.nodes[0].name}`)

    const node = svg.append('g').selectAll('.node')
      .data(graph.nodes)
      .enter().append('g')
        .attr('class', 'node')
        .attr('transform', d => `translate(${d.x}, ${d.y})`)
        .call(d3.behavior.drag()
        .origin(d => d)
        .on('dragstart', function () { this.parentNode.appendChild(this); })
        .on('drag', dragmove));

    node.append('rect')
      .attr('height', d => d.dy)
      .attr('width', sankey.nodeWidth())
      .style('fill', (d, i) => {
        d.color = color(d.name.replace(/ .*/, ''));
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
        'font-family' : 'Lato',
        'font-weight': '200',
        'pointer-events': 'none',
        'fill': 'rgba(255,255,255)',
        'font-size': '30px'

      })
      .text(d => d.name)
      .filter(d => d.x < width / 2)
        .attr('x', 6 + sankey.nodeWidth())
        .attr('text-anchor', 'start')
        .style('font-size', '30px');

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

      d3.selectAll('path.link2')
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
      //context.remove();
      const context = d3.select('#allCountry_canvas').node().getContext('2d');

      context.clearRect(0, 0, 2300, 1000);

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
  
  

}
//creating circle + opulate dots based on amount of waste generated by that country 



function createCircle(data){
    
        //update the circle * remove the old one*
        
        d3.select("#the_SVG_ID").remove();
        
      //  const t = d3.transition()
		    // .duration(3000)
		    // .ease(d3.easeLinear);
		    
//   var transit = d3.select(".container")
        //   .transition()
        //   .duration(650);

        var svg1 = d3
		  .select('.container')
		  .append('svg')
		  .attr('x', 70)
			.attr('y', 200 )
			.attr("width", w)
		 	.attr("height", h);
		
		var group = svg1
		    .append('g')
		    .attr("id","the_SVG_ID")
		    .attr('transform', 'translate(800,500)')
		    .attr("width", w/1.8)
		    .attr("height", h/1.5);
		    
      
        //   .style("background-color", "red");
	  
		   
             //.attr("x", 0 )
             //.attr("y", 400 );
        
      
		 //adding text under the circle
		    
		 var txt = group
		            .append("text")
		            .attr("id","circle_text")
                	// .attr("x", (w/5))
                	// .attr("y", 0 )
                	.attr("dx", 560)
                	.attr("dy", -350)
                	.attr("width", 20)
		            .attr("height", 300)
		          	.text(" In "+ data.Year+ ",  "+ data.Country + " has generated "+  data.Average_waste_per_capita + "Kg of waste per capita." )
		            .style('fill', 'rgba(250, 250, 250, 1)');
	
	     //making dots appearing ** noting on the rad value if we want the area to be bigger add more to Math.random()
		  
		for ( let i = 0; i < data.Average_waste_per_capita; i++) {
		// setting radius size of the circle
		    var rad = Math.sqrt(~~(Math.random() * 500 * 500)),
		        angle = Math.random() * Math.PI * 2,
		        posx = Math.cos(angle),
		        posy = Math.sin(angle);
		    
		   
		    
		    var c2 = group
		        .append('circle')
		        .attr('id', 'cir')
		        .attr('cx', posx * rad)
		        .attr('cy', posy * rad)
		        .attr('r', 4)
		        .style('fill', 'rgba(89, 245, 255, 1)')
		        .style('opacity', 0.6)
		             //Our new hover effects
			     .on('mouseover', function(d, i) { d3.select(".infobox")
			     .style('visibility', 'visible');}
			     )
			     .on('mouseout', function(d, i){ d3.select(".infobox")
			     .style('visibility', 'hidden')})
			      ;

		       
      
		 }

}

//let's make float sankey!  

//the nodes will not change, links will not change target / source
// we will calculate the value of each links based on the MunicipleWaste.json


		// I don't use margins for this graph, but they are included because they are helpful for properly offsetting the canvas particles in tick() and drawParticlePathOnCanvas() below
		let margin = { top: 13, right: 30, bottom: 0, left:0};


		var simulation = d3.forceSimulation()
			.force("link", 
			  d3.forceLink()
				.id(d => d.id)
			)
			.force("charge", 
			  d3.forceManyBody()
				.strength(-20000)
			  )
// 			.force("center", d3.forceCenter(w / 2, h / 2))
			.force('x', d3.forceX(w/2))
			.force('y', d3.forceY(h/2))
			.on("tick", ticked);
		
		
		let linkScale = d3.scaleLinear()
			  .domain([0,100])
			  .range([1,100])

		let f = d3.format(".0f");
		
		// Declare the context that will be used to draw the particles
		let context = createProperResCanvas(w, window.innerHeight*4);

		//Create SVG element
		var svg = d3.select(".svg-container")
					.append("svg")
					.attr('x', 0)
					.attr('y', 0 )
					.attr("width", w)
					.attr("height", window.innerHeight*4);


// // 		Set the link attributes for `line` and particles based on the value

		dataset.links.forEach(link => {
		  link.transitionRate = link.value ;
		  link.width = f(linkScale(link.transitionRate));
		});

		dataset.links.forEach(link => {
			link.freq = link.transitionRate;
			link.particleSize = 20 * link.transitionRate ;
			link.particleColor = 'rgba(89, 245, 255, 1)';
		  });

	  // Both the actual nodes and the nodes on the links need to have a force in order to minimize collisions AND overlaps
	  simulation.nodes(dataset.nodes);
	  simulation.force("link", d3.forceLink(dataset.links));

// 	//Create links as lines
	var links = svg.selectAll("path")
		.data(dataset.links)
		.enter()
		.append("path")
		.attr('class', 'link')
// 		.style("stroke", "#bbb") making transparent color
		.style("stroke-width", function(d){ return d.width });

	//Create nodes as circles
	
	var nodes = svg.selectAll("text")
		.data(dataset.nodes)
		.enter()
		.append("text")
		.attr('id',d => d.name.replace(/\s/g, ''))
		.attr("text-anchor", "middle")
		.text( function(d) {return d.name;})
        .style("fill","rgba(250, 250, 250, 1)" )
        .style('font-size', '1.5vw')
		.call(d3.drag()  //Define what to do on drag events
			.on("start", dragStarted)
			.on("drag", dragging)
			.on("end", dragEnded)
		 );
		 

	//Every time the simulation "ticks", this will be called
	function ticked() {
// 		nodes.attr("x", function(d) { return d.x = Math.max(nodeRadius, Math.min(w - nodeRadius, d.x)); })
// 			 .attr("y", function(d) { return d.y = Math.max(nodeRadius, Math.min(h - nodeRadius, d.y)); });
    	nodes.attr("x", function(d) { 
    	    
    	    if( d.id == 0){
    	        return d.x =  margin.left + w/2;
    	    }
    	     //waste pre-treatment
            if( d.id == 1){
    	        return d.x =  margin.left + w/3 -10;
    	    }
    	    if( d.id == 2){
    	        return d.x =  margin.left + w/1.5 + 300;
    	    }
    	    //sorting
    	     if( d.id == 3){
    	        return d.x =  margin.left + w/1.5 + 200;
    	    }
    	    //biological treatment
    	    if( d.id == 4){
    	        return d.x =  w/2 -600;
    	    }
    	      //Waste Treatment
    	    if( d.id ==5){
    	        return d.x =  w/2 -400;
    	    }
    	    //Incineration to Energy
              if( d.id ==6){
    	        return d.x =  w/2 -500;
    	    }
    	    //Composting
    	     if( d.id == 7){
    	        return d.x =  w/2 - 1100;
    	    }
    	     if( d.id == 8){
    	        return d.x = margin.left + w/1.2;
    	    }
    	    //waste reuse
    	     if( d.id == 9){
    	        return d.x = w -400;
    	    }
    	    //recycling
    	      if( d.id == 10){
    	        return d.x = w -800;
    	    }
    	    //waste disposal
    	     if( d.id == 11){
    	        return d.x = w/2;
    	    }
    	     //landfll
            if( d.id == 12){
    	        return d.x = w/2 -300;
    	    }
    	      //incineration
            if( d.id == 13){
    	        return d.x = w/2;
    	    }
    	    //other
    	      if( d.id == 14){
    	        return d.x = w/2 +300;
    	    }
    	    
    	    
    	    else{
    	    return d.x = margin.left + Math.max( Math.min(w,d.x),(d.id+8)*10); 
    	    }
    	    
    	})
             // 	nodes.attr("x", function(d) { return d.x = (d.id * 100) + 200; })

			 //.attr("y", function(d) { return d.y =  Math.max(d.id,Math.max( h/10 - d.id,d.y)); })
			 .attr("y", function(d) { 
			 if( d.id == 0){
    	     return d.y =  margin.top + 20;
    	    }
    	    //waste pre-treatment
    	    if( d.id == 1){
    	        return d.y =  margin.top + 1150;
    	    }
    	    //sorting 
    	     if( d.id == 2){
    	        return d.y =  margin.top + 750;
    	    }
    	    //sorting 
    	    if( d.id == 3){
    	        return d.y =  margin.top + 1450;
    	    }
    	    //biological treatment
    	     if( d.id == 4){
    	        return d.y =  margin.top + 1750;
    	    }
    	     //waste treatment
    	     if( d.id == 5){
    	        return d.y =  margin.top + 2050;
    	    }
    	     //composting
    	     if( d.id == 7){
    	        return d.y =  margin.top + 2350;
    	    }
    	    //incineration for energy
    	     if( d.id == 6){
    	        return d.y =  margin.top + 2450;
    	    }
    	    //waste recovery
    	     if( d.id == 8){
    	        return d.y =  margin.top + 3050;
    	    }
    	       //recycling
    	     if( d.id == 10){
    	        return d.y =  margin.top + 3550;
    	    }
    	    //re-use
    	     if( d.id == 9){
    	        return d.y =  margin.top + 3550;
    	    }
    	    if( d.id == 14){
    	        return d.y =  margin.top + 3550;
    	    }
    	    if( d.id == 13){
    	        return d.y =  margin.top + 3550;
    	    }
    	     if( d.id == 12){
    	        return d.y =  margin.top + 3550;
    	    }
    	    //waste disposal
    	    if( d.id  == 11){
    	     return d.y =  margin.top + 3050;
			
    	    	
    	    }	
    	    else{
    	     return d.y = margin.top + ((d.id * h/50)*4 )+700 ;
    	    }
			})

			 
		links.attr('d', function(d){
			return 'M ' + d.source.x + ',' + d.source.y +
				   ' L ' + d.target.x + ',' + d.target.y;
		});
		
		
		
	};

	// ================= Define drag event functions =================
	function dragStarted(d) {
		if (!d3.event.active) simulation.alphaTarget(0.3).restart();
		d.fx = d.x;
		d.fy = d.y;
	}

	function dragging(d) {
		d.fx = d3.event.x;
		d.fy = d3.event.y;
	}

	function dragEnded(d) {
		if (!d3.event.active) simulation.alphaTarget(0);
		d.fx = null;
		d.fy = null;
	}



	// ===================== PARTICLE TICK AND DRAW =====================

	// ========= 
	// The following two functions, tick() and drawParticlePathOnCanvas() are based on Micah Stub's code
	// SOURCE: https://bl.ocks.org/micahstubbs/ed0ae1c70256849dab3e35a0241389c9
	// =========

	// First setup two unnested variables
	// Start the particle timer, tick(), after a 1 second delay; the elapsed time will be automatically passed to the callback
	var t = d3.timer(tick, 2000);

	// Start with 0 particles; the populated array is contained within the tick function
	let particles = [];

	// Tick function is for the particles
	// d3.timer passes elapsed time as first argument
	function tick(elapsed){
	  // Filter the particle array from the previous tick()
	  particles = particles.filter(d => d.current < d.path.getTotalLength());
	  
	  // Select all of the links and use its properties to create particle arrays for each
	  d3.selectAll('path.link')
		.each( function(d) { // DO NOT CONVERT TO ARROW FUNCTION, `this` will not bind, and you won't be able to access the SVG path properly

			// the `x` limit controls the frequency per second
			for (let x = 0; x < 3; x++) {
			  const offset = (Math.random() * d.value - d.value/2);
			  //const offset = d.value;

			  // The higher the multiplied Math.random(), the less particles (because the probability is lower that there will be a decimal smaller than the d.freq)
			  if (Math.random() * 5 < d.freq) {

				const length = this.getTotalLength();

				// Update the particle array
				particles.push({
				  link: d,
				  time: elapsed,
				  offset,
				  path: this,
				  length,
				  animateTime: length,
				  speed: .9
				});
			  }
			}
		});

	  // With updated particle array and elapsed time, draw those particles on the canvas
	  drawParticlePathOnCanvas(elapsed);
	}

	function drawParticlePathOnCanvas(elapsed){
	  // Set the canvas before drawing updated particles
	  context.clearRect(0, 0, w, window.innerHeight*4);

	  context.fillStyle = 'rgba(89, 245, 255, 1)'; // particle color
// 	  context.lineWidth = '1px';

	  // For each particle `p` in particles find the current position and draw to the canvas
	  for (const p in particles){
		if( {}.hasOwnProperty.call(particles, p) ){
		  const currentTime = elapsed - particles[p].time;
		  particles[p].current = currentTime * 0.20 * particles[p].speed;

		  // CAUTION: .getPointAtLength has been deprecated and does not work on Safari
		  // MDN: https://developer.mozilla.org/en-US/docs/Web/API/SVGPathElement/getPointAtLength#Browser_compatibility
		  // Possible Solution: https://github.com/rveciana/svg-path-properties
		  const currentPos = particles[p].path.getPointAtLength(particles[p].current);

		  // Draw the particles
		  context.beginPath();
		  
		 // context.arc( // creates a circle in canvas
			// currentPos.x + margin.left, // Add particles[p].offset for displacement
			// currentPos.y + margin.top,
			// particles[p].link.particleSize, // radius of circle
			// 0, // circle starting position
			// 10 * Math.PI  // circle ending position
		 // );
		 
		 //make rect instead of circle
		  
		  context.rect(
		  	currentPos.x + margin.left,
		  	currentPos.y + margin.top,
		  	particles[p].link.particleSize*2, //w
		  	particles[p].link.particleSize*2, //h
		  	0,
		  	10 * Math.PI 
		  	);
		  
		  
		  context.lineWidth = 0;
		  //context.stroke();
		  context.fill();

		}  
	  }
	}

	// ========== Canvas Setup ==========
	// Based on @MyNameIsKo's helper function ( https://stackoverflow.com/a/15666143/8585320 )
	function createProperResCanvas(w, h, ratio) {
		if (!ratio) { ratio = Math.round(window.devicePixelRatio) || 1 }

		// Keep canvas within the allowable size:
		// https://stackoverflow.com/a/11585939/8585320
		h = Math.min(32767, h * ratio);

		// Set canvas
		var can = document.querySelector("#graph-canvas");
		can.width = w * ratio;
	    	can.height = h * ratio;
		can.style.width = w + "px";
		can.style.height = h + "px";

		// Set context
		var ctx = can.getContext("2d");
		ctx.scale(ratio,ratio);
		ctx.clearRect(0, 0, w, h);

		// Since context does all of the drawing, no need to return canvas itself
		return ctx;
	}

// ========== Scroll Magic  ==========

//adding scrolling magic

    // init controller
	var controller = new ScrollMagic.Controller();

			// build collection scene
		 new ScrollMagic.Scene({
									triggerElement: "#Collection",
									triggerHook: 0.9, // show, when scrolled 10% into view
									duration: "90%", // hide 10% before exiting view (80% + 10% from bottom)
									offset: 100 // move trigger to center of element
								})
								.setClassToggle("#reveal", "visible") // add class to reveal
								// .addIndicators() // add indicators (requires plugin)
								.addTo(controller);
			// highlignthing collection & exported waste
			new ScrollMagic.Scene({
									triggerElement: "#Collection",
									triggerHook: 0.9, // show, when scrolled 10% into view
									duration: "90%", // hide 10% before exiting view (80% + 10% from bottom)
									offset: 100 // move trigger to center of element
								})
								.setClassToggle("#ExportedWaste", "visible") // add class to reveal
								.addTo(controller);
		   new ScrollMagic.Scene({
									triggerElement: "#Collection",
									triggerHook: 0.9, // show, when scrolled 10% into view
									duration: "90%", // hide 10% before exiting view (80% + 10% from bottom)
									offset: 100 // move trigger to center of element
								})
								.setClassToggle("#Collection", "visible") // add class to reveal
								.addTo(controller);
								
								
								
								
								
	      	// build scene for Waste Pre-treatment
	      	new ScrollMagic.Scene({
									triggerElement: "#WastePre-Treatment",
									triggerHook: 0.8, // show, when scrolled 10% into view
									duration: "60%", // hide 10% before exiting view (80% + 10% from bottom)
									offset: 10 // move trigger to center of element
								})
								.setClassToggle("#reveal2", "visible") // add class to reveal
								.addTo(controller);
			     	new ScrollMagic.Scene({
									triggerElement: "#WastePre-Treatment",
									triggerHook: 0.8, // show, when scrolled 10% into view
									duration: "60%", // hide 10% before exiting view (80% + 10% from bottom)
									offset: 10 // move trigger to center of element
								})
								.setClassToggle("#WastePre-Treatment", "visible") // add class to reveal
								.addTo(controller);
			     	new ScrollMagic.Scene({
									triggerElement: "#WastePre-Treatment",
									triggerHook: 0.8, // show, when scrolled 10% into view
									duration: "60%", // hide 10% before exiting view (80% + 10% from bottom)
									offset: 10 // move trigger to center of element
								})
								.setClassToggle("#BiologicalTreatment", "visible") // add class to reveal
								.addTo(controller);
				    new ScrollMagic.Scene({
									triggerElement: "#WastePre-Treatment",
									triggerHook: 0.8, // show, when scrolled 10% into view
									duration: "60%", // hide 10% before exiting view (80% + 10% from bottom)
									offset: 10 // move trigger to center of element
								})
								.setClassToggle("#Sorting", "visible") // add class to reveal
								.addTo(controller);
								
								
								
								
		   // build scene for Waste Pre-treatment
		   	new ScrollMagic.Scene({
									triggerElement: "#WasteTreatment",
									triggerHook: 0.8, // show, when scrolled 10% into view
									duration: "80%", // hide 10% before exiting view (80% + 10% from bottom)
									offset: 100 // move trigger to center of element
								})
								.setClassToggle("#reveal3", "visible") // add class to reveal
								.addTo(controller);
				
				new ScrollMagic.Scene({
									triggerElement: "#WasteTreatment",
									triggerHook: 0.8, // show, when scrolled 10% into view
									duration: "80%", // hide 10% before exiting view (80% + 10% from bottom)
									offset: 100 // move trigger to center of element
								})
								.setClassToggle("#WasteTreatment", "visible") // add class to reveal
								.addTo(controller);
			   new ScrollMagic.Scene({
									triggerElement: "#WasteTreatment",
									triggerHook: 0.8, // show, when scrolled 10% into view
									duration: "80%", // hide 10% before exiting view (80% + 10% from bottom)
									offset: 100 // move trigger to center of element
								})
								.setClassToggle("#Incinerationtogenerateenergy", "visible") // add class to reveal
								.addTo(controller);
			    new ScrollMagic.Scene({
									triggerElement: "#WasteTreatment",
									triggerHook: 0.8, // show, when scrolled 10% into view
									duration: "80%", // hide 10% before exiting view (80% + 10% from bottom)
									offset: 100 // move trigger to center of element
								})
								.setClassToggle("#Composting", "visible") // add class to reveal
								.addTo(controller);
				  
           // build scene for Waste Recovery
		  // 	new ScrollMagic.Scene({
				// 					triggerElement: "#WasteRecovery",
				// 					triggerHook: 0.8, // show, when scrolled 10% into view
				// 					duration: "80%", // hide 10% before exiting view (80% + 10% from bottom)
				// 					offset: 10 // move trigger to center of element
				// 				})
				// 				.setClassToggle("#reveal4", "visible") // add class to reveal
				// 				.addTo(controller);
				// new ScrollMagic.Scene({
				// 					triggerElement: "#WasteRecovery",
				// 					triggerHook: 0.8, // show, when scrolled 10% into view
				// 					duration: "80%", // hide 10% before exiting view (80% + 10% from bottom)
				// 					offset: 10 // move trigger to center of element
				// 				})
				// 				.setClassToggle("#WasteRecovery", "visible") // add class to reveal
				// 				.addTo(controller);
				// new ScrollMagic.Scene({
				// 					triggerElement: "#WasteRecovery",
				// 					triggerHook: 0.8, // show, when scrolled 10% into view
				// 					duration: "80%", // hide 10% before exiting view (80% + 10% from bottom)
				// 					offset: 10 // move trigger to center of element
				// 				})
				// 				.setClassToggle("#Recycling", "visible") // add class to reveal
				// 				.addTo(controller);
								
				// new ScrollMagic.Scene({
				// 					triggerElement: "#WasteRecovery",
				// 					triggerHook: 0.8, // show, when scrolled 10% into view
				// 					duration: "80%", // hide 10% before exiting view (80% + 10% from bottom)
				// 					offset: 10 // move trigger to center of element
				// 				})
				// 				.setClassToggle("#Re-Use", "visible") // add class to reveal
				// 				.addTo(controller);
		
		
		
		
		
		  // build scene for Waste WasteDisposal
		   	new ScrollMagic.Scene({
									triggerElement: "#Landfill",
									triggerHook: 0.8, // show, when scrolled 10% into view
									duration: "90%", // hide 10% before exiting view (80% + 10% from bottom)
									offset: 10 // move trigger to center of element
								})
								.setClassToggle("#reveal5", "visible") // add class to reveal
								.addTo(controller);
				new ScrollMagic.Scene({
									triggerElement: "#Landfill",
									triggerHook: 0.8, // show, when scrolled 10% into view
									duration: "90%", // hide 10% before exiting view (80% + 10% from bottom)
									offset: 10 // move trigger to center of element
								})
								.setClassToggle("#WasteDisposal", "visible") // add class to reveal
								.addTo(controller);
				new ScrollMagic.Scene({
									triggerElement: "#Landfill",
									triggerHook: 0.8, // show, when scrolled 10% into view
									duration: "90%", // hide 10% before exiting view (80% + 10% from bottom)
									offset: 10 // move trigger to center of element
								})
								.setClassToggle("#Landfill", "visible") // add class to reveal
								.addTo(controller);
				
				new ScrollMagic.Scene({
									triggerElement: "#Landfill",
									triggerHook: 0.8, // show, when scrolled 10% into view
									duration: "90%", // hide 10% before exiting view (80% + 10% from bottom)
									offset: 10 // move trigger to center of element
								})
								.setClassToggle("#Incineration", "visible") // add class to reveal
								.addTo(controller);
				new ScrollMagic.Scene({
									triggerElement: "#Landfill",
									triggerHook: 0.8, // show, when scrolled 10% into view
									duration: "90%", // hide 10% before exiting view (80% + 10% from bottom)
									offset: 10 // move trigger to center of element
								})
								.setClassToggle("#Other", "visible") // add class to reveal
								.addTo(controller);
					new ScrollMagic.Scene({
									triggerElement: "#Landfill",
									triggerHook: 0.8, // show, when scrolled 10% into view
									duration: "90%", // hide 10% before exiting view (80% + 10% from bottom)
									offset: 10 // move trigger to center of element
								})
								.setClassToggle("#Recycling", "visible") // add class to reveal
								.addTo(controller);
						new ScrollMagic.Scene({
									triggerElement: "#Landfill",
									triggerHook: 0.8, // show, when scrolled 10% into view
									duration: "90%", // hide 10% before exiting view (80% + 10% from bottom)
									offset: 10 // move trigger to center of element
								})
								.setClassToggle("#Re-Use", "visible") // add class to reveal
								.addTo(controller);
					 
					 new ScrollMagic.Scene({
									triggerElement: "#Landfill",
									triggerHook: 0.8, // show, when scrolled 10% into view
									duration: "90%", // hide 10% before exiting view (80% + 10% from bottom)
									offset: 10 // move trigger to center of element
								})
								.setClassToggle("#WasteRecovery", "visible") // add class to reveal
								.addTo(controller);
// make the sankey Horizontal at the end// 


//make select

