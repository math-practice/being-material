

Site.imgBaseUrl = "https://math-practice.github.io/being-material/assets/img/links/";

Site.mix = function(a, b, l) {
  return a + (b - a) * l;
}
  
Site.upDown = function(v) {
  return Math.sin(v) * 0.5 + 0.5;
}

var SubCanvases = [];

// construct sub canvases
for (var i = 0; i < 10; i++) { // construct subcanvases
	SubCanvases[i] = document.createElement("canvas");
	SubCanvases[i].width = 1;
	SubCanvases[i].height = 1;
	// save image
	SubCanvases[i].img = new Image();
	SubCanvases[i].img.src = Site.imgBaseUrl + `image-${Math.ceil(Math.random()*144)}.jpg`;
	SubCanvases[i].imageLoaded = false;
}


Site.updateSubCanvas = function(subCanvas){
	// update subcanvas rendering
	var subCanvasCtx = subCanvas.getContext("2d");

	var canvasSize = 100;
	// canvas scale
	if(subCanvas.count/subCanvas.endcount < 0.25){
		var scalingUp = Math.ceil(canvasSize * ((subCanvas.count/subCanvas.endcount)*4));
		subCanvas.width = (scalingUp > 1) ? scalingUp : 1;
		subCanvas.height = (scalingUp > 1) ? scalingUp : 1;

	}else if(subCanvas.count/subCanvas.endcount >= 0.25 && subCanvas.count/subCanvas.endcount < 0.75){
		subCanvas.width = canvasSize;
		subCanvas.height = canvasSize;
	}else{
		var scalingDown = Math.ceil(canvasSize * ((1 - (subCanvas.count/subCanvas.endcount)) * 4))
		subCanvas.width = (scalingDown > 1) ? scalingDown : 1;
		subCanvas.height = (scalingDown > 1) ? scalingDown : 1;
	}

	// canvas contents (dummy)
	// subCanvasCtx.clearRect(0, 0, 200, 200);
	// subCanvasCtx.fillStyle = `rgba(0,255,0, 0.8)`;
	// subCanvasCtx.fillRect(0, 0, 50, 30);

	// canvas contents (images)
	var t1 = subCanvas.count;
  var t2 = subCanvas.count * 0.37;

  // for each line in the canvas
  for (var dstX = 0; dstX < subCanvas.width; ++dstX) {
    
    // v is value that goes 0 to 1 down the canvas
    var v = dstX / subCanvas.width;
    
    // compute some amount to offset the src
    var off1 = Math.sin((v) * Site.mix(3, 10, Site.upDown(t1))) * 300;
    var off2 = Math.sin((v) * Site.mix(3, 12, Site.upDown(t2))) ;
    var off = off1 + off2;
    // off = 0;
    
    // compute what line of the source image we want
    // NOTE: if off = 0 then it would just be stretching
    // the image down the canvas.
    var srcX = dstX * subCanvas.img.width / subCanvas.width + off;
    
    if (srcX < 1) {
       srcX = -srcX
    } else if (srcX > subCanvas.img.width - 1) {
      srcX = subCanvas.img.width-(srcX-subCanvas.img.width);
    } 

    // draw a single line from the src to the canvas
    // subCanvasCtx.drawImage(
    //   subCanvas.img, 
    //   0, 0, subCanvas.img.width, subCanvas.img.height,  
    //   0, 0, 100, 100
    // );

    subCanvasCtx.drawImage(
      subCanvas.img, 
      srcX, 10, 1, subCanvas.img.height,  
      dstX, 10, 1, subCanvas.height
    );

    /*
    	context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
			================================
			img = file
			cropping dimensions: sx sy, swidth, sheight 
			placemention dimensions: x, y, width, height
    */

  } 


}

Site.linearCoordinate = function(startCoord, endCoord, count, endcount){
	var outputCoords = [0,0];
	
	for (var i = 0; i < outputCoords.length; i++) {
		var percent = count/endcount,
				currentCoord = startCoord[i] + ((startCoord[i] + endCoord[i]) * percent);

		if(startCoord[i] > endCoord[i]){
			outputCoords[i] = startCoord[i] - ((startCoord[i] - endCoord[i]) * percent);
		}else{
			outputCoords[i] = startCoord[i] + ((endCoord[i] - startCoord[i]) * percent);
		}	
	}

	return outputCoords;
}

Site.quadraticCoordinate = function(startCoord, endCoord, count, endcount, controlCoord){

	var outputCoords = [0,0];
	var percent = count/endcount;

	for (var i = 0; i < outputCoords.length; i++) {
		outputCoords[i] = Math.pow(1-percent,2) * startCoord[i] + 2 * (1-percent) * percent * controlCoord[i] + Math.pow(percent,2) * endCoord[i]; 
	}

	return outputCoords;
}

Site.generateControlCoordinates = function(startCoord, endCoord){
	var controlCoordinates = [0,0];

	// find somewhere between the two x's

	for (var i = 0; i < startCoord.length; i++) {
		if(startCoord[i] > endCoord[i]){
			controlCoordinates[i] = endCoord[i] + (Math.random() * (startCoord[i] - endCoord[i]));
		}else{
			controlCoordinates[i] = startCoord[i] + (Math.random() * (endCoord[i] - startCoord[i]));
		}	
	}
	return controlCoordinates;
}


Site.start = function(canvas) {
  Site.resize(canvas);
  var ctx = canvas.getContext("2d");
  canvas.style.background = "rgba(0,0,0,0)";
  var clientX = 1;
  var clientY = 1;

  // navigate position of subcanvases
	SubCanvases.forEach(function(subCanvas){

		subCanvas.startCoordinates = [canvas.width/2 - 100, canvas.height/2 - 100];
		subCanvas.endCoordinates = [
			Math.random()*(canvas.width), 
			Math.random()*(canvas.height)
		];
		subCanvas.controlCoordinates = Site.generateControlCoordinates(subCanvas.startCoordinates, subCanvas.endCoordinates)		

		// time present
		subCanvas.start = null;
		subCanvas.endcount = 1 + Math.random()*2;
	})




  Site.render = function(time) {
  	ctx.clearRect(0, 0, canvas.width, canvas.height);
  	
  	SubCanvases.forEach(function(subCanvas){

  		if(!subCanvas.start){ // if we haven't started
	  		subCanvas.start = time * 0.0005;
	  	}
	  	subCanvas.count = (time * 0.0005) - subCanvas.start; // while cycling, update with the difference (starts at 0)

  		Site.updateSubCanvas(subCanvas);
  		var currentCoords = Site.quadraticCoordinate(subCanvas.startCoordinates, subCanvas.endCoordinates, subCanvas.count, subCanvas.endcount, subCanvas.controlCoordinates);

  		// positioning containing image onto canvas
  		// ctx.drawImage(
	   //    subCanvas, 
	   //    100,
	   //    100
	   //  );

	    ctx.drawImage(
	      subCanvas, 
	      currentCoords[0],
	      currentCoords[1]
	    );

  	})
    	
			SubCanvases.forEach(function(subCanvas){
				if(subCanvas.count > subCanvas.endcount){
					subCanvas.start = time *0.0005; // update difference once we've reached loop
					subCanvas.endcount = 1 + Math.random()*2;

					subCanvas.endCoordinates = [
						Math.random()*(canvas.width), 
						Math.random()*(canvas.height)
					];
					subCanvas.controlCoordinates = Site.generateControlCoordinates(subCanvas.startCoordinates, subCanvas.endCoordinates)				
				}

			})

  	requestAnimationFrame(Site.render);
	}
  requestAnimationFrame(Site.render);
}


Site.resize = function(canvas) {
  var width = canvas.clientWidth;
  var height = canvas.clientHeight;
  if (width != canvas.width || height != canvas.height) {
    canvas.width = width;
    canvas.height = height;
  }
}


// document.addEventListener('DOMContentLoaded', function(event) {
// 	var canvasElement = document.querySelector("canvas");
// 	Site.start(canvasElement);
// })