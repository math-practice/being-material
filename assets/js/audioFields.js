/*
 *
 *
 * Audio Functions (homepage)
 *
 *
 */


Site.playAudio = (playing) => {

// play all audio
// assign each audio to a space
	Site.audioElements = document.querySelectorAll(".soundscape");
	if(Site.audioElements === undefined){ return; }

	Site.audioElements.forEach((audioElement) => {

		audioElement.volume = 0.2;

		if(playing === false){
			audioElement.play()
		}else{
			audioElement.pause()
		}
		
	})

};

Site.volumeAudio = (regions, isolated) => {
  if(regions === undefined){return};
  
  var amountOfReturnedRegions = regions.length;

  if(Site.audioElements === undefined){
  	Site.audioElements = document.querySelectorAll(".soundscape");
  }

	var coverList = [ 
		"No_Cover",
		"Cover_Covered",
		"Cover_Bottom_1",
		"Cover_Bottom_2",
		"Cover_Bottom_R1",
		"Cover_Bottom_R2",
		"Cover_Bottom_L1",
		"Cover_Bottom_L2",
		"Cover_Mid_R1",
		"Cover_Mid_R2",
		"Cover_Mid_L1",
		"Cover_Mid_L2",
		"Cover_Top_1",
		"Cover_Top_2",
		"Cover_Top_R1",
		"Cover_Top_R2",
		"Cover_Top_L1",
		"Cover_Top_L2"
	];

  Site.audioElements.forEach((audioElement, audioIndex) => {
  	var region = regions.filter((thisRegion) => thisRegion.label === coverList[audioIndex])
  	// get region by name

  	if(region[0] === undefined){
  		audioElement.muted = true;
  	}else{
  		// audioElement.volume = (region[0].confidence > 0.5) ? 0.9 : region[0].confidence/0.5;
  		// basically need to sort by regions

  		if(isolated === true){
  			if(regions[0].label === region[0].label){
	  			audioElement.muted = false;
	  		}else{
	  			audioElement.muted = true;
	  		}
  			
  		}else{
  			if(regions[0].label === region[0].label){
	  			audioElement.muted = false;
	  		}else if(regions[1].label === region[0].label){
	  			audioElement.muted = false;
	  		}else if(regions[2].label === region[0].label){
	  			audioElement.muted = false;
	  		}else{
	  			audioElement.muted = true;
	  		}
  		}

  		

  		// console.log(audioElement.volume)
  		

  	}
  })
}

