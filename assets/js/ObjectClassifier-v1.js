/*
 * ObjectClassifier
 */

// RESULT in JSON format
let classificationResults;

/* 
 * CONSTANTS
 *
 * @param url_cloud_api - cloud url of the model's locations.
 * @param repeats - how many repeats of the same label until true?
 * @param label_cutoffs - individual accuracy cutoffs (text lower than image) 
 */

let Site = {};

Site.undefinedCount = 0;
Site.cameraView = "environment";
Site.stream = true;
Site.redirectStarted = false;

Site.browserBanner = function(){
  var siteBanner = document.querySelector("#camera_banner");
  var bannerContents = document.querySelector("#camera_banner_contents");
  siteBanner.classList.add("switchBrowsers");
  bannerContents.innerHTML = "Please open this site in mobile Safari for a full experience...";
}



let googleStorageProtocol = "https";
if (location.protocol !== "https:") {
  googleStorageProtocol = "http";
  console.log("switched to http");
}

var CONSTANTS = {
    url_cloud_api : `${googleStorageProtocol}://storage.googleapis.com/04e86dd04c0411c711039770034830af/model.json`,
    label_repeats : 3,
    label_cutoffs : {   'Grace_Leslie': 0.75,
                        'Evan_Ziporyn': 0.75,
                        'Brendan_Landis': 0.75,
                        'Azra_Aksamija': 0.75,
                        'Tolini_Finamore': 0.75,
                        'Dewa_Alit': 0.75,
                        'Maya_Beiser': 0.75,
                        'Tal_Danino': 0.75,
                        'Lucy_McRae': 0.75,
                        'Hyphen_Labs': 0.75,
                        'Nadya_Peek': 0.75,
                        'Fry_Reas': 0.75,
                        'Pawel_Romanczuk': 0.75,
                        'Victor_Gama': 0.75,
                        'Arnold_Dreyblatt': 0.75
                      }
};


const urls = {
  Grace_Leslie : 'audible/grace-leslie',
  Evan_Ziporyn : 'audible/evan-ziporyn',
  Brendan_Landis : 'audible/brendan-landis',
  Azra_Aksamija : 'wearable/azra-aksamija',
  Tolini_Finamore : 'wearable/hussein-chalayan',
  Dewa_Alit : 'audible/dewa-alit',
  Maya_Beiser : 'audible/maya-beiser',
  Tal_Danino : 'livable/tal-danino',
  Lucy_McRae : 'wearable/lucy-mcrae',
  Hyphen_Labs : 'wearable/hyphen-labs',
  Nadya_Peek : 'programmable/nadya-peek',
  Fry_Reas : 'programmable/ben-fry-and-casey-reas',
  Pawel_Romanczuk : 'audible/pawel-romanczuk',
  Victor_Gama : 'audible/victor-gama',
  Arnold_Dreyblatt : 'audible/arnold-dreyblatt'
}


/*
 **
 Page Numbers:

  Grace_Leslie p. 186
  Evan_Ziporyn p. 190
  Brendan_Landis p 173, 184, 190, 198
  Azra_Aksamija p. 62, 193, 197
  Tolini_Finamore p. 50-61, 197
  Dewa_Alit
  Maya_Beiser
  Tal_Danino
  Lucy_McRae
  Hyphen_Labs
  Nadya_Peek
  Fry_Reas
  Pawel_Romanczuk
  Victor_Gama
  Arnold_Dreyblatt
 */


/* 
 * ObjectClassifier
 *
 * P5 - Instance Mode
 * Handles the VideoStream, fetching of the Model as well as Classification 
 */

Site.disableCamera = () =>{
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


const redirectPage = (resultSlug) => {

  // redirect commencing
  Site.redirectStarted = true;

  console.log(resultSlug)
  var base_url = window.location.origin;

  setTimeout(function(){
    window.location.replace(base_url + "/" + urls[resultSlug]);
  }, 2500);
}

const domOutput = ( input, boolean, response ) => {
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

const cameraChecks = () => {

  if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
    console.log("enumerateDevices() not supported.");
    // domOutput("enumerateDevices() not supported.")
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
    // domOutput(err.name + ": " + err.message);
  });

}


const ObjectClassifier = ( sketch ) => {

  console.log("sketch \n", sketch)


    let classifier;
    Site.video;
    let CurrObject;

    /* Preload
     * creates Video Stream
     * fetches Models from Cloud
     * assigns video size
     */

    sketch.preload = () => {
        let videoObject = { 
          video: { 
            facingMode: { 
              exact: Site.cameraView
            } 
          } 
        };

        if(!isMobile() || Site.cameraView === 'user'){ // fallback to use default when mobile device isn't accessible
          videoObject = sketch.VIDEO;
        }

        Site.video = sketch.createCapture(videoObject);
        Site.video.elt.setAttribute('playsinline', '');

        console.log("site.video\n", Site.video)
        cameraChecks()

        classifier = ml5.imageClassifier(CONSTANTS.url_cloud_api);
        Site.video.size(window.innerWidth, window.innerHeight);

        // Optional : tests if the browser is mobile
        console.log("is the browser mobile : " + isMobile());
        if(!isMobile()){
          alert("This is a Mobile Application, please switch to a Mobile Browser");
        }
    };

    
    // first classification, creates LabelObject
    sketch.setup = () => {
        sketch.rotate(sketch.PI);
        classifyVideo();
        CurrObject = new LabelObject();
    };

    
    // classifies Video 
    function classifyVideo() {
        classifier.classify(Site.video, gotResult);
    }

    // called when results are in
    function gotResult(err, results) {
        if(err){
            console.log(err);
        }else{
            if(Site.stream === false){
              return;
            }
            console.log(Site.stream)

            classifyVideo();    
            CurrObject.updateCurrObject(results[0]);
            var results = CurrObject.cutoffUpdater(CONSTANTS.label_repeats);
            if (results) classificationResults = resultJSON;

            // Optional: Dev and Log display
            if(results) {
                createResultHTML();
                console.log(classificationResults);
                domOutput(classificationResults.label, true, true);
                if(Site.redirectStarted === false){
                  redirectPage(classificationResults.label);
                }
                
                
            }else{
              Site.undefinedCount++;
              console.log(resultJSON)
              domOutput("Analyzing...");
              // domOutput("page unidentified,<br>label: " + resultJSON.label +", " + resultJSON.confidence + "<br>" + Site.undefinedCount, true);
            }


        }
    }
};


/* 
 * Optional: creates Result Div
 */

function createResultHTML (){
    var resulthtml = document.getElementById("result");
    resulthtml.innerHTML = JSON.stringify(classificationResults);
    resulthtml.style.display = 'none';
}


// ----- UTILS ----- //


/* 
 * isMobile
 *
 * checks if the browser is Mobile 
 */

function isMobile(){
    if (/Mobi/.test(navigator.userAgent)) {
        return true;
    }else{
        return false;
    }
}



/* 
 * Label Object
 *
 * Label Object to be updated at every Result
 */

class LabelObject {

    constructor(){
        this.label;
        this.confidence;
        this.curr_amount;
        this.last_conf_amounts = [];
    }


    /* Parses and updates results from the classification 
     * @param {Object} - classified Results 
     */
    updateCurrObject(object){
        this.label = object.label;
        this.confidence = object.confidence;
    }
}


/* 
 * Prototype cutoffUpdater
 *
 * counts the preivous appearances of labels depending on "repeats"
 * returns the most common appearance after "repeats" times
 *
 * Info: For this class to run correctly, on each call updateCurrObject has to be called
 * 
 * @param {Integer} - repeats       the amount of repeats to be checked for
 * @returns {Object}                the detected Object
 */

LabelObject.prototype.cutoffUpdater = function(repeats){

    let cutoff_test = this.cutoff(this.confidence, CONSTANTS.label_cutoffs[this.label]);

    if(cutoff_test){

        this.last_conf_amounts.push(this.confidence);
        this.curr_amount += 1;

        if(this.curr_amount == repeats){

            let mean_acc = this.last_conf_amounts.reduce((a, b) => a + b, 0)/repeats;

            resultJSON.label = this.label;
            resultJSON.repeats = repeats;
            resultJSON.confidence = mean_acc;

            this.reset();
            return true;
        }
        
    }else{
        this.reset();
    }
};


/* 
 * Prototype rest
 *
 * resets the Label Object's parameters 
 */

LabelObject.prototype.reset = function(){

    this.curr_amount = 0;    
    this.last_conf_amounts = [];

};


/* 
 * cutoff
 * tests the current confidence with the threshold confidence
 *
 * @param curr_conf - current classified confidence 
 * @param cutoff_conf - cutoff confidence as specified 
 * @return returns true when curr confidence is larger than cutoff, else false
 */

LabelObject.prototype.cutoff = function(curr_conf, cutoff_conf){
    if(curr_conf >= cutoff_conf){
        return true;
    }else{
        return false;
    }
};


/* 
 * resultJSON
 *
 * @param label - label that appeared "repeats" times 
 * @param repeats - how many repeats were we looking for?
 * @param confidence - mean confidence of "repeats"
 */

var resultJSON = { 
                   location: 'pages', 
                   label : null,
                   repeats : null,
                   confidence : null
                 };

