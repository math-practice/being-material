
/*  =========================================================================
     Navigation: Layout in scroll
    ==========================================================================   */
    var didScroll;
    var lastScrollTop = 0;
    var delta = 20;

    $(window).scroll(function(event){
        didScroll = true;
    });

    setInterval(function() {
        if (didScroll) {
            changeNav();
            didScroll = false;
        }
    }, 250);

    function changeNav(){
        var st = $(this).scrollTop();
        var navbarHeight = $('header').outerHeight();
        var scrollPosY = window.pageYOffset | document.body.scrollTop;
            if(scrollPosY > 20) {
                
                        if(Math.abs(lastScrollTop - st) <= delta)
                        return;
                    
                            // If scrolled down and past the navbar, add class .nav-up.
                            if (st > lastScrollTop && st > navbarHeight){
                                // Scroll Down
                                document.getElementsByTagName("body")[0].className =  ('scroll');
                    
                            } else {
                                // Scroll Up
                                if(st + $(window).height() < $(document).height()) {
                                    document.getElementsByTagName("body")[0].className = ('scroll-top');       
                    
                                }  
                            }
                        
                            lastScrollTop = st;
                    }
            else if(scrollPosY <= 20) {
                document.getElementsByTagName("body")[0].className =  ('no-scroll');
        }
    }

