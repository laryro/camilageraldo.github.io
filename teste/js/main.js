$(document).ready(function () {


  var navul = document.getElementsByClassName('navul');
  var navul2 = document.getElementsByClassName('navul2');
  var navTitleDiv = document.getElementsByClassName('nav-title-div');
  var navli = document.getElementsByClassName('navli');

  // window.addEventListener('resize', function(){
  //   var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
  //   if(width >= 600) {
  //     console.log('test');
  //     navul2[0].classList.add('navul2-hide');
  //   }
  // }, true);

  // navTitleDiv[0].onclick = function toggle_small() {
  //   var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
  //   if(width < 600) {
  //     navul[0].classList.toggle('navul-hide');
  //   }
  // }

  // navli[1].onclick = function toggle_sub_small() {
  //   var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
  //   if(width < 600) {
  //     navul2[0].classList.toggle('navul2-hide');
  //   }
  // }

  // navul2[0].onmouseover = function highlight_item() {
  //   var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
  //   if(width >= 600) {
  //     navli[1].style.background = "";
  //   }
  // }

  // navul2[0].onmouseout = function unhighlight_item() {
  //   var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
  //   if(width >= 600) {
  //     navli[1].style.background = "#29353B";
  //   }
  // }

  // navli[1].onmouseover = function highlight_item() {
  //   navli[1].style.background = "#555353";
  // }

  // navli[1].onmouseout = function unhighlight_item() {
  //   navli[1].style.background = "#29353B";
  // }

  $ ( ' img [usemap] ' ). rwdImageMaps ();

  // Catch all clicks on a link with the class 'link'
  $('.link').click(function(e) {
    // Stop the link being followed:
    e.preventDefault();
    // Get the div to be shown:
    var content = $(this).attr('rel');
    // Remove any active classes:
    $('.active').removeClass('active');
    // Add the 'active' class to this link:
    $(this).addClass('active');
    // Hide all the content:
    $('.contenthiden').hide();
    // Show the requested content:
    $('#' + content).show();
  });

  $('.btn-slider').click(function (event) {
    $('.btn-slider').removeClass('active-map');
    $(this).addClass('active-map');
  })
  $('.btn-slider').first().click();




  // var s = skrollr.init({
  //   smoothScrolling: false,
  //   forceHeight: false,
  //   mobileDeceleration: 0.004
  // });

});


  var _hidediv = null;
  function showdiv(id) {
    if(_hidediv)
    _hidediv();
    var div = document.getElementById(id);
    div.style.display = 'block';
    _hidediv = function () { div.style.display = 'none'; };
  }