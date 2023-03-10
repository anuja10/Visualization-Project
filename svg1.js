var  padding = {top: 5, right: 50, bottom:50, left: 5},
	width = 400, //-padding.left - padding.right,
 	height = 700; //- padding.top - padding.bottom;
var scale_factor = 30;
var deathdays = [] ;
var death_gender=[];
var age_group = [];
var color = d3.scale.category10()
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


// https://github.com/wbkd/d3-extended
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
/**

**/

/******************************** Cholera Map *********************************/


/*****************  1. extract and draw streets & other info *****************/


			var streets = [];
			var street_data = [{"name": "Oxford Street", "x": 10 , "y": 15, "angle": 10 },
								{"name": "Regents Street", "x": 12 , "y": 22, "angle": 90 },
								{"name": "Broad Street", "x": 13 , "y": 30, "angle": 30  },
								{"name": "Brewer Street", "x": 20 , "y": 23, "angle": 35 }];

			var brewery = [{"x": 14.35 , "y": 11 }]
			var workhouse = [{"x": 10.7 , "y": 12.7 }]


			//draw workshouse
			function draw_workhouse()
			{
				map.selectAll('rect')
    			.data(workhouse)
    			.attr("id","workhouse")
    			.enter()
    			.append('rect')
    			.style('fill', '#19484d')
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
    		draw_workhouse()


			// street naming function
			function name_streets(){

			map.selectAll("g")
			.selectAll("text")
			.data(street_data)
			.attr("id","street_names")
			.enter()
			.append("text")
			.attr("x", function(d) { return d.x*scale_factor; })
			.attr("y", function(d){ return d.y*scale_factor;})
 			.attr("transform",function(d){
                                    return "rotate("+d.angle+","+d.x*scale_factor+","+d.y*scale_factor+")"})
			.text(function(d) { return d.name; })

			.on("mouseover", function(d,i) {
 					div1.transition()
	                	.duration(200)
	    	            .style("opacity", 1);
        	        div1.html(d.name)
    	                .style("left", (d3.event.pageX-10) + "px")
        	            .style("top", (d3.event.pageY-15) + "px");
                })
            .on("mouseout", function(d) {

                    div.transition()
                        .duration(300)
                        .style("opacity", 0);
                    })
			}
			name_streets()




			function draw_brewery()
			{
				map.selectAll('circle')
    			.data(brewery)
    			.enter()
    			.append('circle')
    			.style('fill', 'yellow')
    			.style('stroke', 'yellow')
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
	    	draw_brewery()


		// draw streets
			function draw_map_lines(){

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

			draw_map_lines(); // draw streets
			});

/*****************  2. Extract and draw pumps *****************/

			var pumps = [];

			// pumps drawing function

			function draw_pumps()
			{
			map.selectAll('circle')
    			.data(pumps)
    			.enter()
    			.append('circle')
    			.style('fill', '#3ed100')
    			.style('stroke', 'black')
    			.attr('r', 5.5)
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
			draw_pumps();

			});

/*****************  3. Extract location of each death in the deathdays file + age + gender *****************/

			var deaths = [];


var deaths_to_show = [];

	function draw_deathlocations(activedate){

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
    			 	return "#e202bc"
    				 }
    				else {
    				 return "#0300d1"
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

			// draw death locations

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
    			 	return "#e202bc"
    				 }
    				else {
    				 return "#0300d1"
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
			/**
			draw_genderplot(){



			}

			**/
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


			// set gender array
			if(record.gender==1){
			death_gender[i]= "Female"}
			else{
			death_gender[i]= "Male"}

			//set age group array

				if(record.age == 0){ age_group[i]="0-10"}
				else if(record.age == 1){ age_group[i]="11-20"}
				else if(record.age == 2){ age_group[i]="21-40"}
				else if(record.age == 3){ age_group[i]="41-60"}
				else if(record.age == 4){ age_group[i]="61-80"}
				else if(record.age == 5){ age_group[i]="> 80"}
			}//end of for statement
				//child_deaths = child_female + child_male;


				//total_deaths = male_deaths + female_deaths;


			draw_deathlocations();
//			draw_genderplot();
			});

/******************************** Deaths Timeline *********************************/

	//// 3. Extract number of deaths for each day of the outbreak ////


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
        	//.call(d3.behavior.zoom().on("zoom", function () {
        	//timeline.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")")}))
  			.append("g")
  			.attr("transform",
              "translate(" + padding.left + "," + padding.top + ")");

/////  draw deaths timeline ////

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





/************ get the data **************/
var  total_deaths=[];
var sum =0;
		d3.csv("deathdays.csv",function(error,deathdays,i){



		/** var total_deaths = d3.nest()
  		 .rollup(function(d) {
  		 return d3.sum(d, function(g) {return d.deaths; });
 		 }).entries(deathdays);
		**/
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
//				console.log("total deaths :"+total_deaths);




		//scale range of data
		xScale.domain(d3.extent(deathdays, function(d) { return d.date; }));
    	yScale.domain([0, d3.max(deathdays, function(d) { return d.deaths+10; })]);

    	timeline.append("path")
        .attr("class", "line")
        .attr("d", pathGenerator(deathdays));





    // Add the scatterplot
    timeline.selectAll("dot")
        .data(deathdays)
  		.enter().append("circle")
        .attr("r", 4.5)
        .attr("cx", function(d) { return xScale(d.date); })
        .attr("cy", function(d) { return yScale(d.deaths); })
        .on("mouseover", function(d,i) {
        activedate = d.date;
            div.transition()
                .duration(200)
                .style("opacity", .9);
            div	.html(formatTime(d.date) + "<br/> <b>Deaths:</b>"  + d.deaths +  "<br/> <b>Total Deaths:</b>" +total_deaths[i] )
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
            })

       /** timeline.selectAll("circle")
        .classed("CircleLight", function reset(d) {
          if ( d.date == activedate) return true;
          else return false;
        })
   **/
        .on("click", function(d,i) {
			//draw_totaldeaths(total_deaths[i]);
            console.log("Total deaths on clicked Date is :"+total_deaths[i]);
            console.log("active date = "+activedate);

           map.selectAll('.deaths').remove();

           draw_deathlocations(activedate);

           // var bisectDate = d3.bisector(function(d) { return d.date; }).left;
            //console.log("bisected date:", bisectDate)


        	//var selected_dates = deaths.filter(sd => deaths.date == activedate )

//		console.log("selected dates to display:", selected_dates)
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

/***************************** Gender Plot ********************/







/**
var barchart = d3.select("body")
  		  .append("svg")
		    .attr("id","barchart")
    	    .attr("width", width + padding.left*2 + padding.right)
        	.attr("height", height + padding.top + padding.bottom)
        	.append("g")
  			.attr("transform",
              "translate(" + padding.left*1.5 + "," + padding.top + ")");
              var y1Scale = d3.scale.linear().range([height, 0]);





var n = 6,
m = [ "0-10", "11-20", "21-40","41-60", "61-80", "above 80"];




var x0 = d3.scale.ordinal()
    .domain(d3.range(n))
    .rangeBands([0, width], .2);

var x1 = d3.scale.ordinal()
    .domain(d3.range(m))
    .rangeBands([0, x0.rangeBand()]);

//var x1Scale = d3.scale.linear().range([0, width]);
var y1Scale = d3.scale.linear().range([height, 0]);
y1Scale.domain([0, d3.max(deaths, function(d) { return d.deaths; })]);




/**
var gender_age_deaths = [{male:0,female:0,label:"0-10"},{male:0,female:0,label:"11-20"},{male:0,female:0,label:"21-40"},{male:0,female:0,label:"41-60"},{male:0,female:0,label:"61-80"},{male:0,female:0,label:">80"}];

    for(var i=0;i<deaths_age_sex.length;i++)
    {
                          console.log("last array",deaths_age_sex[i].age);
                            if(deaths_age_sex[i].age==0){
                                if(deaths_age_sex[i].gender==0){
                                    gender_age_deaths[0].male++;
                                }else{
                                    gender_age_deaths[0].female++;
                                }
                            }else if(deaths_age_sex[i].age==1){
                                if(deaths_age_sex[i].gender==0){
                                    gender_age_deaths[1].male++;
                                }else{
                                    gender_age_deaths[1].female++;
                                }
                            }if(deaths_age_sex[i].age==2){
                                if(deaths_age_sex[i].gender==0){
                                    gender_age_deaths[2].male++;
                                }else{
                                    gender_age_deaths[2].female++;
                                }
                            }if(deaths_age_sex[i].age==3){
                                if(deaths_age_sex[i].gender==0){
                                    gender_age_deaths[3].male++;
                                }else{
                                    gender_age_deaths[3].female++;
                                }
                            }if(deaths_age_sex[i].age==4){
                                if(deaths_age_sex[i].gender==0){
                                    gender_age_deaths[4].male++;
                                }else{
                                    gender_age_deaths[4].female++;
                                }
                            }if(deaths_age_sex[i].age==5){
                                if(deaths_age_sex[i].gender==0){
                                    gender_age_deaths[5].male++;
                                }else{
                                    gender_age_deaths[5].female++;
                                }
                            }
                        }
                        console.log("gender_age_deaths",gender_age_deaths);

                        **/

//x1Scale.domain(d3.extent(age_group, function(d) { return d; }));
/**
var male0=0, male1=0, male2=0, male3=0, male4=0, male5=0,
 female0=0, female1=0, female2=0,female3=0, female4=0,female5=0;
var valueKeys = ['Male', 'Female'];
console.log(age_group);


for (i=0; i<deaths.length; i++){

	if(deaths[i].age == 0 && deaths[i].gender == 0){
	male0++;}

	else if(deaths[i].age == 1 && deaths[i].gender == 0){
		male1+=1;}
	else if(deaths[i].age == 2 && deaths[i].gender == 0){
		male2++;}
	else if(deaths[i].age == 3 && deaths[i].gender == 0){
		male3++;}
	else if(deaths[i].age == 4 && deaths[i].gender == 0){
		male4++;}
	else if(deaths[i].age == 5 && deaths[i].gender == 0){
		male5++;}

	else if(deaths[i].age == 0 && deaths[i].gender == 1 ){
		female0++;}
	else if(deaths[i].age == 1 && deaths[i].gender == 1){
		female1++;}
	else if(deaths[i].age == 2 && deaths[i].gender == 1){
		female2++;}
	else if(deaths[i].age == 3 && deaths[i].gender == 1){
		female3++;}
	else if(deaths[i].age == 4 && deaths[i].gender == 1){
		female4++;}
	else if(deaths[i].age == 5 && deaths[i].gender == 1){
		female5++;}

}//end for loop


var x1Axis = d3.svg.axis().scale(x0)
		    .orient("bottom");

var y1Axis = d3.svg.axis().scale(y1Scale)
		    .orient("left").ticks(20);
var males=0, females =0;


for (j=0; j<= death_gender.length; j++)
{
	if(death_gender[j] == "Female"){
	females++; }
	else
	{males++;}

}
console.log("males",males, "females",females)


			barchart.selectAll("rect")
			   .data(death_gender)
			   .enter()
			   .append("rect")
			   .attr("x", function(d, i) {
			   		return i * (width / death_gender.length);
			   })
			   .attr("y", function(d) {
			   		return height - (d * 4);
			   })
			   .attr("width", width / death_gender.length - 10)
			   .attr("height", function(d) {
			   		return d * 4;
			   })
			   .attr("fill", "teal");

    // Add the barchart
   /**
    barchart.selectAll("g")
        .data(deaths)
  		.enter().append("g")
        .style('fill', function(d){
    				if (d.gender == 0)
    				{
    			 	return "#e202bc"
    				 }
    				else {
    				 return "#0300d1"
    				 }})
    	.attr("transform", function(d, i) { return "translate(" + x1(i) + ",0)"; })
 		 .selectAll("rect")
	    .data(function(d) { return age_group; })
	  	.enter().append("rect")
    	.attr("width", x1.rangeBand())
	    .attr("height", y1Scale)
    	.attr("x", function(d, i) { return x0(i); })
	    .attr("y", function(d) { return height - y(d); });




  // Add the X Axis
    barchart.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(x1Axis);

    // title of timeline
   barchart.append("text")
	.attr("transform", "translate(" + (width/2) + ")")
	.style("font", "16px times")
    .style("text-anchor", "middle")
    .text("___ Barchart of Female/Male Cholera Epidemic Deaths (1854)___");


    //  label for  X axis
  	barchart.append("text")
	.attr("transform", "translate(" + (width/2) + " ," + (height + 40) + ")")
	.style("font", "14px times")
    .style("text-anchor", "middle")
      .text("Age Groups");



    // Add the Y Axis
    barchart.append("g")
        .attr("class", "y axis")
        .call(y1Axis);

    //  label for  Y axis
    barchart.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - padding.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("font", "14px times")
      .style("text-anchor", "middle")
      .text("Number of Deaths");

   **/

/**

var x0 = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var x1 = d3.scale.ordinal();


var y = d3.scale.linear()
    .range([height, 0]);

var x1Axis = d3.svg.axis()
    .scale(x0)
    .tickSize(0)
    .orient("bottom");

var y1Axis = d3.svg.axis()
    .scale(y)
    .orient("left");

var color = d3.scale.ordinal()
    .range(["#ca0020","#f4a582"]);

//d3.json("data.json", function(error, data) {

  //var categoriesNames = data.map(function(d) { return d.categorie; });
 // var rateNames = data[0].values.map(function(d) { return d.rate; });

  x1.domain(valueKeys); //male,female
  x0.domain(age_group).rangeRoundBands([0, x1.rangeBand()]); // 0: 0-10, 1: 11-20,,etc
y1Scale.domain([0, d3.max(deathdays, function(d) { return d.deaths+10; })]);

  barchart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(x1Axis);

  barchart.append("g")
      .attr("class", "y axis")
      .style('opacity','0')
      .call(y1Axis)
  .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .style('font-weight','bold')
      .text("Value");

  barchart.select('.y').transition().duration(500).delay(1300).style('opacity','1');

  var slice = barchart.selectAll(".slice")
      .data(deaths)
      .enter().append("g")
      .attr("class", "g")
      .attr("transform",function(d) { return "translate(" + x0(d.age) + ",0)"; });

  slice.selectAll("rect")
      .data(function(d,i) { return d.age ; })
  .enter().append("rect")
      .attr("width", x1.rangeBand())
      .attr("x", function(d,i) { return x1(age_group); })
      .style("fill", function(d) { return color(valueKeys) })
      .attr("y", function(d) { return y(0); })
      .attr("height", function(d) { return height - y(0); })
     .on("mouseover", function(d) {
          d3.select(this).style("fill", d3.rgb(color(d.rate)).darker(2));
      })
      .on("mouseout", function(d) {
          d3.select(this).style("fill", color(d.rate));
      });

  slice.selectAll("rect")
      .transition()
      .delay(function (d) {return Math.random()*1000;})
      .duration(1000)
      .attr("y", function(d) { return y(d.deaths); })
      .attr("height", function(d) { return height - y(d.deaths); });

  //Legend
  var legend = barchart.selectAll(".legend")
      .data(data.values.map(function(d) { return d.rate; }).reverse())
  .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d,i) { return "translate(0," + i * 20 + ")"; })
      .style("opacity","0");

  legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", function(d) { return color(d); });

  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) {return d; });

  legend.transition().duration(500).delay(function(d,i){ return 1300 + 100 * i; }).style("opacity","1");

**/


