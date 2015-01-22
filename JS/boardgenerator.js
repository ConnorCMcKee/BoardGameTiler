/*
	Title:		Board Generator
	Author:		Connor C. McKee
	Version:	0.1
	Edited:		01-19-2015
	Description:
		Randomly generates a board made out of right triangles from
	the supplied images onto an HTML5 canvas called "board."
*/


//Array shuffle function (NOT MINE)
function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex ;

	//While there remain elements to shuffle...
	while (0 !== currentIndex) {

		//Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		//And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

//Handles the rendering of a square section of board
function renderSection(h, w, x, y, images, ts, context){
	
	//Cycles through rows
	for (j=0; j < h; j++){
	
		//Cycles through columns in a row, drawing tiles in pairs
		for (i=0; i < w ; i++){
		
			//Draw the upright image
			context.drawImage( images[(j*w*2)+i], (i+x)*ts, (j+y)*ts, ts, ts );
			
			//draws the upside-down image
			context.rotate(Math.PI);
			context.drawImage( images[(j*w*2)+(i+w)], (-(i+x)-1)*ts, (-(j+y)-1)*ts, ts, ts );
			context.rotate(Math.PI);
		}
	}
}

//This function will be called once the page loads completely
function generateBoard(){

	//Variables
	var tileSize = parseInt( document.getElementById('tileSize').value );	//Tile Size (in pixels)
	var height = parseInt( document.getElementById('height').value );		//Board Height (in tiles)
	var width = parseInt( document.getElementById('width').value );			//BoardWidth (in tiles)
	var canvas = document.getElementById('board');							//The Canvas object
	canvas.width = tileSize * width;
	canvas.height = tileSize * height;
	var context = canvas.getContext('2d');									//The Context object
	
	//Loop through all "Field Sets"
	var fieldSet = document.getElementsByClassName("fieldSet");
	for(f=0; f<fieldSet.length; f++){
	
		//Area Variables
		var areaWidth = parseInt( fieldSet[f].getElementsByClassName("areaWidth")[0].value );
		var areaHeight = parseInt( fieldSet[f].getElementsByClassName("areaHeight")[0].value );
		var areaX = parseInt( fieldSet[f].getElementsByClassName("areaX")[0].value );
		var areaY = parseInt( fieldSet[f].getElementsByClassName("areaY")[0].value );
		var images = [];
		
		//Loop through all "Tiles" in Field Set f
		var tiles = fieldSet[f].getElementsByClassName("tiles");
		for(t=0; t<tiles.length; t++){
			
			//Create an array of tile images
			var quantity = parseInt( tiles[t].getElementsByClassName("quantity")[0].value );
			var tile = tiles[t].getElementsByClassName("tile")[0].value;
			for(q=0; q<quantity; q++){
				var img = new Image();
				img.src = 'images/tiles/'+tile+'.png';
				images.push( img );
			}
		}
		
		//Draw area based on Area Variables
		shuffle( images );
		renderSection(areaHeight,areaWidth,areaX,areaY,images,tileSize,context);
	}
}

//Adds a new "Tiles" div to the parent Field Set
function newTile(x){

	//Creates the "Tiles" div
	var div = document.createElement('div');
	div.className = "tiles";
	div.innerHTML= x.parentNode.innerHTML;
	x.style.display = "none";
	
	//Add the "Tiles" div
	x.parentNode.parentNode.appendChild( div );
}

//
function newArea(){
	//Gets columns
	var left = document.getElementById('leftColumn');
	var right = document.getElementById('rightColumn');
	
	//Creates the new Area div
	var div = document.createElement('div');
	div.className = "fieldSet";
	div.innerHTML = document.getElementById('newArea').innerHTML;
	
	//Adds the new Area div to the shortest column
	if(left.clientHeight<=right.clientHeight){
		left.appendChild( div );
	}
	else{
		right.appendChild( div );
	}
}