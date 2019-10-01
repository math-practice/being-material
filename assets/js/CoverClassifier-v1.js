/*
 * CoverClassifier
 */

// RESULT in JSON format
let coverClassificationResults;

/* 
 * COVERCONSTANTS
 *
 * @param url_cloud_api - cloud url of the model's locations.
 * @param repeats - how many repeats of the same label until true?
 * @param page_cutoffs - individual accuracy cutoffs (text lower than image) 
 */


var COVERCONSTANTS = {
    url_cloud_api : `${Site.googleStorageProtocol}://storage.googleapis.com/0652e19c2756fa5efdcc882d92fa8fb8/model.json`,


    cover_label_repeats : 1,
    page_cutoffs : {    
                      'No_Cover' : 0.40,
                      'Cover_Covered' : 0.50,

                      'Cover_Bottom_1' : 0.50,
                      'Cover_Bottom_2' : 0.80,

                      'Cover_Bottom_R1' : 0.50,
                      'Cover_Bottom_R2' : 0.95,

                      'Cover_Bottom_L1' : 0.50,
                      'Cover_Bottom_L2' : 0.50,

                      'Cover_Mid_R1' : 0.80,
                      'Cover_Mid_R2' : 0.50,

                      'Cover_Mid_L1' : 0.50,
                      'Cover_Mid_L2' : 0.50,

                      'Cover_Top_1' : 0.50,
                      'Cover_Top_2' : 0.95,

                      'Cover_Top_R1' : 0.50,
                      'Cover_Top_R2' : 0.50,

                      'Cover_Top_L1' : 0.50,
                      'Cover_Top_L2' : 0.50

                    }
};

/* 
 * CoverClassifier
 *
 * P5 - Instance Mode
 * Handles the VideoStream, fetching of the Model as well as Classification 
 */

const CoverClassifier = ( sketch ) => {

    

    console.log("cover classifier ~")
    Site.domOutput("Welcome! Pull out the green insert and move it in front of the cover...");

    let classifier;
    Site.coverVideo;
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


        Site.cameraChecks();

        // Site.coverVideo = sketch.createCapture(sketch.VIDEO);
        Site.coverVideo = sketch.createCapture(videoObject);
        classifier = ml5.imageClassifier(COVERCONSTANTS.url_cloud_api);
        // Site.coverVideo.size(window.innerWidth, window.innerHeight);

        // Optional : tests if the browser is mobile
        console.log("is the browser mobile : " + isMobile());
        if(!isMobile()){
            alert("This is a Mobile Application, please switch to a Mobile Browser");
        }
    };

    
    // first classification, creates coverLabelObject
    sketch.setup = () => {
        sketch.rotate(sketch.PI);
        classifyVideo();
        CurrObject = new coverLabelObject();
    };

    
    // classifies Video 
    function classifyVideo() {
        classifier.classify(Site.coverVideo, gotResult);
    }

    // called when results are in
    function gotResult(err, results) {
        if(err){
            console.log(err);
        }else{
            classifyVideo();    

            Site.volumeAudio(results);
            CurrObject.updateCurrObject(results[0]);

            var results = CurrObject.pagesCutoffUpdater(COVERCONSTANTS.cover_label_repeats);

            if (results) coverClassificationResults = coverResultJSON;




            // Optional: Dev and Log display
            if(results) {
              // output results: 

              createResultHTML();
              // console.log(coverClassificationResults, results);

              // if(coverClassificationResults !== undefined){
              //   Site.domOutput(coverClassificationResults.label);
              // }
              
              Site.updateFields(coverClassificationResults);
                
            }else{
              if(Site.coverIdentified === undefined){
                Site.domOutput("Analyzing... Continue moving the green insert in front of the cover...");
                Site.coverIdentified = true;
              }
            }
        }
    }
};


/* 
 * Optional: creates Result Div
 */

function createResultHTML (){
    var resulthtml = document.getElementById("result");
    resulthtml.innerHTML = JSON.stringify(coverClassificationResults);
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

class coverLabelObject {

  constructor(){
    this.label;
    this.location;
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

coverLabelObject.prototype.pagesCutoffUpdater = function(repeats){

    let cutoff_test = this.cutoff(this.confidence, COVERCONSTANTS.page_cutoffs[this.label]);

    if(cutoff_test){

        this.last_conf_amounts.push(this.confidence);
        this.curr_amount += 1;

        if(this.curr_amount == repeats){

            let mean_acc = this.last_conf_amounts.reduce((a, b) => a + b, 0)/repeats;

            coverResultJSON.label = this.label;
            coverResultJSON.repeats = repeats;
            coverResultJSON.confidence = mean_acc;

            this.reset();
            return true;
        }
        
    }else{
        this.reset();
    }
};


/* 
 * Prototype reset
 *
 * resets the Label Object's parameters 
 */

coverLabelObject.prototype.reset = function(){

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

coverLabelObject.prototype.cutoff = function(curr_conf, cutoff_conf){
    if(curr_conf >= cutoff_conf){
        return true;
    }else{
        return false;
    }
};


/* 
 * coverResultJSON
 *
 * @param label - label that appeared "repeats" times 
 * @param repeats - how many repeats were we looking for?
 * @param confidence - mean confidence of "repeats"
 */

var coverResultJSON = { 
                   location: 'cover', 
                   label : null,
                   repeats : null,
                   confidence : null
                 };

