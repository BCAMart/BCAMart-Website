// navigation.js - for use in the navigation bar of the homepage

var Navigation = new function() {
	// private:
	var marker; // moves along page scroll
	var positions = [], // contains [posy]
		items = []; // contains [navbar items]
	
	// m - marker; slides - [] of elements; elems - [] of elements (navbar)
	this.init = function(m, slides, elems) {
		marker = $(m);
		for (var i=0; i<slides.length && i<elems.length; i++) {
			positions[i] = $(slides[i]).offset().top;
			items[i] = $(elems[i]);
		}
		
		marker.css("margin-left", $(elems[0]).offset().left+"px");
		marker.css("width", $(elems[0]).width()+"px");
	};
	// updates current position
	this.move = function() {
		for (var i=0; i<positions.length; i++)
			if ($(window).scrollTop() <= Math.max(positions[i],0)) {
				marker.css("margin-left", items[i].offset().left+"px");
				marker.css("width", items[i].width()+"px");
				break;
			}
	};
};
