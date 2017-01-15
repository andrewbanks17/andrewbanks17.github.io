
//this doc deals with moving background in objects

var timer = setInterval(moveColorInBlock, 25);
var xDir = Math.floor((Math.random() * 5))-2;
var yDir = Math.floor((Math.random() * 5))-2;
var curX = 0;
var curY = 0;
var switchDirectionTime = 50; //50 frames before color block moves into a new direction
//moving text in name
$(document).ready(function() {
	var movementStrength = 20;
	var height = movementStrength / $(window).height();
	var width = movementStrength / $(window).width();
	$(document).mousemove(function(e){
		var pageX = e.pageX - ($(window).width() / 2);
		var pageY = e.pageY - ($(window).height() / 2);
		var newvalueX = width * pageX * -1 - 25;
		var newvalueY = height * pageY * -1 - 50;
		$('#titleName').css("background-position", newvalueX+"px     "+newvalueY+"px");
	});
});

function moveColorInBlock(){
	
	$('#colorBox').css("background-position", curX+"px     "+curY+"px");
	$('#colorHeader').css("background-position", curX+"px     "+curY+"px");
	curX+=xDir;
	curY+=yDir;

	switchDirectionTime--;
	
	if(switchDirectionTime == 0){
		xDir = Math.floor((Math.random() * 5)-2);
		yDir = Math.floor((Math.random() * 5)-2);
		switchDirectionTime = 50;
	}
}