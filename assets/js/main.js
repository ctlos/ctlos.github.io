// scrolljump
$(function() {
  $(window).scroll(function() {
    if($(this).scrollTop() != 0) {
      $('#scrollup').fadeIn();
    } else {
      $('#scrollup').fadeOut();
    }
  });
  $('#scrollup').click(function() {
    $('body,html').animate({scrollTop:0},300);
  });
});

// // disqus_loaded scroll
// window.onscroll = function(e) {
//   if ((window.innerHeight + window.scrollY)
//     >= document.body.offsetHeight)
//   {
//     if (!disqus_loaded) disqus();
//   }
// };

// disqus_loaded click
// window.onscroll = function(e) {
//   if ((window.innerHeight + window.scrollY)
//     >= document.body.offsetHeight)
//   {
//     if (disqus_loaded==false){ load_disqus() };
//   }
// };

// slimscroll
// $('#scroll').slimScroll({
//   height: '100%',
//   alwaysVisible: true
// });


// magnific popup
// $('.video-link').magnificPopup({
//   type: 'iframe'
// });
