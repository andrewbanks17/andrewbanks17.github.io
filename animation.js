//This document manages animejs

//initial weather is rain?
var isSnow = true;//change this to true or false to start with snow or not
var currRainNumber = 10; //starting number of particles.

var duration = 0;//changes depending on snow or rain
var toAnimate = [];
var colors = ['#FF324A', '#31FFA6', '#206EFF', '#FFFF99'];
var isColor = false;

//snow rain interchangable vars. Only required moving animation fields. initial is for rain
var TranslateX = 0;//changed to +- 60 or 0 depending on snow or rain


//intialization of icon highlight and default vars
var snowInit = (isSnow ? toSnow() : toRain());

function createElements(numberOfEles) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < numberOfEles; i++) {
    var el=document.getElementById("rain").cloneNode(true);
    var snowSize = anime.random(2,15);

    //spawn location
    el.style.left = (anime.random(0,100))+'%';
    el.style.top = -1*(anime.random(0,10))+'px';


    //initializes snow or rain
    if(isSnow == false){
      el.style.height = (anime.random(2,40))+'px';

    }
    else{
      var snowHeight = anime.random(3,15);
      el.style.height = snowHeight+'px';
      el.style.width = anime.random(snowHeight-2,snowHeight+2)+'px';//makes the snow a bit different from eachother

    }

    if(isColor){
      el.style.background = colors[anime.random(0, 3)];
    }
    else{
      el.style.background = '#DAD2E2';
    }
    toAnimate.push(el);
    fragment.appendChild(el);
  }
  document.body.appendChild(fragment);
}

//this is the max possible size. removing eles from the DOM will not work, so I just gotta hide em..
var initializeElements = createElements(currRainNumber);

var animate = function(el) {
  anime({
    targets: el,
    translateY: ('90em'),
    translateX: (-1*anime.random(-TranslateX, TranslateX))+'em',
    delay: anime.random(0, duration),
    duration: anime.random(700, duration),
    easing: "easeInCubic",
    loop: true
  });

}

//beginning animation initialization
for(var i = 0; i < currRainNumber; i++){
  animate(toAnimate[i]);
}

function addRain(){
  createElements(10);
  for (var i = toAnimate.length - 10; i < toAnimate.length; i++) {
    animate(toAnimate[i]);
  }
}

function removeRain(){

  if(toAnimate.length - 10 >= 0){

    //this works by splicing the front of the array off. removal is O(1) time operation woop
    for(var i = 0; i <10; i++){
     anime.remove(toAnimate[0]);
     document.body.removeChild(toAnimate[0]);
     toAnimate.splice(0, 1 );
   }
 }
}

function toRain(){
  console.log(document.getElementById("rainIcon").style.background);
  document.getElementById("rainIcon").style.backgroundColor="#ff4a17";
  document.getElementById("snowIcon").style.backgroundColor="transparent";
  isSnow = false;
  TranslateX = 0;
  duration = 2000;
}

function toSnow(){
  document.getElementById("rainIcon").style.backgroundColor="transparent";
  document.getElementById("snowIcon").style.backgroundColor="#ff4a17";
  isSnow = true;
  TranslateX = 60;
  duration = 7000;
}

function reset(){
  console.log(toAnimate.length);
  for(var i = toAnimate.length-1; i >=0; i--){

   anime.remove(toAnimate[i]);
   document.body.removeChild(toAnimate[i]);
   toAnimate.splice(i, 1);
 }
}

function toggleColor(){
  isColor = !isColor;

  if(isColor){
    document.getElementById("centerColorText").innerHTML = "ON"; 

    //when you dont know what to do, Jquery?
    $('#colorBox').css("background", "url(Images/colorScheme2.png)repeat");

    $('#colorHeader').css("background", "url(Images/colorScheme3.png)repeat");
    $('#colorHeader').css("-webkit-background-clip", "text");
    $('#colorHeader').css("-ms-background-clip", "text");
    $('#colorHeader').css("background-clip", "text");
  }
  else{
    document.getElementById("centerColorText").innerHTML = "OFF"; 

    //when you dont know what to do, Jquery?
    $('#colorBox').css("background", "#DAD2E2");

    /*resets color h4 back to normal
    $('#colorHeader').css("background", "#cae9fa");
    $('#colorHeader').css("-webkit-background-clip", "text");
    $('#colorHeader').css("-ms-background-clip", "text");
    $('#colorHeader').css("background-clip", "text");
    */
  }


}