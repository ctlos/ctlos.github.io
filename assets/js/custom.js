document.addEventListener('DOMContentLoaded', () => {

  $('.slider-reviews').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    lazyLoad: 'progressive',
    autoplay: true,
    autoplaySpeed: 6000,
    speed: 1800,
    dots: true,
    responsive: [
      {
        breakpoint: 1399,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });

});
