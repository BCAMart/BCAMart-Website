// index.js
// for the main page of BCAMart

"use strict";

var Choices = new function() {
	// private
	var _ = this;
	var bar, selected = ""; // selected is a named type
	
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
			selected = name;
			$(".sl_trapdoor > div.slt_holder").css("display", "none");
			$(".sl_trapdoor > div.slt_holder[type="+name+"]").css("display", "inline-block");
		}
		
		/* show our food choices */
		this.food = function() {
			if (selected == "food" || selected == "") toggleBar();
			if (selected != "food") selectType("food");
		};
		
		/* show our drinks */
		this.drinks = function() {
			if (selected == "drinks" || selected == "") toggleBar();
			if (selected != "drinks") selectType("drinks");
		};
		
		/* show our available clothing */
		this.clothing = function() {
			if (selected == "clothing" || selected == "") toggleBar();
			if (selected != "clothing") selectType("clothing");
		};
		
		/* show our supplies */
		this.supplies = function() {
			if (selected == "supplies" || selected == "") toggleBar();
			if (selected != "supplies") selectType("supplies");
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
	
	// initialize page navigation
	Navigation.init($("#top_bar > #tb_slide"), $(".slide"), $("#top_bar > .tb_item"));
	$(window).scroll(Navigation.move);
};
