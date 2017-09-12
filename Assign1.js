//*******************************
//Global Variables.
//*******************************
var set_width = 350;
var set_height = 350;
var canvas_height = 400;
var canvas_width = 400;
var canvas_lining = 5;
var increase =0;
var canvasSketch;
var sketchContext;

//*******************************
//Data Array that stores days of 
//the week, amount as a percentage
//and the colour of the bars.
//*******************************
 data = [
	{name: "Mon", amount: 87, colour: "red"},
	{name: "Tue", amount: 23, colour: "blue"},
	{name: "Wed", amount: 60, colour: "yellow"},
	{name: "Thur", amount: 70, colour: "green"},
	{name: "Fri", amount: 20, colour: "orange"},
	{name: "Sat", amount: 90, colour: "black"},
	{name: "Sun", amount: 60, colour: "brown"}
];

//*******************************
//First Canvas that displays the 
//graph and the bars. Element is
//gotten from HTML and properties
//are set in javascript.
//*******************************
var canvasObj = document.getElementById('myCanvas');
var context = canvasObj.getContext('2d');

	if (canvasObj.getContext)
	{
	canvasObj.setAttribute("width", canvas_width); //sets width of canvas to variable number.
	canvasObj.setAttribute("height", canvas_height); //sets height of canvas to variable number.
	context.moveTo(canvas_lining, canvas_lining); //position where line is to be drawn.
	context.lineTo(canvas_lining, set_height); //line is to be drawn in position and given height.
	context.moveTo(canvas_lining, set_height);
	context.lineTo(set_width, set_height);
    context.fillStyle = "black"; //line is being filled with the colour black.
    context.stroke();//draws the path defined.
	context.stroke();
	interval();//calls interval method.
        
    //*************************************
    //Move bars method is used to increment
    //the size of the bars. instead of flipping
    //the canvas, negative numbers are being 
    //used and increase is decremented in 
    //order to move the bars upwards.
    //*************************************
	function moveBars(){
			increase--;
		for (var i =0; i<data.length; i++)
		{
		  context.fillStyle = data[i].colour; //filling the rectangles and days with colours in the array.
		  context.font="20px Georgia"; //setting font of the text.
		  context.fillText(data[i].name,canvas_lining + ((set_width)/data.length)*i+5,set_height +20);
		  var height =  -(set_height/100)*data[i].amount; //filling the canvas with days of the week.
		
		  if (increase>height){
			 height = increase; //used in order to prevent bars from rising infinately. 
		  }
		
		  context.fillRect(canvas_lining +2 + (set_width/data.length)*i,set_height-1,set_width/data.length-8,height);
            //filling the bars to be increased.
		
		}
	}
			
		//************************************
        //Interval method calls the moveBars
        //method which decrements the increase
        //value, thus increasing the size of
        //the bars every 10 milisecods.
        //************************************
		function interval(){
			setInterval(moveBars,10);
		}
}

//**********************************
//Second canvas that allows the 
//user to draw on it using the mouse.
//attributes width and height are set
//and canvas is positioned absolute
//so that it looks like one.
//**********************************
screenCanvas = document.getElementById("myCanvas2");
screenContext =  screenCanvas.getContext("2d");  
screenCanvas.setAttribute("width", canvas_width);
screenCanvas.setAttribute("height", canvas_height);

var answer= false;

//*******************************
//Passes in peramater object and
//searches the position of it.
//*******************************
function searchPosition(obj) {
	
	var cLeft = cTop = 0;

	if (obj.offsetParent) {


	do {
			cLeft += obj.offsetLeft;
			cTop += obj.offsetTop;


		} while (obj = obj.offsetParent);

	return [cLeft,cTop];
	}

}
//*******************************
//Passes in peramater and searches 
//for the position of the mouse
//at that time. In order to be
//able to draw on the canvas this
//step is important.
//*******************************
function getMousePos(event1)
{
	
	var positionX = 0;
	var positionY = 0;
	if (event1.pageX || event1.pageY) 	{
		positionX = event1.pageX;
		positionY = event1.pageY;
	}
	else if (event1.clientX || event1.clientY) 	{
		positionX = event1.clientX + document.body.scrollLeft
			+ document.documentElement.scrollLeft;
		positionY = event1.clientY + document.body.scrollTop
			+ document.documentElement.scrollTop;
	}
	
	
	return [positionX, positionY]; //returns the X and Y positions of the mouse.
	
}	
	
//*******************************
//drawLines function and startDrawLines
//are used to scetch on the canvas by 
//getting the co-ordinates of the mouse
//position and using .stroke() and 
//beginPath() to display the drawing.
//*******************************
function drawLines (e) {

    if (answer)
    {
	   if (!e) var e = window.event;
        
            var coOrdinates = getMousePos(e);
	        positionX =coOrdinates[0];
	        positionY =coOrdinates[1];
	        
            var totaloffset = searchPosition(canvasSketch);
            totalXoffset = totaloffset[0];
 	        totalYoffset = totaloffset[1];
            
            sketchContext.lineTo(positionX-totalXoffset, positionY-totalYoffset); 
            sketchContext.stroke();
    }   

}

function startDrawLines(e)
{
	
	if (e) var e = window.event;

	var coOrdinates = getMousePos(e);
	
	positionX =coOrdinates[0];
	positionY =coOrdinates[1];
	
	var totaloffset = searchPosition(canvasSketch);
 	totalXoffset = totaloffset[0];
 	totalYoffset = totaloffset[1];
 	
 	console.log("searchPosition: " + totalXoffset + " " + totalYoffset);
	answer= true;
    
	sketchContext.beginPath();
	sketchContext.moveTo(positionX-totalXoffset, positionY-totalYoffset); 
}

//*******************************
//Stops the drawing when user lets
//go of the mouse click by closing 
//the path and setting the boolean 
//variable to false.
//*******************************
function stopDrawLines()
{
	sketchContext.closePath();
	answer= false;
}

//*******************************
//Sets the thickness of the line
//that's being drawn by the user.
//*******************************
function setThickness(x)
{
	sketchContext.lineWidth = x;

}

//*******************************
//Selects the colourof the line
//that's being drawn by the user.
//*******************************
function setColour(name)
{
	sketchContext.strokeStyle = name;
}

//*******************************
//Clears the sketching when function
//is called.
//*******************************
function resetDraw()
{
	sketchContext.clearRect(0,0,canvasSketch.scrollWidth, canvasSketch.scrollHeight);
}

//*******************************
//This function is used to specify
//where the content is going to
//be drawn. in this case the content
//is being scetched on canvas 2.
//*******************************
function sketchDrawing()
{
	canvasSketch = document.getElementById("myCanvas2");
	sketchContext =  canvasSketch.getContext("2d");  
	canvasSketch.setAttribute("width", canvas_width);
	canvasSketch.setAttribute("height", canvas_height);

	canvasSketch.onmousemove = drawLines;
	canvasSketch.onmousedown = startDrawLines;
	canvasSketch.onmouseup = stopDrawLines;
	canvasSketch.onmouseout = stopDrawLines;
	

	document.getElementById("thickness").onchange = function(){
        setThickness(this.value);
    };												
	
    document.getElementById("pencolour").onchange = function (){ 
        setColour(this.value);
    };								
	
    document.getElementById("clear").onclick = resetDraw;

    resetDraw();//after the button clear is clicked it calls the resetDraw method to clear the lines drawn.
	
}	

//**************************************
//This is the 3rd and final canvas which 
//is placed in between the 1st and 2nd
//canvas. The purpose of having a 3rd
//canvas is so that we can add the elements
//of the 1st and 2nd canvas and merge them 
//into the 3rd in order to be able to screenshot
//the drawings as well as the bars.
//**************************************
var mergeCanvas = document.getElementById("myCanvas3");
	var merge3 =  mergeCanvas.getContext("2d");  
	mergeCanvas.setAttribute("width",canvas_width);
	mergeCanvas.setAttribute("height",canvas_height);

//***************************************
//this function is to create the image and
//get attributes of that image from html
//by passing in perametersand setting them
//locally.
//***************************************
function show_image(src, width, height, alt) {
    merge3.drawImage(myCanvas, 0,0);
    merge3.drawImage(myCanvas2, 0,0);
    var dataURL = myCanvas3.toDataURL(); //dataURL used to convert canvas elements to be imaged.
    console.log(dataURL);
    
    var img = document.createElement("img"); //creates the image as a variable.
    img.src = dataURL; //gets the source of the image. 
    img.width = width; //gets the width of the image.
    img.height = height; //gets the height of the image.
    img.alt = alt;
    
    var div = document.getElementById("display"); //gets the div element as a variable.
    var anchorTag = document.createElement("a"); //creating an anchor tag variable so that we can save the image.
    anchorTag.href = img.src; //setting the href to open the image.
    div.appendChild(anchorTag); //the div appends the anchor tag variable(displays it inside).
    anchorTag.appendChild(img);//the anchor tag appends the image.
    
    merge3.clearRect(0,0,canvasSketch.scrollWidth, canvasSketch.scrollHeight);
}

//***************************************
//When this function is called it will
//reset the bars by setting the increse
//variable to 0, thus starting the cycle 
//again. clearRect and context.stroke are 
//necessary here to clear the first canvas
//and redraw the lines.
//***************************************
function resetAnimation(){
    increase=0;
    context.clearRect(0,0, canvas_height, canvas_width);
    context.stroke();
    context.fillStyle = "black";
    context.stroke();
    context.fillStyle = "black";
}

window.addEventListener("load", sketchDrawing); //Event Listener to load the window.
