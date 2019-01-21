$(document).ready(function(){
  tabPaneSameHeight();
  affixButton();
  homeTopPadding();
  $(window).resize(function(){
    tabPaneSameHeight();
    affixButton();
    homeTopPadding();
  })
  $(window).scroll(function(){
    affixButton();
  })
  $('.hamburger--emphatic').click(function(){
    $(this).toggleClass('is-active');
  });
  
  var logo;
  $('.logo img').hover(function(){
    logo =  $(this).attr('src');
    $(this).attr('src','img/nike-green.svg');
  }, function(){
    $(this).attr('src',logo);
  });
  
  $('#home-carousel').carousel({
    interval:5000
  })

  $('.home').hover(function(){
    $('#home-carousel').carousel('pause')
  },function(){
    $('#home-carousel').carousel({
      pause:false
    });
  })
  
  $('.input-wrap input').focusin(function(){
    $(this).parents('.label-container').addClass('active');
  });
  $('.input-wrap input').blur(function(){
    $(this).parents('.label-container').removeClass('active');
  })
  $('[data-toggle="tooltip"]').tooltip();
  $('.contacts form button').click(function(event){
    event.preventDefault();
    checkForm();
  })
  $('.alert .close').click(function(){
    $(this).parent().hide('fade');
  })
})
$(window).load(function(){
  var winHeight = $(document).height();
  var step = 4;
  var timeToScroll = winHeight/step;

  $('.header nav .navbar-nav a').on('click', function(){
    var linkAnchor = $(this).attr('href');
    var sectionTop = $(linkAnchor).offset().top;
    var headerHeight = $('.header').outerHeight();
    $('html, body').animate({
        scrollTop: sectionTop - headerHeight
    }, timeToScroll);
  });
})
function tabPaneSameHeight(){
  var items = $('.about-us .tab-pane');
  var maxHeight = 0;
  var itemsContainer = $('.about-us .tab-content')
  items.addClass('active');
  items.each(function(){
    if($(this).height() >= maxHeight){
      maxHeight = $(this).outerHeight(true);
    }
    $(this).removeClass('active');
  });
  itemsContainer.css('height', maxHeight + 'px');
  $(items[0]).addClass('active');
}

function affixButton(){
  var item = $('.nike-website');
  var headerHeight = $('.header').outerHeight();
  var itemOffsetTop = item.offset().top;
  // var section = $('.managers').offset().top
  item.data('offset-top',(itemOffsetTop - headerHeight));
  if(item.hasClass('affix')){
    item.css('top',headerHeight);
  } else {
    item.removeAttr('style');
  }
}

function homeTopPadding(){
  var headerHeight = $('.header').outerHeight();
  $('.home').css('paddingTop', headerHeight + 'px'); 
}

function checkForm(){
  var firstName = $('#form-first-name').val();
  var lastName = $('#form-last-name').val();
  var email = $('#form-email').val();
  var gender = $('input[name="gender"]:checked').val();
  if(firstName && lastName && email && gender){
    $('#wrapper').prepend('<div class="alert alert-success" role="alert">Your e-mail was send <a href="#" class="close"data-dismiss="alert">x</a></div>');
  }else{
    $('#wrapper').prepend('<div class="alert alert-danger" role="alert">Your e-mail write not corectly <a href="#" class="close" data-dismiss="alert">x</a></div>');
  }
}


      
      