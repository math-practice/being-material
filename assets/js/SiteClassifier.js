/*
 * Top level JS page, initializes global Site object
 * MIT Being Material
 *
 */
 
let Site = {};

Site.googleStorageProtocol = "https";
if (location.protocol !== "https:") {
  Site.googleStorageProtocol = "http";
  console.log("switched to http");
}


// place banner contents
Site.browserBanner = () => {
  var siteBanner = document.querySelector("#camera_banner");
  var bannerContents = document.querySelector("#camera_banner_contents");
  siteBanner.classList.add("switchBrowsers");
  bannerContents.innerHTML = "Please open this site in mobile Safari for a full experience...";
}

Site.disableCamera = () => {
  console.log("quit camera", Site.classifier)
  
  if (navigator.mediaDevices.getUserMedia !== null) {
   // still trying to stop video
  }

  if(Site.video){
    Site.video.stop()
    Site.video.remove() // remove input
    Site.classifier.remove() // remove p5 instance
  }
  Site.stream = false;
   // disable camera
}

Site.domOutput = ( input, boolean, response ) => {
    const bannerOutput = document.querySelector("#camera_banner_contents");
    const pageLoader = document.querySelector("#page_loader");

    if(bannerOutput !== undefined){
      if(boolean && response){

        if(!pageLoader.classList.contains("active")){
          pageLoader.classList.add("active");
          pageLoader.innerHTML = `<svg viewBox="60 0 320 330">
            <path d="M 75, 75 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0" fill="none" stroke="rgb(90,90,90)" stroke-width="150" stroke-dasharray="0 600 600 0" stroke-dashoffset="1000" transform="translate(75,75) rotate(90,100,100) ">
              <animate attributeType="XML" attributeName="stroke-dashoffset" from="0" to="600" dur="2s" repeatCount="1" fill="freeze"/> 
            </path>
          </svg>`;
        }
        
        bannerOutput.innerHTML = `${input}`;
      }else if((boolean && Site.redirectStarted !== true) || Site.redirectStarted !== true){
        bannerOutput.innerHTML = `${input}`;
      }
        
    }
}

Site.cameraChecks = () => {

  if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
    console.log("enumerateDevices() not supported.");
    // Site.domOutput("enumerateDevices() not supported.")
    Site.browserBanner();
    return;
  }

  // List cameras and microphones:
  navigator.mediaDevices.enumerateDevices()
  .then(function(devices) {
    console.log(devices)
    devices.forEach(function(device) {
      
      let output = device.kind + ": " + device.label + " id = " + device.deviceId;

      console.log(output);

    });
  })
  .catch(function(err) {
    console.log(err.name + ": " + err.message);
    // Site.domOutput(err.name + ": " + err.message);
  });

}

Site.startVideo = () => {
  // quit cover
  Site.quitCover = true;

  // start page searching (ObjectClassifier)
  Site.classifier = new p5( ObjectClassifier, 'sketch');
  const banner = document.querySelector("#camera_banner");
  banner.classList.add("active");
}

Site.startHomeVideo = () => {
  Site.quitCover = false;
  Site.classifier = new p5( CoverClassifier, 'home_sketch');
  const banner = document.querySelector("#camera_banner");
  banner.classList.add("active");

  var canvasElement = document.querySelector("#photo_canvas");
  Images[0].img.onload = Site.start(canvasElement);

}


Site.toggleCamera = () => {
  const cameraHomeButton = document.querySelector("#btn-camera");
  const cameraButton = document.querySelector("#book-btn");
  
  if(cameraHomeButton !== undefined){
    cameraHomeButton.addEventListener("click", Site.startHomeVideo);
  }
  
  if(cameraButton !== undefined){
    cameraButton.addEventListener("click", Site.startVideo);
  }
}