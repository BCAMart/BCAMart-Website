// index.js
// for the main page of BCAMart

"use strict";

var Choices = new function() {
	// private
	var _ = this;
	var bar;
	
	this.init = function() {
		bar = $("#slide2 > .sl_holder > .sl_trapdoor");
	};
	
	this.show = new function() {
		// private
		var _s = this;
		var timer;
		
		function showBar() {
			if (bar.css("height") != "0px" || timer) return;
			bar.css("display", "block");
			bar.css("height", "223px");
		}
		
		function hideBar() {
			if (bar.css("height") == "0px") return;
			bar.css("height", "0px");
			timer = setTimeout(function() {
				bar.css("display", "none");
				clearTimeout(timer);
			}, 1000);
		}
		
		/* show our food choices */
		this.food = function() {
			showBar();
		};
		
		/* show our drinks */
		this.drinks = function() {
		};
		
		/* show our available clothing */
		this.clothing = function() {
		};
		
		/* show our supplies */
		this.supplies = function() {
		};
	}
};

window.onload = function() {
	Choices.init(); // initialize choices
	
	// initialize buttons for slide 2
	var buttons = $("#slide2 .sl_choice > *:first-child");
	for (var i=0, name=""; i<buttons.size(); i++)
		if (typeof (name=$(buttons[i]).parent().attr("name")) != "undefined")
			buttons[i].onclick = Choices.show[name];
};
