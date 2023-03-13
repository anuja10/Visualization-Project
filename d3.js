var  padding = {top: 5, right: 50, bottom:50, left: 5}, width = 400, height = 700;
var scale_factor = 30;
var deathdays = [] ;
var death_gender=[];
var age_group = [];
var color = d3.scale.category10() // color scale range
var activedate;  // for hovering
var deaths_age_sex =[];
var deaths_by_day = [];

// Define the div for the tooltip
var div = d3.select("body").append("div")
			    .attr("class", "tooltip")
			    .style("opacity", 0);

// Adds the svg canvas
var map = d3.select("body")
  		  .append("svg")
		    .attr("id","map")
    	    .attr("width", width + padding.left + padding.right)
        	.attr("height", height + padding.top + padding.bottom)
        	.call(d3.behavior.zoom().on("zoom", function () {
        	map.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")")}))
  			.append("g")
  			.attr("transform",
              "translate(" + padding.left + "," + padding.top + ")");

	var div1 = d3.select("body").append("div")
        .attr("class", "tooltip2")
        .style("opacity", 0);


    d3.selection.prototype.moveToFront = function() {
      return this.each(function(){
        this.parentNode.appendChild(this);
      });
    };
    d3.selection.prototype.moveToBack = function() {
        return this.each(function() {
            var firstChild = this.parentNode.firstChild;
            if (firstChild) {
                this.parentNode.insertBefore(this, firstChild);
            }
        });}

		
		/* soho map */ 
		/* 1. Street names */


			var streets = [];
			var street_data = [{"name": "Oxford Street", "x": 10 , "y": 15, "angle": 10 },
								{"name": "Regents Street", "x": 12 , "y": 22, "angle": 90 },
								{"name": "Broad Street", "x": 13 , "y": 30, "angle": 30  },
								{"name": "Brewer Street", "x": 20 , "y": 23, "angle": 35 }];

			var brewery = [{"x": 14.35 , "y": 11 }]
			var workhouse = [{"x": 10.7 , "y": 12.7 }]



			//plot street


			//plot workshouse
			function plot_workhouse()
			{
				map.selectAll('rect')
    			.data(workhouse)
    			.attr("id","workhouse")
    			.enter()
    			.append('rect')
    			.style('fill', '#f6b600') 
    			.style('stroke', '#004d4d')
    			.attr('x', function(d) { return d.x*scale_factor ; })
    			.attr('y', function(d) { return d.y*scale_factor  ; })
                .attr("transform","rotate(27,"+11*scale_factor+","+13*scale_factor+")")
    			.attr('height', 40)
    			.attr('width', 49)

    			.on("mouseover", function(d,i) {
 					div1.transition()
	                	.duration(200)
	    	            .style("opacity", 1);
        	        div1.html("<b>Workhouse</b>")
    	                .style("left", (d3.event.pageX-10) + "px")
        	            .style("top", (d3.event.pageY-15) + "px");
                })
                .on("mouseout", function(d) {

                    div.transition()
                        .duration(300)
                        .style("opacity", 0);
                    })

    		}
    		plot_workhouse()


    		/*
			function draw_streets() {
		    d3
		        .select("#streets")
		        .selectAll("polyline")
		        .data(streets)
		        .enter()
		        .append('polyline')
		        .attr('points', function(d) {
		            var z = d.map(function(u) {
		                    var v = coord_xform(xy_ = [u.x, u.y]);
		                    return String(v[0]) + "," + String(v[1]);
		            }).reduce(function(a, b) {return a + " " + b});
		            return z;
		        })
		        .attr("class", "street");
		}

		function draw_labels() {
		    // hardcode some place names
		    var places = [
		        {name: "Work House", x: 9.5 , y: 13.5},
		        {name: "Golden Square", x: 10 , y: 8},
		        {name: "Oxford Street", x: 9.75, y: 16.75},
		        {name: "Broad Street", x: 12, y: 12},
		        {name: "Regent Street", x: 6, y: 11}
		    ];
		    
		    var places_coords = places.map(function(d) {
		        d.coords = coord_xform(xy_ = [d.x, d.y]);
		        return d;
		    })
		    
		    d3
		        .select("#labels")
		        .selectAll("text")
		        .data(places_coords)
		        .enter()
		        .append("text")
		        .attr("x", function(d) {return d.coords[0]})
		        .attr("y", function(d) {return d.coords[1]})
		        .text(function(d) {return d.name})
		        
		}
    		

		function draw_all() {
    
		// transform coordinates and filter
		death_coords = deaths.flatMap(function(d) {
		    d.xy = coord_xform(xy_ = [d.x, d.y], grid = g_("T_GRID"));
		    
		    if (d.j >= g_("LEFT_SEL") & d.j <= g_("RIGHT_SEL")) {
		        return d;
		    }
		    else {
		        return [];
		    }
		});
		d3.select("#total").text("Total Deaths: " + death_coords.length);

		["#tsaxis", "#days", "#fg", "#pumps", "#labels", "#streets", 
		"#ages", "#ageaxis", "#male", "#female", "#gaxis", "#deaths"]
		    .map(function(x){ d3.select(x).selectAll("*").remove()});

		// draw everything
		if (g_("T_STREET") == true) {draw_streets(); }
		if (g_("T_LABELS") == true) {draw_labels(); }
		// if (g_("T_DEATHS") == true) {draw_deaths(); }
		// if (g_("T_PUMPS") == true) {draw_pumps(); }
		draw_gender();
		draw_ages();
		//draw_debug();
		draw_ts();
		}

		*/


			// plot street names
			function plot_name_streets(){

			map.selectAll("g")
			.selectAll("text")
			.data(street_data)
			.attr("id","street_names")
			.enter()
			.append("text")
			.style("fill", "Black")
		    .style("font-size", "15px")
		    .attr("text-anchor", "middle")
			.attr("x", function(d) { return d.x*scale_factor; })
			.attr("y", function(d){ return d.y*scale_factor;})
 			.attr("transform",function(d){
                                    return "rotate("+d.angle+","+d.x*scale_factor+","+d.y*scale_factor+")"})
			.text(function(d) { return d.name; })

			// .on("mouseover", function(d,i) {
 			// 		div1.transition()
	        //         	.duration(200)
	    	//             .style("opacity", 1);
        	//         div1.html(d.name)
    	    //             .style("left", (d3.event.pageX-10) + "px")
        	//             .style("top", (d3.event.pageY-15) + "px");
            //     })
            // .on("mouseout", function(d) {

            //         div.transition()
            //             .duration(300)
            //             .style("opacity", 0);
            //         })

			}
			plot_name_streets()

            // // Adds the street name Broad Street
			// mapContainer
			// .append("text")
			// .style("fill", "Black")
			// .style("font-size", "15 px")
			// .attr("transform", "translate(380,250) rotate(-22)")
			// .text("BROAD STREET")


			/*

			 // Adds the street name Broad Street
			  mapContainer
			    .append("text")
			    .style("fill", "Black")
			    .style("font-size", "15 px")
			    .attr("transform", "translate(380,250) rotate(-22)")
			    .text("BROAD STREET")

			  // Adds the street name Brewer Street
			  mapContainer
			    .append("text")
			    .style("fill", "Black")
			    .style("font-size", "15px")
			    .attr("text-anchor", "middle")
			    .attr("transform", "translate(450,400) rotate(-36)")
			    .text("BREWER STREET");

			  // Adds the street name Dean Street
			  mapContainer
			    .append("text")
			    .style("fill", "Black")
			    .style("font-size", "15px")
			    .attr("text-anchor", "middle")
			    .attr("transform", "translate(655,200) rotate(60)")
			    .text("DEAN STREET");

			  // Adds the street name Soho Square
			  mapContainer
			    .append("text")
			    .style("fill", "Black")
			    .style("font-size", "15px")
			    .attr("text-anchor", "middle")
			    .attr("transform", "translate(620,100) rotate(-20)")
			    .text("SOHO SQUARE")

			  //Adds the street name Recents Quadrant  
			  mapContainer
			    .append("text")
			    .style("fill", "Black")
			    .style("font-size", "15px")
			    .attr("text-anchor", "middle")
			    .attr("transform", "translate(400,480) rotate(0)")
			    .text("RECENTS QUADRANT");

			  // Adds the street name Oxford Street
			  mapContainer
			    .append("text")
			    .style("fill", "Black")
			    .style("font-size", "15px")
			    .attr("text-anchor", "middle")
			    .attr("transform", "translate(350,55) rotate(-6)")
			    .text("OXFORD STREET");

			  //Adds the street name Recent Street  
			  mapContainer
			    .append("text")
			    .style("fill", "Black")
			    .style("font-size", "15px")
			    .attr("text-anchor", "middle")
			    .attr("transform", "translate(180,320) rotate(58)")
			    .text("RECENT STREET");
			*/


			// plot brewery
			function plot_brewery()
			{
				map.selectAll('circle')
    			.data(brewery)
    			.enter()
    			.append('circle')
    			.style('fill', '#f44336')
    			.style('stroke', '#f44336')
    			.attr('r', 12.8)
    			.attr('cx', function(d) { return d.x*scale_factor ; })
    			.attr('cy', function(d) { return d.y*scale_factor  ; })

    				.on("mouseover", function(d,i) {
 					div1.transition()
	                	.duration(200)
	    	            .style("opacity", 1);
        	        div1.html("<b>Brewery</b>")
    	                .style("left", (d3.event.pageX) + "px")
        	            .style("top", (d3.event.pageY-28) + "px");
                })
                .on("mouseout", function(d) {

                    div.transition()
                        .duration(300)
                        .style("opacity", 0);
                    });

    		}
	    	plot_brewery()


			// plot streets
			function plot_map_lines(){

			var path_generater = d3.svg.line()
				.interpolate("linear")
				.x(function(d) { return d.x*scale_factor;})
				.y(function(d) { return d.y*scale_factor;});



			map.selectAll(".street")
				.data(streets)
				.enter()
				.append("path")
				.attr("class","street")
				.attr("d",function(data){
				return path_generater(data);
				});


		//bring elements to front
		d3.select(this).moveToBack();

			}

			// JSON data loading & parsing
			d3.json("streets.json",function(error,d){

			if (error) {
			console.log(error); //Log the error.
			} else { //If no error, the file loaded correctly
			console.log("streets data:",d); //Log the data.
			}

			streets = d;

			plot_map_lines(); // plot streets
			});

			/*2. plot pumps */

			var pumps = [];

			// pumps plotting function

			function plot_pumps()
			{
			map.selectAll('circle')
    			.data(pumps)
    			.enter()
    			.append('circle')
    			.style('fill', '#8fce00')
    			.style('stroke', 'black')
    			.attr('r', 4.5)
    			.attr('cx', function(d) { return d.x*scale_factor ; })
    			.attr('cy', function(d) { return d.y*scale_factor  ; })
    			.on("mouseover", function(d,i) {
 					div1.transition()
	                	.duration(200)
	    	            .style("opacity", 1);
        	        div1.html("<b>Pump</b>")
    	                .style("left", (d3.event.pageX) + "px")
        	            .style("top", (d3.event.pageY-28) + "px");
                })
                .on("mouseout", function(d) {
    				d3.select(this).moveToFront();

                    div.transition()
                        .duration(300)
                        .style("opacity", 10);
                    });


			}
			// load and sparse CSV file

			d3.csv("pumps.csv",function(error,d){

				if (error) { //If error is not null, something went wrong.
				console.log(error); //Log the error.
				} else { //If no error, the file loaded correctly. Yay!
				console.log("pumps",d); //Log the data.
				}
				// assign pumps data
				for (var i=0; i<d.length; i++)
				{

					var record = d[i];
					var object = {
						x: record.x,
						y: record.y
					}
					pumps.push(object);

				}
			plot_pumps();

			});

			/*  3. Plot deathdays */

			var deaths = [];


		var deaths_to_show = [];

		function plot_deathlocations(activedate){

            if(activedate){


             deaths_to_show = deaths_age_sex.filter(function(d,i){

                if(deaths_by_day[i].date == activedate){
	                console.log(deaths_by_day[i].date ,activedate)
	                console.log(i)
                    deaths_to_show = deaths_age_sex.slice(0,total_deaths[i]);  //filter deaths based on date selected
                    console.log("filtered:", deaths_to_show);
 		}


 		map.selectAll('.deaths')
    			.data(deaths_to_show)
    			//.attr("class","deathcircles")
    			.enter()
    			.append('circle')
    			.attr('class', 'deaths')
    			.attr('r', 3.5)
    			.attr('cx', function(d) { return d.x*scale_factor; })
    			.attr('cy', function(d) { return d.y*scale_factor; })
    			.style('stroke','black')
    			.style('fill', function(d){
    				if (d.gender == 0)
    				{
    			 	return "#0300d1"
    				 }
    				else {
    				 return "#e202bc"
    				 }})
    			.on("mouseover", function(d,i) {
    				d3.select(this).moveToFront();
 					div.transition()
	                	.duration(200)
	    	            .style("opacity", .9);
        	        div.html("<b>Age Group: </b>"+ age_group[i] +"<br/>"+"<b>Gender: </b>" +death_gender[i])
    	                .style("left", (d3.event.pageX) + "px")
        	            .style("top", (d3.event.pageY-28) + "px");
                })
                .on("mouseout", function(d) {

                    div.transition()
                        .duration(300)
                        .style("opacity", 0);
                    });



                })


			}                //end if date is clicked
             deaths_to_show = deaths_age_sex; //show all deaths

				// plot death locations

				map.selectAll('.deaths')
    			.data(deaths_to_show)
    			//.attr("class","deathcircles")
    			.enter()
    			.append('circle')
    			.attr('class', 'deaths')
    			.attr('r', 3.5)
    			.attr('cx', function(d) { return d.x*scale_factor; })
    			.attr('cy', function(d) { return d.y*scale_factor; })
    			.style('stroke','black')
    			.style('fill', function(d){
    				if (d.gender == 0)
    				{
    			 	return "#0300d1"
    				 }
    				else {
    				 return "#e202bc"
    				 }})
    			.on("mouseover", function(d,i) {
    				d3.select(this).moveToFront();
 					div.transition()
	                	.duration(200)
	    	            .style("opacity", .9);
        	        div.html("<b>Age Group: </b>"+ age_group[i] +"<br/>"+"<b>Gender: </b>" +death_gender[i])
    	                .style("left", (d3.event.pageX) + "px")
        	            .style("top", (d3.event.pageY-28) + "px");
                })
                .on("mouseout", function(d) {

                    div.transition()
                        .duration(300)
                        .style("opacity", 0);
                    });


			}

			/// extract data from csv file ///
			d3.csv("deaths_age_sex.csv",function(error,d){

			if (error) { //If error is not null, something went wrong.
			console.log(error); //Log the error.
			} else { //If no error, the file loaded correctly. Yay!
			console.log("deaths_age_sex array",d); //Log the data.
			}

			for (var i=0; i<d.length; i++){
			var record = d[i];

			var object1 = {
					x: record.x,
					y: record.y,
					age : record.age,
					gender : record.gender
			}; // age & sex object
			deaths_age_sex.push(object1);

			if(record.gender==1){
			death_gender[i]= "Female"}
			else{
			death_gender[i]= "Male"}

				if(record.age == 0){ age_group[i]="0-10"}
				else if(record.age == 1){ age_group[i]="11-20"}
				else if(record.age == 2){ age_group[i]="21-40"}
				else if(record.age == 3){ age_group[i]="41-60"}
				else if(record.age == 4){ age_group[i]="61-80"}
				else if(record.age == 5){ age_group[i]="> 80"}
			}
			plot_deathlocations();
			});

		/* Deaths Timeline Plot*/

			/* 3. Extract number of deaths for each day from window */


			var padding = {top: 10, right: 0, bottom: 10, left: 70},
			width = 500-padding.left - padding.right,
			height = 400-padding.top - padding.bottom;
			var dateFormat = d3.time.format("%d-%b").parse;
			var formatTime = d3.time.format("%e %b");

			var timeline = d3.select("body")
  		  	.append("svg")
		    .attr("id","timeline")
    	    .attr("width", width + padding.left + padding.right)
        	.attr("height", height + padding.top + padding.bottom)
  			.append("g")
  			.attr("transform",
              "translate(" + padding.left + "," + padding.top + ")");

			var maxDeaths = 143;
			var mindate = new Date(1854,7,1), maxdate = new Date(1854,9,31);
			var xScale = d3.time.scale().range([0, width]);
			var yScale = d3.scale.linear().range([height, 0]);
			// Define the axes
			var xAxis = d3.svg.axis().scale(xScale)
		    .orient("bottom").ticks(5);

			var yAxis = d3.svg.axis().scale(yScale)
		    .orient("left").ticks(20);

			var pathGenerator = d3.svg.line()
				.x(function(d) { return xScale(d.date); })
				.y(function(d) { return yScale(d.deaths); });





		/* load data */
		var  total_deaths=[];
		var sum =0;
		d3.csv("deathdays.csv",function(error,deathdays,i){

		deathdays.forEach(function(d) {

      		d.date = dateFormat(d.date);
			d.deaths = +d.deaths;

   		 });
   		deaths_by_day = deathdays;
		//total_deaths[0] = deathdays[0].deaths;
		for(i=0; i<deathdays.length; i++){
		sum +=deathdays[i].deaths;
		total_deaths.push(sum);
		}
		console.log("deathdays array:",deathdays);

		//scale range of data
		xScale.domain(d3.extent(deathdays, function(d) { return d.date; }));
    	yScale.domain([0, d3.max(deathdays, function(d) { return d.deaths+10; })]);

    	timeline.append("path")
        .attr("class", "line")
        .attr("d", pathGenerator(deathdays));

    	/* scatterplot */
    	timeline.selectAll("dot")
        .data(deathdays)
  		.enter().append("circle")
        .attr("r", 3.5)
        .attr("stroke", "#c90076")
        .attr("cx", function(d) { return xScale(d.date); })
        .attr("cy", function(d) { return yScale(d.deaths); })
        .on("mouseover", function(d,i) {
        activedate = d.date;
            div.transition()
                .duration(200)
                .style("opacity", .9);
            div	.html(formatTime(d.date) + "<br/><b>Deaths:</b>" + d.deaths +  "<br/> <b>Total Deaths:</b>" +total_deaths[i] )
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
            })

        .on("click", function(d,i) {
			//plot_totaldeaths(total_deaths[i]);
            console.log("Total deaths on clicked Date is :"+total_deaths[i]);
            console.log("active date = "+activedate);

           map.selectAll('.deaths').remove();

           plot_deathlocations(activedate);

           })

        .on("mouseout", function(d) {
            div.transition()
                .duration(500)
                .style("opacity", 0);
        });


    // Add the X Axis
    timeline.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // title of timeline
   timeline.append("text")
	.attr("transform", "translate(" + (width/2) + ")")
	.style("font", "18px times")
    .style("text-anchor", "middle")
    // .text("Timeline of the Cholera Epidemic Deaths (1854)");


    //  label for  X axis
  	timeline.append("text")
	.attr("transform", "translate(" + (width/2) + " ," + (height + 60) + ")")
	.style("font", "14px times")
    .style("text-anchor", "middle")
      .text("August through September of year 1854");



    // Add the Y Axis
    timeline.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    //  label for  Y axis
    timeline.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - padding.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("font", "14px times")
      .style("text-anchor", "middle")
      .text("Number of Deaths");


});

