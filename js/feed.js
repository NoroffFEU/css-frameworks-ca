// The navbar obtains a fixed position to scroll with the page.

$(document).ready(function () {
  var navOffset = $(".content-nav").offset().top;
  var footerOffset = $("footer").offset().top + 260;
  var navbarHeight = $(".content-nav").outerHeight();

  $(window).scroll(function () {
    var scrollPos = $(window).scrollTop();
    var windowSize = $(window).height();

    if (scrollPos >= navOffset) {
      if (scrollPos + windowSize >= footerOffset) {
        var gap = scrollPos + windowSize - footerOffset;
        $(".content-nav")
          .css("top", -gap + "px")
          .addClass("sticky");
      } else {
        $(".content-nav").css("top", "0").addClass("sticky");
      }
    } else {
      $(".content-nav").removeClass("sticky").css("top", "0");
    }
  });
  test;
});
