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


/* IMAGE INFO */
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



/* GENERAL FUNCTIONS */
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
  
  if(cameraHomeButton !== undefined && cameraHomeButton !== null){
    cameraHomeButton.addEventListener("click", () => {
      Site.startHomeVideo();
      Site.playAudio(false);
    });
  }
  
  if(cameraButton !== undefined && cameraButton !== null){
    cameraButton.addEventListener("click", Site.startVideo);
  }
}
