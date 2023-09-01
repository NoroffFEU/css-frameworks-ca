// Adds a "sticky" effect to the content navbar as the user scrolls down the page

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
