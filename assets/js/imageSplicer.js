/* 
 * imageSplicer.js for cover canvas interaction 
 *
 */

Site.allImages = [
	{ 
		name: "Skylar Tibbits", 
		page: 14, 
		caption: "Figure 1.1.1: Project Whirlwind’s core memory and the miniaturization yet continually physical realization of computing. Courtesy MIT Museum."
	},
	{ 
		name: "Deborah G. Douglas", 
		page: 16, 
		caption: "Figure 1.2.3 Core Memory Unit (the memory planes are stacked in the center) developed and tested with the Memory Test Computer. Three such units were developed. The first two would be wired into the main Whirlwind computer, while this third unit enabled researchers to keep using the Memory Test Computer. Mid-1950s. Michael Cardinali, photographer. Courtesy MIT Museum."
	},
	{ 
		name: "Ben Fry and Casey Reas", 
		page: 20, 
		caption: "Figure 1.3.15"
	},
	{ 
		name: "Manu Prakash, Jim Cybulski, Rebecca Konte, et al.", 
		page: 26, 
		caption: "Figure 1.4.1: Individual parts that make a Foldscope—assembly required."
	},
	{ 
		name: "Nadya Peek", 
		page: 30,
		caption: "Figure 1.5.3: A plotter made with the Cardboard Machine Kit. Photograph by James Coleman."
	},
	{ 
		name: "Benjamin H. Bratton", 
		page: 34,
		caption: "Figure 1.6.2: All images by Benjamin H. Bratton"
	},
	{ 
		name: "Leila W. Kinney", 
		page: 46,
		caption: "Figure 2.1.1: MIT cyborgs, pioneers in human-machine interaction, model their wearable computers or “smart clothes.” From right are: MIT graduate students Rehmi Post, Thad Starner, and Steve Mann with Professor Alex Pentland, left, of the Media Laboratory’s Perceptual Computing Group. Photo by Pam Berry. Courtesy of The Boston Globe via Getty Images."
	},
	{ 
		name: "Michelle Tolini Finamore", 
		page: 50,  
		caption: "Figure 2.2.2: Look from Hussein Chalayan’s One Hundred and Eleven, Spring/Summer Collection, 2007. Credit: Chris Moore, Catwalking."
	},
	{ 
		name: "Azra Akšamija", 
		page: 62,  
		caption: "Figures 2.3.1: Referencing the military origins of the word “ren-dez-vous,” the work performs as a tactical cartography of the relationships between the United States and the MENA region, assembling artists from regions to create shared stories."
	},
	{ 
		name: "M. Amah Edoh", 
		page: 66,
		caption: "Figure 2.4.3: Mme D surveys tsigan-vɔ brought by a client for ideas on how to cut the fabric for the bodice of a three-piece jupe–pagne complet."
	},
	{ 
		name: "Hyphen-Labs", 
		page: 76,
		caption: "Figures 2.6.1: HyperFace, designed and developed by Adam Harvey in collaboration with Hyphen-Labs."
	},
	{ 
		name: "Christina Agapakis and Lucy McRae", 
		page: 80,
		caption: "Figure 2.7.19: The Institute of Isolation, Lucy McRae, 2016. Photo credit: Julian Love"
	},
	{ 
		name: "Rebecca Uchill and <br>Stefan Helmreich", 
		page: 98,
		caption: "Figure 3.1.4: Scotti Clifford and Juliana Brown Eyes-Clifford from the band Scatter Their Own—Concert at Sacred Stone, Cannon Ball, ND, on August 15, 2016. Photo and description by Sarah LittleRedFeather Design-Honor the Earth."
	},
	{ 
		name: "Tal Danino", 
		page: 102,
		caption: "Figure 3.2.1: Tal Danino, Microuniverse, 2016. Bacteria grown on agar and framed in slide mounts, 25.5 × 25.5 inches. Photo: Soonhee Moon."
	},
	{ 
		name: "Claire Pentecost", 
		page: 108,
		caption: "Figure 3.3.2: Soil Chroma, Hoh Forest, Washington, Claire Pentecost, 2018."
	},
	{ 
		name: "Bill Maurer", 
		page: 112,
		caption: "Figure 3.4.2: Malagana nose ornament, gold collection object number O33312, Colección Museo del Oro, Banco de la República, Bogotá, Colombia. Photo: Clark M. Rodríguez, used with permission."
	},
	{ 
		name: "Winona LaDuke, illustrated by Sarah LittleRedfeather", 
		page: 120,
		caption:  "Figure 3.5.1: Prayers extended to Oceti Sakowan Camp that displayed the “White Stone Hill Massacre 1864” from Sacred Stone past the Cannon Ball Farm. Prayer at Cannon Ball River on September 5, 2016.  Photo and description by Sarah LittleRedFeather Design—Honor the Earth."
	},
	{ 
		name: "Stefan Helmreich and Rebecca Uchill", 
		page: 130,
		caption:  "Figure 4.1.2: Hito Steyerl, How Not to Be Seen: A Fucking Didactic Educational .MOV File, 2013. HD video, single screen in architectural environment, 15 minutes, 52 seconds. Image CC 4.0 Hito Steyerl. Image courtesy of the artist, Andrew Kreps Gallery, New York, and Esther Schipper, Berlin."
	},
	{ 
		name: "Sandy Alexandre", 
		page: 134,
		caption:  "Figure 4.2.1: Glenn Ligon, Self-Portrait Exaggerating My Black Features / Self-Portrait Exaggerating My White Features, 1998. Silkscreen on canvas, two panels, each 120 × 40 inches (304.8 × 100.6 cm). Credit: © Glenn Ligon; Courtesy of the artist, Luhring Augustine, New York, Regen Projects, Los Angeles, and Thomas Dane Gallery, London."
	},
	{ 
		name: "Trevor Paglen", 
		page: 140,
		caption:  "Figure 4.3.2: Paglen Studio Research Image. © Trevor Paglen. Courtesy of the artist."
	},
	{ 
		name: "Lisa Parks", 
		page: 144,
		caption:  "Figure 4.4.5: Screen capture of Nesting, Escaping, Crossing showing images of King Kong and Godzilla conquering human-built infrastructure. Video by Lisa Parks and Miha Vipotnik."
	},
	{ 
		name: "Nicholas Shapiro", 
		page: 154,
		caption:  "Figure 4.5.3: Dawn launch of an Aerocene solar balloon at Craters of the Moon National Monument, August 21, 2017. Photo by Nicholas Shapiro."
	},
	{ 
		name: "Evan Ziporyn", 
		page: 172,
		caption:  "Figure 5.1.1: John Cage (1990), the Festival des Hörens, Erlangen. Photo by Erich Malter. Courtesy of the John Cage Trust."
	},
	{ 
		name: "Dewa Alit", 
		page: 174,
		caption:  "Figure 5.2.2: Dewa Alit and members of Gamelan Salukat performing Yeh Ngetel."
	},
	{ 
		name: "Maya Beiser", 
		page: 176,
		caption:  "Figure 5.3.2: Maya Beiser and her cello. <br>Photos by ioulex."
	},
	{ 
		name: "Arnold Dreyblatt", 
		page: 178,
		caption:  "Figure 5.4.2: Nicola Tesla, US Patent Drawing, Coil for Electro Magnets, patented January 9, 1894, Patent No. 512,340 (excerpt)"
	},
	{ 
		name: "Victor Gama", 
		page: 180,
		caption:  "Figure 5.5.3: Toha in the INSTRMNTS exhibition at Fundação Eugénio de Almeida, Évora, Portugal (2018), Photo: Victor Gama."
	},
	{ 
		name: "Paweł Romańczuk", 
		page: 188,
		caption:  "Figure 5.8.3:Wheel Harps, constructed by Paweł Romańczuk, 2016, photo by Łukasz Rajchert."
	},
	{ 
		name: "Evan Ziporyn", 
		page: 190,
		caption:  "Figure 5.9.2: Visualization of the same four measures in Gymnopédie Z played by Ambient Orchestra, Evan Ziporyn, arranger/conductor "
	}
];

Site.imgBaseUrl = "https://math-practice.github.io/being-material/assets/img/per-contributions-cropped-resized/";

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

Site.interEasing = false;

Site.currentRegion = null;
Site.previousRegion = null;


Site.incrementer = -50;

Site.fragmented = function(ctx, slice, vertical){
	/* cut each image slice into subslices */

	// var slices = Math.round((slice.i/slice.sliceAmount) * 20);
	var slices = slice.i
	// var slices = slice.i*Math.sin((slice.i/slice.sliceAmount * Math.PI)/2);
	var jittery = function(value){
		return (value - value/8) + (Math.random()*(value/8))
	}

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

		// var q = Math.sin((Math.PI*(j/slices))/2);

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
			sx = 0 + (slice.swidth* (j/slices));
			swidth = slice.swidth/slices;
			
			//placement
			x = (slice.width* (j/slices))*1.1 + rain;
			width = (j === 0)  ? (slice.width/slices) : ((slice.width/1.1)/slices);
			y = (j % 2 === 0) ? (slice.y - (height*((slice.i/slice.sliceAmount)*2))) : (slice.y + (height*((slice.i/slice.sliceAmount)*2)));
		}
		
		ctx.drawImage(
			slice.img, 
			sx , sy, 
			swidth, sheight,
			x, y, 
			width, height
		);

		// ctx.strokeRect( x, y, width, height );

	}
}

Site.interval = setInterval(function(){

	if(Site.currentRegion !== null){
		if(Site.currentRegion < 5){
			Site.incrementer = (Site.incrementer < 200) ? Site.incrementer + 1 : -50;
		}else{
			Site.incrementer = (Site.incrementer > -100) ? Site.incrementer - 1 : 0;
		}
	}

}, 50)


Site.renderLeft = function(ctx, img, sliceAmount, yPosition, canvas){
	/* left column image rendering: */
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

Site.renderRight = function(ctx, img, sliceAmount, yPosition, canvas){
	/* right column image rendering: */
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
			Site.incrementer = -100;
			// console.log(Site.previousClientX)
			Site.targetClientX = (Images[updatedRegion].coordinates.full[0] === 1) ? 0 : 0.9;
			Site.targetClientY = (Images[updatedRegion].coordinates.full[1] === 1) ? 0 : 0.9;

		}else if(coordinateIntensity === false){
			Site.incrementer = -50;
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
			Site.domOutput(`Source: p. ${Images[currentRegion].info.page}, ${Images[currentRegion].info.name}`)
		}else{
			
			Site.domOutput("Clearing drawing... Continue moving the green insert in front of the cover...");
		}
		
		Site.updateRegions(currentRegion, Site.coverPositions[coverClassificationResults.label][1]);
	}else{
		Site.domOutput("Analyzing... Continue moving the green insert in front of the cover...");
	}

}

Site.start = function(canvas) {
  Site.resize(canvas);
  var ctx = canvas.getContext("2d");
  canvas.style.background = "rgba(0,255,0,0)";

  var img = (Site.currentRegion !== null) ? Images[Site.currentRegion].img : null; // update current image

  function render(time) {
  	// setup for rendering:
  	// ctx.fillStyle = "#FFFFFF";
  	// ctx.fillRect(0, 0, canvas.width, canvas.height);
  	// ctx.clearRect(0, 0, canvas.width, canvas.height);
  	if(Site.currentRegion !== null && img !== Images[Site.currentRegion].img){
  		// console.log(Site.previousRegion, Site.currentRegion)
			img = Images[Site.currentRegion].img; // update current image
  		
  	}else if(Site.currentRegion === null){
  		img = null;
  	}

  	// 
  	var yPosition = 0,
  			sliceAmount = Math.ceil(100*Site.currentClientX),
  			xPosition = 0,
  			xSliceAmount = Math.ceil(100*Site.currentClientY);

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
					oldXSliceAmount = Math.ceil(70*Site.interCurrentClientX),
					oldYSliceAmount = Math.ceil(70*Site.interCurrentClientY);

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
  				// Site.renderRight(ctx, img, sliceAmount, yPosition, canvas);	
  			}

  			// Site.renderMiddle(ctx, img, xSliceAmount, xPosition, canvas, direction);

  		}else if(Images[Site.currentRegion].coordinates.full[0] > 1){ // right side
  			Site.renderRight(ctx, img, sliceAmount, yPosition, canvas);
  		}
  	}
   		
  	if(Site.quitCover !== true){
  		requestAnimationFrame(render);
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


