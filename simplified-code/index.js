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
		var timer = 0, sTimer = 0;
		
		function showBar(func) {
			// func - callback function
			if (bar.css("height") != "0px") return;
			if (typeof func == "function") {
				clearTimeout(sTimer);
				sTimer = setTimeout(function() {
					func();
					sTimer = 0;
				}, 1000); // delay = 1s
			}
			bar.css("display", "block");
			bar.css("height", "223px");
		}
		
		function hideBar() {
			if (bar.css("height") == "0px") return;
			bar.css("height", "0px");
			clearTimeout(timer);
			timer = setTimeout(function() {
				bar.css("display", "none");
				timer = 0;
			}, 1000);
		}
		
		function toggleBar(func) {
			// func - our function to call when showing the bar
			(bar.css("height") != "0px" || timer) ? hideBar() : 
				(typeof func == "function" ? showBar(func) : showBar());
		}
		
		function selectType(name) {
			$(".sl_trapdoor > div.slt_holder").css("display", "none");
			$(".sl_trapdoor > div.slt_holder[type="+name+"]").css("display", "inline-block");
		}
		
		/* show our food choices */
		this.food = function() {
			selectType("food");
			toggleBar();
		};
		
		/* show our drinks */
		this.drinks = function() {
			selectType("drinks");
			toggleBar();
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
