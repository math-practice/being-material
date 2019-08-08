$( document ).ready(function() {
    /*  =========================================================================
        Navigation: Layout in scroll
        ==========================================================================   */

        function changeNav(){
            var scrollPosY = window.pageYOffset | document.body.scrollTop;
            if(scrollPosY > 20) {
                document.getElementsByTagName("body")[0].className = ('scroll');  
                document.getElementsByClassName('header').addClass =('d-relative');
            } else if(scrollPosY <= 20) {
                document.getElementsByTagName("body")[0].className =  ('no-scroll');
                document.getElementsByClassName('header').addClass =('d-fixed');
            }
        }
    
        changeNav();
    
        $(document).scroll(function(){
            changeNav();
        });

    /*  =========================================================================
        Navigation: Set a fixed position for the header in a relative position of the container
        ==========================================================================   */
        function checkHeaderLocation(){
            if ($(window).width() >= 900) {
                var headerMargin = ($(window).width() - 900)/2;  
                $('.header').css('left', 'auto');
                // $('#btn-camera').css('right', headerMargin + 'px');
                if ($(body).hasClass('scroll')){
                    $('.header').css('left', headerMargin + 'px');
                }
            } else if ($(window).width() < 900) {
                // $('#btn-camera').css('right', '.5rem');
            }
        }
        checkHeaderLocation();
        setInterval(checkHeaderLocation, 50);

        });


    /*  =========================================================================
        Toggle camera div
        ==========================================================================   */
        $( "#btn-camera" ).click(function(){	
            $('body').addClass('slide');
        });
        $( "#btn-close" ).click(function(){	
            $('body').removeClass('slide');
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

        
