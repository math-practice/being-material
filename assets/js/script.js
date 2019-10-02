    /*  =========================================================================
        Image + quote bubbles on Homepage
        ==========================================================================   */

Site.BubbleUnits = {
  images: Site.allImages, 
  quotes: [
    `“we need to understand how processes that may seem immaterial in character function within, and even rearrange, the material conditions of pro­duction, distribution, communication, and circulation” <br>—Boucher, Helmreich, Kinney, Tibbits, Uchill, and Ziporyn`,
    `“the digital world has become more and more entan­gled with the physical realm rather than less and less” – Tibbits`,
    `“Every programming language is a distinct material.” – Fry and Raes`,
    `“how do we harness the precision of machines without losing the creativity of individuals?” – Peek`,
    `“matter is not simply natural; it is not just given but also revealed and assembled by working on the world.” – Bratton`,
    `“Together we are exploring the flaws and inaccuracies of algorithms, and what may happen if artificial intelligence gets it wrong” – Agapakis and McRae`,
    `“rethink what tools and people belong in gendered spaces” – Agapakis and McRae`,
    `“The media give us a disembodied experience of looking at events through a screen. It removes us from brutality by censoring and prefabricating the reports that we are supposed to interpret as reality.” – Finamore, quoting Chalayan`,
    `“I seek to make social alienation visible by exploring relations between bodies and architecture /space and in relation to nomadism and migration.” – Akšamija`,
    `“How do computers see? What values are necessary for a computer to recognize a face? Do computers see all faces alike and ascribe the same values to what they see?” – Hyphen-Labs`,
    `“A crucial element of the development of science and technology is for it to be transparent and accessible to the fringes of culture—to everybody." – McRae`,
    `“all media must be understood in terms of the supports that permit them to operate and circulate, all the way down to the elemental composition of satellite dishes, electric grids, and physical data centers that house ‘the cloud’” – Uchill and Helmreich`,
    `“Sometimes, despite how much money a corporation has or how many politicians have accepted favors or hearty friendships with lobbyists, the project should not go ahead, in the interests of the public.” – LaDuke`,
    `“When we began planning the ‘Being Material’ symposium, none of us could anticipate its unfolding in the dramatic context of an urgent, nationwide call to support art, science and the humanities.” – Kinney, preface, but this was really all of us, in the symposium program`,
    `“In the texts and artifacts gathered here, we offer an account of how the digital and the material are together brokering new scientific, physical, social, and political forms.” – Boucher, Helmreich, Kinney, Tibbits, Uchill, and Ziporyn`,
    `“The masses of carbon-dense exoskeletons and endoskeletons accumulating under pressure over geological time furnish the fuels we can’t seem to stop burning.” – Pentecost`,
    `“money itself—what we think of as money—is generally one part of a collection of infrastructures for the transfer of value.” – Maurer`,
    `“most images are made by machines for other machines” – Paglen`,
    `“If the infrastructural involves the process of organizing and operating a sociotechnical system that is distributed across territory and sustained over time as well as ways of thinking about that system, then the animal is inherently part of this process.” – Parks`,
    `“if material things often bear traces of their conditions of production and circulation that are invisible to the unaided eye (as carbon footprints, as toxic waste, as chemical residue) how might this demand new ways of seeing the environments around us, and of reckoning with our responsibilities for them?” – Helmreich and Uchill`,
    `“To confront a life in commodified, objectified, and stereotyped form is simultaneously to expose the cruelty and absurdity of the sociological processes that would allow for such a human-to-thing transformation, and to resacralize that human life by way of the disconnection that such a revelation lays bare between one’s lived experience and one’s effigy. It is to be a narrator.” – Alexandre`,
    `“Formaldehyde protects home construction materials from insect, bacteria, and fungal decay while also hastening the decay of human inhabitants.” – Shapiro`,
    `“‘eyes,’ in the age of new kinds of optical and photographic mediation, fresh sorts of computational imagining, and novel projects in physical cloaking, are ever-changing material things and networks” – Barbastathis`,
    `“It can be argued that every person living today who engages with music is also engaged with teasing out what is material from what is not.” – Ziporyn`
  ]
}

Site.isBubbling = false;

Site.Bubbling = function(){
  if(document.querySelector("#bubbles") === undefined){return;}

  Site.isBubbling = true;

  var maxElements = (window.innerWidth < 768) ? 10 : 13;
  var duration = 5000;
  var toAnimate = [];
  var radius = window.innerWidth < window.innerHeight ? window.innerWidth : window.innerHeight;
  var distance = radius / 4 <= 300 ? 300 : radius / 4; 
  var imgBaseUrl = Site.imgBaseUrl;

  //`${Site.imgBaseUrl}${Site.allImages[imageIndex].page}.jpg`

  var createElements = (function() {
    var fragment = document.createDocumentFragment();
    
    var randomImage = anime.random(0, Site.allImages.length - 1);

    for (var i = 0; i < maxElements; i++) {

      // if(Math.random() > 0.5){
        var el = document.createElement('div');
        el.classList.add('particule');
        el.style.borderRadius = 0;
        var thisImageIndex = (randomImage + i < Site.allImages.length - 1) ? (randomImage + i) : randomImage + i - Site.allImages.length + 1;
        var elContents = `<img src="${imgBaseUrl + Site.allImages[thisImageIndex].page + ".jpg"}">
        <span>p. ${Site.allImages[thisImageIndex].page}</span>`

        el.insertAdjacentHTML('afterbegin', elContents);
        
      // }else{
        // var el = document.createElement('div');
        // el.classList.add('particule');
        // el.insertAdjacentHTML('afterbegin', Site.BubbleUnits.quotes[anime.random(0, Site.BubbleUnits.quotes.length - 1)]);
      // }

      toAnimate.push(el);
      fragment.appendChild(el);

      
    }
    if(document.querySelector("#bubbles") !== null && document.querySelector("#bubbles") !== undefined){
        document.querySelector("#bubbles").appendChild(fragment);
    }
  });

  createElements();

  var animate = function(el, i) {

    var iSpeed = (window.innerWidth > 768) ? 2 : 5;

    var angle = Math.random() * Math.PI * 2;
    anime({
      targets: el,
      translateX: [0, Math.cos(angle) * distance],
      translateY: [0, Math.sin(angle) * distance],
      scale: [
        {value: [0, 1], duration: 2000, easing: 'easeOutExpo'},
        {value: 0, duration: 4000, delay: duration - 4000, easing: 'easeInExpo'}
      ],
      offset: (duration / maxElements) * (i*iSpeed),
      duration: duration,
      easing: 'easeOutSine',
      loop: true
    });
  }

  toAnimate.forEach(animate);
}


Site.pauseBubbling = function(noBubbles){
    var bubbleContainer = document.querySelector("#bubbles");
    if(bubbleContainer === undefined || bubbleContainer === null){return;}

    if(noBubbles === true){
      
      bubbleContainer.classList.add("inactive");
      setTimeout(function(){
        bubbleContainer.innerHTML = ""; // remove bubbles
      }, 1000)

      Site.isBubbling = false;

    }else{
      bubbleContainer.classList.remove("inactive");
      Site.Bubbling();
    }

}

$( document ).ready(function() {

      Site.Bubbling(); // start bubbles

    /*  =========================================================================
        Navigation: Layout in scroll
        ==========================================================================   */

        function changeNav(){
            var scrollPosY = window.pageYOffset | document.body.scrollTop;
            if(scrollPosY > 20) {
                document.getElementsByTagName("body")[0].className = ('scroll');  
                document.getElementsByClassName('header').addClass =('d-relative');
                document.getElementById("camera_banner").classList.remove("active");
                Site.playAudio(true);
                if(Site.isBubbling === true){
                  Site.pauseBubbling(true); // hide bubbles
                }
                
            } else if(scrollPosY <= 20) {
                document.getElementsByTagName("body")[0].className =  ('no-scroll');
                document.getElementsByClassName('header').addClass =('d-fixed');
                if(Site.isBubbling === false){
                  Site.pauseBubbling(false); // hide bubbles
                }
            }
        }
    
        changeNav();
    
        $(document).scroll(function(){
            changeNav();
        });


    /*  =========================================================================
        Toggle camera div
        ==========================================================================   */
        $( "#btn-camera" ).click(function(){
            $('body').addClass("show_full_camera");
            Site.pauseBubbling(true);
        })

        $( "#book-btn" ).click(function(){	
            // $('body').addClass('slide');
            if($('body').hasClass("show_full_camera")){
              $('body').removeClass("show_full_camera"); // disable cover camera
              
                Site.playAudio(true);
              
              if(Site.render !== undefined){
                cancelAnimationFrame(Site.render);
              }
            }

            // instantiate slide camera
            $('body').addClass('show_camera');

        });

        $( "#btn-close" ).click(function(){	
            // $('body').removeClass('slide');
            $('body').removeClass('show_camera');
            $("#camera_banner").removeClass('active'); // added 
            if(Site.disableCamera !== undefined && Site.disableCamera !== null){
                Site.disableCamera() // added for video viewport
            }

            Site.pauseBubbling(false);
        });


        if ($(window).width() <= 1025) {
      
         } else if($(window).width() > 1024) {

            // $( "#btn-camera" ).click(function(){	
            //     $('body').addClass('slide');
            // });
            // $( "#btn-close" ).click(function(){	
            //     $('body').removeClass('slide');
            // });

         }



    /*  =========================================================================
        WIP: Navigation: ScrollMa
        ==========================================================================   */

        // var container = document.querySelector('.scroll');
        // var text = container.querySelector('.scroll__text');
        // var steps = text.querySelectorAll('.step');

        // // initialize the scrollama
        // var scroller = scrollama();

        // // scrollama event handlers
        // function handleStepEnter(response) {
        //     // response = { element, direction, index }
        //     console.log(response.index, '-------- enter');
        //     // add to color to current step
        //     response.element.classList.add('is-active');
        // }

        // function handleStepExit(response) {
        //     // response = { element, direction, index }
        //     console.log(response.index, '-------- exit');
        //     // remove color from current step
        //     response.element.classList.remove('is-active');
        // }

        // function handleStepProgress(response) {
        //     // response = { element, progress, index }
        //     console.log(response.index, '-------- progress -', response.progress);
        // }

        // function init() {
        //     // set random padding for different step heights (not required)
        //     steps.forEach(function (step) {
        //         // var v = 100 + Math.floor(Math.random() * window.innerHeight / 4);
        //         // step.style.padding = v + 'px 0px';
        //         // step.style.height = '300px';
        //     });

        //     // 1. setup the scroller with the bare-bones options
        //     // this will also initialize trigger observations
        //     // 3. bind scrollama event handlers (this can be chained like below)
        //     scroller.setup({
        //         step: '.scroll__text .step',
        //         debug: true,
        //         offset: 0.2,
        //         // progress: true,
        //     })
        //         .onStepEnter(handleStepEnter)
        //         .onStepExit(handleStepExit)
        //         // .onStepProgress(handleStepProgress)

        //     // setup resize event
        //     window.addEventListener('resize', scroller.resize);
        // }

        // // kick things off
        // init();



    /*  =========================================================================
        WIP: Camera: make #view div draggable on desktop
        ==========================================================================   */
        // if ($(window).width() <= 1025) {
        //         // Make the DIV element draggable:
        //         dragElement(document.getElementById("view"));

        //         function dragElement(elmnt) {
        //         var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        //         if (document.getElementById(elmnt.id + "header")) {
        //             // if present, the header is where you move the DIV from:
        //             document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
        //         } else {
        //             // otherwise, move the DIV from anywhere inside the DIV: 
        //             elmnt.onmousedown = dragMouseDown;
        //         }

        //         function dragMouseDown(e) {
        //             e = e || window.event;
        //             e.preventDefault();
        //             // get the mouse cursor position at startup:
        //             pos3 = e.clientX;
        //             pos4 = e.clientY;
        //             document.onmouseup = closeDragElement;
        //             // call a function whenever the cursor moves:
        //             document.onmousemove = elementDrag;
        //         }

        //         function elementDrag(e) {
        //             e = e || window.event;
        //             e.preventDefault();
        //             // calculate the new cursor position:
        //             pos1 = pos3 - e.clientX;
        //             pos2 = pos4 - e.clientY;
        //             pos3 = e.clientX;
        //             pos4 = e.clientY;
        //             // set the element's new position:
        //             elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        //             elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        //         }

        //         function closeDragElement() {
        //             // stop moving when mouse button is released:
        //             document.onmouseup = null;
        //             document.onmousemove = null;
        //         }
        //         }
        // }

    /*  =========================================================================
        TBD: Display images
        ==========================================================================   */
        // function getRandomImg(max) {
        //     random = Math.floor(Math.random() * Math.floor(max));

        //     var set = ['img1', 'img2', 'img3', 'img4'];
        //     var imageNum;

        //     // choose the image name
        //     var randomSet = set[Math.floor(Math.random() * set.length)];

        //     // choose the res
        //     if(random <= 3) { imageNum = 3}
        //     if(random > 3 && random <= 6 ) { imageNum = 2}
        //     if(random > 6 && random <= 9 ) { imageNum = 1}


        //     // adjust the html
        //     $('#gallery').css('background-image', 'url(' +randomPixel+'/'+randomSet+'-'+imageNum+'.jpg'+')')
        // }

        
    });