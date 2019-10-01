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


Site.undefinedCount = 0;
Site.cameraView = "environment";
Site.stream = true;
Site.redirectStarted = false;


var CONSTANTS = {
    url_cloud_api : `${Site.googleStorageProtocol}://storage.googleapis.com/04e86dd04c0411c711039770034830af/model.json`,
    label_repeats : 3,
    label_cutoffs : {   'Grace_Leslie': 0.85,
                        'Evan_Ziporyn': 0.85,
                        'Brendan_Landis': 0.85,
                        'Azra_Aksamija': 0.75,
                        'Tolini_Finamore': 0.85,
                        'Dewa_Alit': 0.85,
                        'Maya_Beiser': 0.85,
                        'Tal_Danino': 0.85,
                        'Lucy_McRae': 0.85,
                        'Hyphen_Labs': 0.85,
                        'Nadya_Peek': 0.85,
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
 * ObjectClassifier
 *
 * P5 - Instance Mode
 * Handles the VideoStream, fetching of the Model as well as Classification 
 */



const redirectPage = (resultSlug) => {

  // redirect commencing
  Site.redirectStarted = true;

  // console.log(resultSlug)
  var base_url = window.location.origin;

  setTimeout(function(){
    window.location.replace(base_url + "/" + urls[resultSlug]);
  }, 2500);
}

const ObjectClassifier = ( sketch ) => {

  // console.log("sketch \n", sketch)


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

        // console.log("site.video\n", Site.video)
        Site.cameraChecks()

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
            // console.log(Site.stream)

            classifyVideo();    
            CurrObject.updateCurrObject(results[0]);
            var results = CurrObject.cutoffUpdater(CONSTANTS.label_repeats);
            if (results) classificationResults = resultJSON;

            // Optional: Dev and Log display
            if(results) {
                createResultHTML();
                // console.log(classificationResults);
                Site.domOutput(classificationResults.label, true, true);
                if(Site.redirectStarted === false){
                  redirectPage(classificationResults.label);
                }
                
                
            }else{
              Site.undefinedCount++;
              // console.log(resultJSON)
              Site.domOutput("Analyzing...");
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
