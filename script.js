// PAGE SWITCHING LOGIC
function switchPage(pageId) {
  // Remove active class from all sections
  $("section").removeClass("active-page");

  // Add active class to specific section after a tiny delay for effect
  setTimeout(() => {
    $("#" + pageId).addClass("active-page");
  }, 100);

  // Update Navigation
  $("nav a").removeClass("active");
  $("#nav-" + pageId).addClass("active");

  // Reset scroll to top
  window.scrollTo(0, 0);
}

// DOCUMENT READY
$(document).ready(function () {
  // 1. CURSOR LOGIC
  const $cursor = $(".cursor");
  const $follower = $(".cursor-follower");
  let posX = 0,
    posY = 0,
    mouseX = 0,
    mouseY = 0;

  $(document).on("mousemove", function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    $cursor.css({ left: mouseX, top: mouseY });
  });

  // Smooth follow effect
  setInterval(function () {
    posX += (mouseX - posX) / 9;
    posY += (mouseY - posY) / 9;
    $follower.css({ left: posX, top: posY });
  }, 15);

  // 2. MAGNETIC BUTTON LOGIC
  $(".magnetic")
    .on("mouseenter", function () {
      $follower.addClass("cursor-hover");
      $cursor.css("opacity", "0");
    })
    .on("mouseleave", function () {
      $follower.removeClass("cursor-hover");
      $cursor.css("opacity", "1");
      $(this).css("transform", "translate(0px, 0px)");
    });

  $(".magnetic").on("mousemove", function (e) {
    const pos = $(this).offset();
    const elemWidth = $(this).outerWidth();
    const elemHeight = $(this).outerHeight();
    const x = (e.pageX - pos.left - elemWidth / 2) * 0.3;
    const y = (e.pageY - pos.top - elemHeight / 2) * 0.3;
    $(this).css("transform", `translate(${x}px, ${y}px)`);
  });
});
