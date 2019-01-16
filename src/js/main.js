$(document).ready(function(){
  tabPaneSameHeight();
  $(window).resize(function(){
    tabPaneSameHeight();
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
