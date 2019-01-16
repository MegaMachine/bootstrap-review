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