$(document).ready(function () {
  var navOffset = $(".content-nav").offset().top;

  $(window).scroll(function () {
    var scrollPos = $(window).scrollTop();

    if (scrollPos >= navOffset) {
      $(".content-nav").addClass("sticky");
    } else {
      $(".content-nav").removeClass("sticky");
    }
  });
});
