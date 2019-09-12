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


let googleStorageProtocol = "https";
if (location.protocol !== "https:") {
  googleStorageProtocol = "http";
  console.log("switched to http");
}


var CONSTANTS = {
    url_cloud_api : `${googleStorageProtocol}://storage.googleapis.com/04e86dd04c0411c711039770034830af/model.json`,
    label_repeats : 5,
    label_cutoffs : {   'Grace_Leslie': 0.80,
                        'Evan_Ziporyn': 0.95,
                        'Brendan_Landis': 0.95,
                        'Azra_Aksamija': 0.95,
                        'Tolini_Finamore': 0.95,
                        'Dewa_Alit': 0.95,
                        'Maya_Beiser': 0.95,
                        'Tal_Danino': 0.95,
                        'Lucy_McRae': 0.95,
                        'Hyphen_Labs': 0.95,
                        'Nadya_Peek': 0.95,
                        'Fry_Reas': 0.95,
                        'Pawel_Romanczuk': 0.95,
                        'Victor_Gama': 0.95,
                        'Arnold_Dreyblatt': 0.95
                      }
};

/*

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

const domOutput = ( input, boolean, response ) => {
    const domResults = document.querySelector("#dom_results");
    const pageIdentified = document.querySelector("#page_identified");
    if(domResults !== undefined){
        if(boolean && response){
          pageIdentified.innerHTML = `
            <li>
                output: ${input}
            </li>
          `;
        }else if(boolean){
          domResults.innerHTML = `
            <li>
                output: ${input}
            </li>
          `;
        }else{
          domResults.innerHTML += `
            <li>
                ${input}
            </li>
          `;
        }
        
    }
}

const cameraChecks = () => {

  if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
    console.log("enumerateDevices() not supported.");
    domOutput("enumerateDevices() not supported.")
    return;
  }

  // List cameras and microphones:
  navigator.mediaDevices.enumerateDevices()
  .then(function(devices) {
    console.log(devices)
    devices.forEach(function(device) {
      
      let output = device.kind + ": " + device.label + " id = " + device.deviceId;

      console.log(output);
      domOutput(output);

    });
  })
  .catch(function(err) {
    console.log(err.name + ": " + err.message);
    domOutput(err.name + ": " + err.message);
  });

}


const ObjectClassifier = ( sketch ) => {

    let classifier;
    let video;
    let CurrObject;

    /* Preload
     * creates Video Stream
     * fetches Models from Cloud
     * assigns video size
     */
    sketch.preload = () => {
        console.log("sketch.video", sketch.VIDEO)
        
        let videoObject = { 
          video: { 
            facingMode: { 
              exact: Site.cameraView
            } 
          } 
        };

        if(!isMobile()){ // fallback to use default when mobile device isn't accessible
          videoObject = sketch.VIDEO;
        }
        


        video = sketch.createCapture(videoObject);
        video.elt.setAttribute('playsinline', '');

        console.log(video)
        cameraChecks()

        classifier = ml5.imageClassifier(CONSTANTS.url_cloud_api);
        video.size(window.innerWidth, window.innerHeight);

        // Optional : tests if the browser is mobile
        console.log("is the browser mobile : " + isMobile());
        domOutput("is the browser mobile: " + isMobile());
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
        classifier.classify(video, gotResult);
    }

    // called when results are in
    function gotResult(err, results) {
        if(err){
            console.log(err);
            domOutput(err);
        }else{
            classifyVideo();    
            CurrObject.updateCurrObject(results[0]);
            var results = CurrObject.cutoffUpdater(CONSTANTS.label_repeats);
            if (results) classificationResults = resultJSON;


            // Optional: Dev and Log display
            if(results) {
                createResultHTML();
                console.log(classificationResults);
                domOutput(classificationResults.label, true, true);
            }else{
              Site.undefinedCount++;
              console.log(resultJSON)
              domOutput("page unidentified,<br>label: " + resultJSON.label +", " + resultJSON.confidence + "<br>" + Site.undefinedCount, true);
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

