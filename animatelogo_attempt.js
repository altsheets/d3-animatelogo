/**
 * animatelogo.js   v05
 * by AltSheets
 * 
 * licensed under my   giveback-license-v05
 * see altsheets.ddns.net/give
 * 
 * for details how to use, see animatelogo.html
 */

function addLogo() {
	// fancy logo animation
	// clickable logo, leads to URL
	//
	// TODO: logo-centered coordinates, like ('text-anchor', 'middle')
	//
	
	// only default values, see getters & setters below
 	
	  var width 		= 700,  // default width of the whole rect
	      height 		= 500,  // default height
	  
	      initialDelay 	= 300,  // before animation starts
	      sf 			= 1.5,  // speed factor, decrease for faster
	      
		  logofilename	= "AltSheets_logo_180x180.png",
		  logowidth		= 50,
		  logoheight	= 50,
		  fontsize		= 10,
		  textbelowlogo	= "click this",
		  
		  logoClickURL	= "http://altsheets.ddns.net/",
		  logoClickTarget="_self",

		  rightborder	= 0,    // useful for CSS layers
		  
		  lastSelection = null; // hack for button "animate this again"
	      
	  function addLogoGroup(selection){
		  // add the objects that are later animated
		  
		  lastSelection = selection;  // hack for button "animate this again"
		  
		  var image = new Image();
		  image.src = logofilename;

		  logoG=selection
		    // whole logo group is clickable
		    .append('svg:a')
		    .attr  ("xlink:href"	, logoClickURL)
		    .attr  ("target"		, logoClickTarget)
		    .append("g").classed("logogroup", true);

		  logoG
		    // text below logo
		    .append("text").classed("textbelowlogo", true)
		    .text  ("")           // empty in the beginning
		    .style ('text-anchor',	'middle')
		    .attr  ('x', 			logowidth/2)
		    .attr  ('y', 			logoheight+fontsize)
		    .attr  ('font-size', 	fontsize);
		    
		  // add image to the group
		  logoG
		    .append("svg:image")
		    .attr  ("xlink:href", 	logofilename)
		    .attr  ("x", 			0)
		    .attr  ("y", 			0)
		    .attr  ("height", 		logoheight)
		    .attr  ("width",  		logowidth)
		    .attr  ('image-rendering','optimizeQuality')
	  };
	  
	  function animate(selection){
		  
		  // center of rect, minus logosize
		  var logocenterX	=	(width -logowidth)	/2
		  var logocenterY	=	(height-logoheight)	/2
		  
		  // show no text during animation
		  selection.select(".logogroup").select(".textbelowlogo").text("");
		  
		  // chained transitions
		  // N.B.: delay cannot be chained? What a pity.
		  
		  selection.select(".logogroup")
		  
			// origin
			.attr('transform', d3.svg.transform().scale(0).translate(0,0).rotate(0) )
			
			//transitions:
			.transition("logo jump to center").delay(initialDelay)
			                                 .duration(sf*700).ease("elastic-out")
			    .attr('transform', d3.svg.transform().scale(2.5).translate(logocenterX/2.7,logocenterY/3).rotate(0) )
			
			.transition("logo short blow up").duration(sf*400).ease("elastic-out-in")
			    .attr('transform', d3.svg.transform().scale(4).translate(logocenterX/5,logocenterY/5.5))
			    
			.transition("smaller again").duration(sf*400).ease("elastic-out-in")
			    .attr('transform', d3.svg.transform().scale(2.5).translate(logocenterX/2.7,logocenterY/3).rotate(0) )
			    
			.transition("logo move to corner").duration(sf*500).ease("elastic-out")
			  .attr('transform', d3.svg.transform().scale(1).translate(logocenterX*2+logowidth,0).rotate(450) )
			  
			.transition("logo turn the wrong way & scale").duration(sf*300).ease("back-in")
			  .attr('transform', d3.svg.transform().scale(0.9).translate(logocenterX*2+logowidth,0).rotate(110) )
			  
			.transition("logo turn to final position").duration(sf*300).ease("elastic-out")
			  .attr('transform', d3.svg.transform().scale(1).translate(logocenterX*2-rightborder,0).rotate(360) )
			  
			.transition("logo show click to buy")
			  .select(".textbelowlogo").text(textbelowlogo);
	  };


	  function my(selection) {
    	  addLogoGroup(selection);
    	  selection.on('load', animate(selection));
    	  
  		  // TODO: from "towards reusable charts" http://bost.ocks.org/mike/chart/
          //       selection.each(function(d, i) {
	  };
	    
	  my.animate = function() {
		  // simplistic hack for the button "animate this again" 
		  animate(lastSelection)
		  return my;
	  };
	  


	  // getters and setters
	  // learned from "towards reusable charts" http://bost.ocks.org/mike/chart/
	  // But isn't there a better way than that? 
	  // It had lots of redundant code.
	  
	  // So I am trying this now:
	  
	  gettersAndSetters=["width", "height", "initialDelay", "sf", 
	                     "logofilename", "logoClickURL", "logoClickTarget", 
	                     "logowidth", "logoheight", 
	                     "fontsize", "textbelowlogo", "rightborder"]
  
	  // unfortunately NOT WORKING AS EXPECTED!
	  
	  var that=this;
	  
	  gettersAndSetters.map(function(name) {
		  var fn = function(value) {
			  if (!arguments.length) return this[name];
			  this[name]=value;
		    return my;
		  };
		  my[name] = fn.bind(that);
	  })
	  
  
	  // prototype was this getter&setter
	  // but it needed 12 times redundant code:
	  /*
	  my.width = function(value) {
		    if (!arguments.length) return width;
		    width = value;
		    return my;
		  };
	  */

	  
	  
	  
	  return my;
};
