/* 
 * imageSplicer.js for cover canvas interaction 
 *
 */

var coordinates = [
	{ full: [1, 0], half: [1, 0.5] },
	{ full: [2, 0], half: [1.5, 0.5] },
	{ full: [2, 1], half: [1.5, 1] },
	{ full: [2, 2], half: [1.5, 1.5] },
	{ full: [1, 2], half: [1, 1.5] },
	{ full: [0, 2], half: [0.5, 2.5] },
	{ full: [0, 1], half: [0.5, 1] },
	{ full: [0, 0], half: [0.5, 0.5] }
];

/* generate images, src, coordinates */
var Images = [];
var startingPoint = Math.floor(Math.random()*Site.allImages.length);

for (var i = 0; i < 8; i++) {
	var imageIndex = (startingPoint + i >= Site.allImages.length) ? startingPoint + i - Site.allImages.length : startingPoint + i;

	Images[i] = {}; // construct image objects to be used this instance:
	Images[i].img = new Image();
	// randomize based off of array
	Images[i].img.src =`${Site.imgBaseUrl}${Site.allImages[imageIndex].page}.jpg`;
	Images[i].coordinates = coordinates[i];
	Images[i].info = Site.allImages[imageIndex];
}

console.log("Images featured:\n", Images)


/**************************************************/
/*
 * context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
 * ================================
 * img = file
 * cropping dimensions: sx sy, swidth, sheight 
 * placemention dimensions: x, y, width, height
 *
 */

Site.targetClientX = 0;
Site.previousClientX = 0;
Site.currentClientX = 0;
Site.xEasing = false;

Site.targetClientY = 0; // upcoming area
Site.previousClientY = 0; // previous area
Site.currentClientY = 0; // used for transitioning
Site.yEasing = false;


// ease out for secondary
Site.interTargetClientY = 0;
Site.interPreviousClientY = 0;
Site.interCurrentClientY = 0;

Site.interTargetClientX = 0;
Site.interPreviousClientX = 0;
Site.interCurrentClientX = 0;

Site.interEasing = false; // between distinct regions

Site.currentRegion = null;
Site.previousRegion = null;

Site.incrementer = 0;

Site.fragmented = function(ctx, slice, vertical){
	/* cut each image slice into subslices */
	var slices = slice.i

	var sinValue = function(value){
		return Math.cos(value*Math.PI)
	}

	for (var j = 0; j < slices; j++) {
		// base variables
		var sy = slice.sy,
				sx = slice.sx,
				swidth = slice.swidth,
				sheight = slice.sheight,
				y = slice.y,
				x = slice.x,
				width = slice.width,
				height = slice.height;

		// var oscillator = (sinValue(-50 + (Site.incrementer/100))* (100*sinValue(slice.i/(slice.sliceAmount/2))));
		var rain = Site.incrementer;

		if(vertical === true){
			//crop
			sy = 0 + (slice.sheight* (j/slices));
			sheight = slice.sheight/slices;

			//placement
			y = -30 + ((slice.height* (j/slices)))*1.1 + rain;
			height = (j === 0) ? (slice.height/slices) : ((slice.height/1.1)/slices);
			x = (j % 2 === 0) ? (slice.x - (width*((slice.i/slice.sliceAmount)*2))) + (10*sinValue(slice.i/(slice.sliceAmount/2))) : (slice.x + (width*((slice.i/slice.sliceAmount)*2))) + (10*sinValue(slice.i/(slice.sliceAmount/2)));

			if(j % 3 !== 0 && j % 5 !== 0){
				width = slice.width/4;
			}

		}else if(vertical === false){
			// crop
			// sx = 0 + (slice.swidth* (j/slices));
			// swidth = slice.swidth/slices;
			
			//placement
			// x = (slice.width* (j/slices))*1.1 + rain;
			// width = (j === 0)  ? (slice.width/slices) : ((slice.width/1.1)/slices);
			// y = (j % 2 === 0) ? (slice.y - (height*((slice.i/slice.sliceAmount)*2))) : (slice.y + (height*((slice.i/slice.sliceAmount)*2)));
		}
		
		if(slice.img.clear === true){
			ctx.clearRect(x, y, width, height);
		}else{
			ctx.drawImage(
				slice.img, 
				sx , sy, 
				swidth, sheight,
				x, y, 
				width, height
			);
		}
	}
}

Site.interval = setInterval(function(){

	if(Site.currentRegion !== null){
		if(Site.currentRegion < 5){
			Site.incrementer = (Site.incrementer < 200) ? Site.incrementer + 1 : -200;
		}else{
			Site.incrementer = (Site.incrementer > -200) ? Site.incrementer - 1 :  200;
		}
	}

}, 50)

Site.renderLeft = function(ctx, img, sliceAmount, yPosition, canvas, horiziontalSplicing){
	/* left column image rendering: */
	
	if (img === "clear"){
		img = {};
		img.clear = true;
		img.height = canvas.height;
		img.width = canvas.width;
	}

	for (var i = 0; i < sliceAmount; i++) {
		var slicePosition = i*20;
		var sinSlope = Math.sin((Math.PI*(i/sliceAmount))/2);
		var imgCanvasSliceProportion = (10*canvas.height)/img.height;



		var slice = {
			i: i,
			sliceAmount: sliceAmount,
			img: img,
			sx: slicePosition - (slicePosition*sinSlope),
			sy: 0,
			swidth: 20 - (20*sinSlope),
			sheight: img.height,
			x: slicePosition*sinSlope,
			y: yPosition,
			width: imgCanvasSliceProportion, //imgCanvasSliceProportion - (imgCanvasSliceProportion*sinSlope)
			height: canvas.height
		}

		if(horiziontalSplicing === true){
			
			ctx.drawImage(
				slice.img, 
				slicePosition, slice.sy, 
				20, slice.sheight,
				slicePosition, 0, 
				(20*slice.width)/img.width, slice.height
			);

		}	

			Site.fragmented(ctx, slice, true);
	}
}

Site.renderRight = function(ctx, img, sliceAmount, yPosition, canvas){
	/* right column image rendering: */

	if (img === "clear"){
		img = {};
		img.clear = true;
		img.height = canvas.height;
		img.width = canvas.width;
	}

	for (var i = 0; i < sliceAmount; i++) {
		var startingPoint = sliceAmount - i;
		var slicePosition = startingPoint*20;
		var sinSlope = Math.sin((Math.PI*(startingPoint/sliceAmount))/2);
		var imgCanvasSliceProportion = (10*canvas.height)/img.height;
		
		var slice = {
			i: startingPoint,
			sliceAmount: sliceAmount,
			img: img,
			sx: img.width - (slicePosition - (slicePosition*sinSlope)),
			sy: 0,
			swidth: 20*sinSlope,
			sheight: img.height,
			x: canvas.width - (slicePosition*sinSlope), // (slicePosition*sinSlope)
			y: yPosition,
			width: imgCanvasSliceProportion, // imgCanvasSliceProportion - (imgCanvasSliceProportion*sinSlope)
			height: canvas.height
		}

		// ctx.drawImage(
		// 	slice.img, 
		// 	slice.sx , slice.sy, 
		// 	slice.swidth, slice.sheight,
		// 	slice.x, slice.y, 
		// 	slice.width, slice.height
		// );
		
		Site.fragmented(ctx, slice, true);
	}
}

Site.renderMiddle = function(ctx, img, sliceAmount, xPosition, canvas, direction){
	if(direction === "middle"){return;}
	/* middle column image rendering: */

	if(direction === "up"){
		for (var i = 0; i < sliceAmount; i++) {
			var slicePosition = i*20;
			var sinSlope = Math.sin((Math.PI*(i/sliceAmount))/2);
			var imgCanvasSliceProportion = (10*canvas.width)/img.width;

			// xPosition = ((canvas.width/32) - Math.random()*(canvas.width/16)) * ((i + 10)/sliceAmount)

			var slice = {
				i: i,
				sliceAmount: sliceAmount,
				img: img,
				sx: 0,
				sy: slicePosition - (slicePosition*sinSlope),
				swidth: img.width,
				sheight: 10 - (10*sinSlope),
				x: xPosition,
				y: slicePosition*sinSlope,
				width: canvas.width,
				height: imgCanvasSliceProportion  // - (imgCanvasSliceProportion*sinSlope)
			}

			// ctx.drawImage(
			// 	slice.img, 
			// 	slice.sx , slice.sy, 
			// 	slice.swidth, slice.sheight,
			// 	slice.x, slice.y, 
			// 	slice.width, slice.height
			// );

			Site.fragmented(ctx, slice, true);
		}

	}else if(direction === "down"){
		for (var i = 0; i < sliceAmount; i++) {
			/* right column image rendering: */
			var startingPoint = sliceAmount - i;
			var slicePosition = startingPoint*20;
			var sinSlope = Math.sin((Math.PI*(startingPoint/sliceAmount))/2);
			var imgCanvasSliceProportion = (10*canvas.width)/img.width;

			// xPosition = ((canvas.width/32) - Math.random()*(canvas.width/16)) * ((i + 10)/sliceAmount)
			
			var slice = {
				i: startingPoint,
				sliceAmount: sliceAmount,
				img: img,
				sx: 0,
				sy: img.height - (slicePosition - (slicePosition*sinSlope)),
				swidth: img.width,
				sheight: 10*sinSlope,
				x: xPosition,
				y: canvas.height - (slicePosition*sinSlope),
				width: canvas.width,
				height: imgCanvasSliceProportion  // - (imgCanvasSliceProportion*sinSlope)
			}

			// ctx.drawImage(
			// 	slice.img, 
			// 	slice.sx , slice.sy, 
			// 	slice.swidth, slice.sheight,
			// 	slice.x, slice.y, 
			// 	slice.width, slice.height
			// );

			Site.fragmented(ctx, slice, true);
		}
		
	}
}


Site.updateRegions = function(updatedRegion, coordinateIntensity){
	/*	@ updatedRegion = (integer) region that was just entered 
	 *	@ coordinateIntensity = (true/false) full or half coordiantes (true = full)
	 *
	 */ 

	if(updatedRegion === Site.currentRegion){ return; }

	Site.previousRegion = Site.currentRegion;
	Site.currentRegion = updatedRegion;

	Site.interPreviousClientX = 0.6;
	Site.interPreviousClientY = 0.6;
	Site.interTargetClientX = 0;
	Site.interTargetClientY = 0;

	if(Site.previousRegion !== null){
		Site.interImageTransition();
	}

	if(coordinateIntensity === undefined){
		Site.targetClientX = 0; // define as absolute middle
		Site.targetClientY = 0; // define as absolute middle

	}else if(updatedRegion !== null){
		if(coordinateIntensity === true){

			Site.incrementer = (updatedRegion < 5) ? -100 : 100;
			// console.log(Site.previousClientX)
			Site.targetClientX = (Images[updatedRegion].coordinates.full[0] === 1) ? 0 : 0.9;
			Site.targetClientY = (Images[updatedRegion].coordinates.full[1] === 1) ? 0 : 0.9;

		}else if(coordinateIntensity === false){
			Site.incrementer = (updatedRegion < 5) ? -50 : 50;
			Site.targetClientX = (Images[updatedRegion].coordinates.half[0] === 1) ? 0 : 0.6;
			Site.targetClientY = (Images[updatedRegion].coordinates.half[1] === 1) ? 0 : 0.6;
		}
	}else{
		Site.targetClientX = 0; // default to middle
		Site.targetClientY = 0; // default to middle
	}
}

Site.easeClient = function(previous, current, target, easing){
	// ease single image in or out
	var counter = 0;
	Site[easing] = true;  	
	var increment = function(){

		if(Site[previous] < Site[target]){
			Site[current] = Site[previous] - ((Site[previous] - Site[target])*counter);
		}else{
			Site[current] = Site[previous] + ((Site[target] - Site[previous])*counter);  			
		}
		
		// tracking / conclusion:
		counter = counter + 0.1;
		if(counter >= 1){
			Site[current] = Site[target];
			Site[previous] = Site[target];
			Site[easing] = false;
			Site.transDirection = false;

			clearInterval(incrementing)
		}
	}

	var incrementing = setInterval(increment, 100);
}

Site.interImageTransition = function(){
	if(Site.previousRegion === Site.currentRegion){ return; } // if different region

	Site.imageToRemove = Images[Site.previousRegion];
	// basically i need to check out which direction it eases out

	var previousY = Images[Site.previousRegion].coordinates.full[1], 
			currentY = Images[Site.currentRegion].coordinates.full[1],
			previousX = Images[Site.previousRegion].coordinates.full[0], 
			currentX = Images[Site.currentRegion].coordinates.full[0];

	
	if(previousX < currentX){
		Site.transDirection = "left"; // move left and out
	}else if(previousX > currentX){
		Site.transDirection = "right"; // move right and out
	}
	Site.easeClient("interPreviousClientX", "interCurrentClientX", "interTargetClientX", "interEasing");
	

	// Site.interEasing = false;
}

Site.updateFields = function(coverClassificationResults){

	// alert("conver results: ", coverClassificationResults.label);

	Site.coverPositions = {
		No_Cover : [null, undefined],
		Cover_Covered : [null, undefined],
		Cover_Bottom_1 : [4, false],
		Cover_Bottom_2 : [4, true],
		Cover_Bottom_R1 : [3, false],
		Cover_Bottom_R2 : [3, true],
		Cover_Bottom_L1 : [5, false],
		Cover_Bottom_L2 : [5, true],
		Cover_Mid_R1 : [2, false],
		Cover_Mid_R2 : [2, true],
		Cover_Mid_L1 : [6, false],
		Cover_Mid_L2 : [6, true],
		Cover_Top_1 : [0, false],
		Cover_Top_2 : [0, true],
		Cover_Top_R1 : [1, false],
		Cover_Top_R2 : [1, true],
		Cover_Top_L1 : [7, false],
		Cover_Top_L2 : [7, true]
	}

	if(Site.coverPositions[coverClassificationResults.label] !== undefined){
		var currentRegion = Site.coverPositions[coverClassificationResults.label][0];
		if( currentRegion !== null){
			Site.domOutput(`Source: p. ${Images[currentRegion].info.page}, ${Images[currentRegion].info.name}`);


			if(Site.currentRegion !== currentRegion && Site.timerClearDrawing){
				clearTimeout(Site.timerClearDrawing);
				Site.clearingDrawing = false;
			}

			if(Site.clearingDrawing !== true){
				Site.clearingDrawing = true;
				Site.timerClearDrawing = setTimeout(function(){
					// setTimeout to update canvas with almost-full image of drawing
					if(Site.globalCanvas === undefined){ return; }

					console.log("\nCanvas reset\n\n");
					var glbCtx = Site.globalCanvas.getContext("2d");

					var firstResult = [coverClassificationResults];

					Site.volumeAudio(firstResult, true); // set audio isolation

					var timeoutCounter = 0;
					for (var i = 0; i < 11; i++) {
						setTimeout(function(){
							timeoutCounter++;

							if(timeoutCounter === 10){
								glbCtx.drawImage(
									Images[Site.currentRegion].img,
									0,0, Site.globalCanvas.width, Site.globalCanvas.height);
								Site.renderLeft(glbCtx, Images[Site.currentRegion].img, 10, 0, Site.globalCanvas);
							}else{
								Site.renderLeft(glbCtx, Images[Site.currentRegion].img, Math.round(timeoutCounter*(70/10)), 0, Site.globalCanvas, true);
							}

						}, i*125)

					}

					Site.clearingDrawing = false;
				}, 10000)
			}

			

		}else{
			
			Site.domOutput("Clearing drawing... Continue moving the green insert in front of the cover...");
		}
		
		Site.updateRegions(currentRegion, Site.coverPositions[coverClassificationResults.label][1]);
	}else{
		Site.domOutput("Analyzing... Continue moving the green insert in front of the cover...");
	}

}

Site.start = function(canvas) {
  Site.globalCanvas = canvas;
  Site.resize(canvas);
  var ctx = canvas.getContext("2d");
  canvas.style.background = "rgba(0,255,0,0)";

  var img = (Site.currentRegion !== null) ? Images[Site.currentRegion].img : null; // update current image

  function render(time) {
  	// setup for rendering:
  	// ctx.fillStyle = "#FFFFFF";
  	// ctx.fillRect(0, 0, canvas.width, canvas.height);
  	if(Site.currentRegion !== null && img !== Images[Site.currentRegion].img){
  		// console.log(Site.previousRegion, Site.currentRegion)
			img = Images[Site.currentRegion].img; // update current image
  		
  	}else if(Site.currentRegion === null){
  		img = null;
  	
  		// ctx.clearRect(0, 0, canvas.width, canvas.height);
  		Site.renderRight(ctx, "clear", 40, 0, canvas);
  		Site.renderLeft(ctx, "clear", 40, 0, canvas);
  	}

  	// 
  	Site.sliceMax = 50;
  	var yPosition = 0,
  			sliceAmount = Math.ceil(Site.sliceMax*Site.currentClientX),
  			xPosition = 0,
  			xSliceAmount = Math.ceil(Site.sliceMax*Site.currentClientY);

  	// transitions 
		if(Site.previousClientX !== Site.targetClientX && Site.xEasing === false){
			// console.log("previousClientX", Site.previousClientX, "\ntargetClientX", Site.targetClientX);
			Site.easeClient("previousClientX", "currentClientX", "targetClientX", "xEasing"); // ease between two numbers
		}

		if(Site.previousClientY !== Site.targetClientY && Site.yEasing === false){
			// console.log("previousClientY", Site.previousClientY, "\ntargetClientY", Site.targetClientY);
			Site.easeClient("previousClientY", "currentClientY", "targetClientY", "yEasing"); // ease between two numbers	
		}

		// rendering
		if(Site.transDirection !== false && Site.imageToRemove !== null && Site.imageToRemove !== undefined){
			
			var oldimg = Site.imageToRemove.img,
					oldXSliceAmount = Math.ceil(Site.sliceMax*Site.interCurrentClientX),
					oldYSliceAmount = Math.ceil(Site.sliceMax*Site.interCurrentClientY);

			// render fade out:
			// console.log(Site.imageToRemove)

			//  Site.previousRegion, Site.currentRegion

			if(Site.transDirection == "left"){
				// console.log("rendering Left")
				Site.renderLeft(ctx, oldimg, oldXSliceAmount, yPosition, canvas)
			}else if(Site.transDirection == "right"){
				// console.log("rendering Right")
				Site.renderRight(ctx, oldimg, oldXSliceAmount, yPosition, canvas)
			}

		}

  	if(img !== null){  		
  		if(Images[Site.currentRegion].coordinates.full[0] < 1){ // left side
				Site.renderLeft(ctx, img, sliceAmount, yPosition, canvas)
  		}else if(Images[Site.currentRegion].coordinates.full[0] == 1){
  			// image is in middle
  			var direction = "middle";
  			
  			if(Images[Site.currentRegion].coordinates.full[1] < 1){
  				direction = "up";
  				Site.renderLeft(ctx, img, sliceAmount, yPosition, canvas)
  			}else if(Images[Site.currentRegion].coordinates.full[1] > 1){
  				direction = "down";
  				Site.renderRight(ctx, img, sliceAmount, yPosition, canvas);	
  			}

  			// Site.renderMiddle(ctx, img, xSliceAmount, xPosition, canvas, direction);

  		}else if(Images[Site.currentRegion].coordinates.full[0] > 1){ // right side
  			Site.renderRight(ctx, img, sliceAmount, yPosition, canvas);
  		}
  	}
   		
  	if(Site.quitCover !== true){
  		requestAnimationFrame(render);
  	}else{
  		if(document.querySelector("#home_sketch video") !== null ) { document.querySelector("#home_sketch video").remove(); }
  		if(document.querySelector("#home_sketch canvas") !== null ) { document.querySelector("#home_sketch canvas").remove(); }
  	}
	}
  requestAnimationFrame(render);
}



/**************************************************/
/**************************************************/

Site.resize = function(canvas) {
  var width = canvas.clientWidth; //starting dimesions
  var height = canvas.clientHeight;
  if (width != canvas.width || height != canvas.height) {
    canvas.width = width;
    canvas.height = height;
  }
}



// document.addEventListener('DOMContentLoaded', function(event) {
// 	var canvasElement = document.querySelector("canvas");
// 	Images[0].img.onload = Site.start(canvasElement);
// })


