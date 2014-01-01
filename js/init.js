$(document).ready( function () {

    var email = {};
        email['head'] = 'events',
        email['body'] = 'mozillakerala',
        email['tail'] = 'org';

    var joined = email['head'] + '@' + email['body'] + '.' + email['tail'];

    $('.mozk-email-obfuscated').html('<a href="mailto: ' + joined + '" >' + joined + '</a>');


    $('textarea').autosize();

    //header links
    $('header nav a').click(function(){
      $(this).parent().siblings().find('.active').removeClass('active');
      $(this).addClass('active');
    });





    //functions for centering elements in isotope
    $.Isotope.prototype._getCenteredMasonryColumns = function() {
      this.width = this.element.width();
      
      var parentWidth = this.element.parent().width();
      
                    // i.e. options.masonry && options.masonry.columnWidth
      var colW = this.options.masonry && this.options.masonry.columnWidth ||
                    // or use the size of the first item
                    this.$filteredAtoms.outerWidth(true) ||
                    // if there's no items, use size of container
                    parentWidth;
      
      var cols = Math.floor( parentWidth / colW );
      cols = Math.max( cols, 1 );

      // i.e. this.masonry.cols = ....
      this.masonry.cols = cols;
      // i.e. this.masonry.columnWidth = ...
      this.masonry.columnWidth = colW;
    };
    
    $.Isotope.prototype._masonryReset = function() {
      // layout-specific props
      this.masonry = {};
      // FIXME shouldn't have to call this again
      this._getCenteredMasonryColumns();
      var i = this.masonry.cols;
      this.masonry.colYs = [];
      while (i--) {
        this.masonry.colYs.push( 0 );
      }
    };

    $.Isotope.prototype._masonryResizeChanged = function() {
      var prevColCount = this.masonry.cols;
      // get updated colCount
      this._getCenteredMasonryColumns();
      return ( this.masonry.cols !== prevColCount );
    };
    
    $.Isotope.prototype._masonryGetContainerSize = function() {
      var unusedCols = 0,
          i = this.masonry.cols;
      // count unused columns
      while ( --i ) {
        if ( this.masonry.colYs[i] !== 0 ) {
          break;
        }
        unusedCols++;
      }
      
      return {
            height : Math.max.apply( Math, this.masonry.colYs ),
            // fit container to columns that have been used;
            width : (this.masonry.cols - unusedCols) * this.masonry.columnWidth
          };
    };


    //script for isotope filtering
    $('#filter_content').isotope({ 

     });

    // cache filter_content
    var $filter_content = $('#filter_content');
    // initialize isotope
    $filter_content.isotope({
      animationOptions: {
         duration: 750,
         queue: false
       }
    });
    // filter items when filter link is clicked
    $('#filters a').click(function(){
      var selector = $(this).attr('data-filter');
      $filter_content.isotope({ filter: selector });
      return false;
    });


    //start slider depending of resolution
    var width_page = $(document).width();
   


    //scripts for resolutions smaller than 768px
    if( width_page < 768 ) {
      $('header nav ul').css('width', width_page);

    //make visible list of #filters on mobile resolution
      $('.filter_wrap').mouseover(function(){
        $('#filters').show();
        $('#filters li a').click(function(){
          $(this).parent().parent().hide();
          var text = $(this).html();
          $('.filter_wrap span').html(text);
          //add <b> element to .filter_wrap
          $('.filter_wrap > span').append('<b></b>');
        });
      });
      $('.filter_wrap').mouseout(function(){
        $('#filters').hide();
      });

      $('header nav').mouseover(function(){
        $(this).children().show();
        $('header nav li a').click(function(){
          $(this).parent().parent().hide();
        });
        
      });
      $('header nav').mouseout(function(){
        $(this).children().hide();
      });

      // $('header nav').mouseover(function(){
      //     $(this).children().show();
      //     $(this).children().css({
      //       'visibility': 'visible',
      //       'opacity': '1'
      //     });
      // });
      $('.slide .arrow_up').hide();

      $('.slider2 .slide a').click(function() {
       
          // $('.slider2_popups .active-popup').removeClass('active-popup');      
          $(this).removeClass('slvzr-hover');
          var current = $(this).attr('class'); 
          var current_small = $(this).parent();

          $('.slider2_popups .popup-item.'+current).appendTo(current_small);
          
          $('.popup-item.'+current).addClass('active-popup').parent().siblings().children().removeClass('active-popup');

          // alert(current);
          // return false;
      });     

      //height of subheader
      var sub_height = $(window).height() - 2* ($('header').height());
      $('.subheader').css('height', sub_height);

    }

    //scripts for resolutions larger than, or equal to 768px
    if( width_page >= 768 ) {
      $('.slider2 .slide a').click(function() {
        
          $(this).removeClass('slvzr-hover');
          var current = $(this).attr('class'); 
          // alert(current);
          var boxclass = "active-popup";
          var arrowclass = "active-arrow";
          $('.slide .arrow_up.'+current).addClass(arrowclass).parent().siblings().children().removeClass(arrowclass);

          $('.slider2_popups .popup-item.'+current).addClass(boxclass).siblings().removeClass(boxclass);
          return false;
      });  

      //height of subheader
      var sub_height = $(window).height() - 3* ($('header').height());
      $('.subheader').css('height', sub_height);

    }
    
    if( width_page > 540 && width_page <= 649 ) {
      $('.slider1').bxSlider({
        slideWidth: 200,
        minSlides: 2,
        maxSlides: 2,
        moveSlides: 1,
        slideMargin: 0
      });       
    }

    if( width_page >= 650 && width_page <= 959 ) {
      $('.slider1').bxSlider({
        slideWidth: 190,
        minSlides: 3,
        maxSlides: 3,
        moveSlides: 1,
        slideMargin: 0
      });       
      $('.slider2').bxSlider({
        slideWidth: 226,
        minSlides: 1,
        maxSlides: 2,
        moveSlides: 1,
        slideMargin: 60,
        infiniteLoop: false
      }); 
    }
    
    if( width_page >= 960 ) {
      $('.slider1').bxSlider({
        slideWidth: 190,
        minSlides: 4,
        maxSlides: 4,
        moveSlides: 1,
        slideMargin: 0
      }); 
      $('.slider2').bxSlider({
        slideWidth: 226,
        minSlides: 3,
        maxSlides: 3,
        slideMargin: 60,
        moveSlides: 1,
        infiniteLoop: false
      }); 
    }


    var top_ofset = $('header').height() - 1;


    $('header li a, .logo, .down, .subheader .btn, footer .container > a, .link_slide').click(function(){
      $('html, body').animate({
        scrollTop: $( $(this).attr('href') ).offset().top - top_ofset
      }, 1000);
    });



    $('.popup-item .close').click(function(){
        $('.active-popup').removeClass('active-popup');     
        $('.arrow_up').removeClass('active-arrow');     
    });

    //adding class to list item (make active)
    if( width_page >= 768 ) {
      $('#filters li a').click(function(){
        $(this).parent().siblings().removeClass('active');
        $(this).parent().addClass('active');
      });

      var popup_width = $('#team .bx-wrapper').width();
      var popup_left_margin = - ($('#team .bx-wrapper').width() / 2);
      $('.popup-item')
      .css({
        'width': popup_width, 
        'margin-left': popup_left_margin 
      });
    }


    //calculate width of lightbox
    var width_of_lightbox = $('.container').width();
    $('.lb-outerContainer, .lb-dataContainer').css('width', width_of_lightbox);



    //scroll to the top icon
    $(window).scroll(function(){
        if ($(this).scrollTop() > 100) {
            $('#to_the_top').fadeIn();
        } else {
            $('#to_the_top').fadeOut();
        }
    });
    $('#to_the_top').click(function(){
        $("html, body").animate({ scrollTop: 0 }, 600);
        $(this).fadeOut(500);
        return false;
    });

    //validate contact form
    $("form.contact-form").validate({
        rules: {
          name: {
            required: true,
            minlength: 2
          },
          message: {
            required: true,
            minlength: 2
          },
          comments: {
            required: true,
            minlength: 2
          },
          email: {
            required: true,
            email: true
          },
          phone: {
            required: false,
            number: true
          }
        },
        messages: {
          name: {
            required: "This field is required",
            minlength: jQuery.format("At least {0} characters required")
          },
          comments: {
            required: "This field is required",
            minlength: jQuery.format("At least {0} characters required")
          },
          email: {
            required: "This field is required",
            email: "Wrong e-mail address"
          }            
        },
        errorClass: "error"
      });

});      






//PLACEHOLDER
    $('[placeholder]').focus(function() {
      var input = $(this);
      if (input.val() == input.attr('placeholder')) {
        input.val('');
        input.removeClass('placeholder');
      }
    }).blur(function() {
      var input = $(this);
      if (input.val() == '' || input.val() == input.attr('placeholder')) {
        input.addClass('placeholder');
        input.val(input.attr('placeholder'));
      }
    }).blur().parents('form').submit(function() {
      $(this).find('[placeholder]').each(function() {
        var input = $(this);
        if (input.val() == input.attr('placeholder')) {
          input.val('');
        }
      })
    });


// map

var styles = [ ]

  var styledMap = new google.maps.StyledMapType(styles,
    {name: "Styled Map"})

  var mapOptions = {
    zoom: 15,
    center: new google.maps.LatLng(9.967519,76.281957), 
    scrollwheel: false,

    // disable mapType-top_right corner
    mapTypeControl: false,
    disableDefaultUI: false,
    draggable: true,
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map']
    }
  };
    var map = new google.maps.Map(document.getElementById('map'),
    mapOptions);

    var marker1 = new google.maps.Marker({
        position: new google.maps.LatLng(9.967519,76.281957),
        map: map,
        icon: 'images/marker.png' // This path is the custom pin to be shown. Remove this line and the proceeding comma to use default pin
    });



map.mapTypes.set('map', styledMap);
map.setMapTypeId('map');