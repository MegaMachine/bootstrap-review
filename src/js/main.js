$('.hamburger--emphatic').click(function(){
  $(this).toggleClass('is-active');
});

var logo;
$('.logo img').hover(function(){
  logo =  $(this).attr('src');
  $(this).attr('src','img/nike-red.svg');
}, function(){
  $(this).attr('src',logo);
});

$('#home-carousel').carousel({
  interval:3000
})
$('.home').hover(function(){
  $('#home-carousel').carousel('pause')
},function(){
  $('#home-carousel').carousel({
    pause:false
  });
})