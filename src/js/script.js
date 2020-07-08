
$(function() {
  var ww = $(window).width();
  var wh = $(window).height();
  
  function init(){
    
  // #region Global
    function goTo(target, offsetTop){
      offsetTop = offsetTop || 0;
      var navbarHeight = $('.navbar').outerHeight();
      //if(ww>576) navbarHeight = 70;
      $('html, body').stop().animate({
        'scrollTop': $(target).offset().top - navbarHeight + offsetTop
      },500);
    }

    $('.scrollto').click(function(e){
      e.preventDefault()
      var offsetTop = 0;
      var attr = $(this).attr('data-offset');
      if (typeof attr !== typeof undefined && attr !== false) {
        offsetTop = Number(attr);
      }
      goTo($(this).attr('href'), offsetTop)
    })

    $(window).on('resize', function(){
      ww = $(window).width();
      wh = $(window).height();

      $('.full-height').height(wh);
    }).trigger('resize')
  // #endregion

  // #region Navbar
    $(document).bind("ready scroll", function () {
      if($(document).scrollTop() >= 10){
        $(".navbar").addClass("scrolled")
      } else {
        $(".navbar").removeClass("scrolled")
      }
    })
    $('body').scrollspy({ 
      target: '#navigation',
      offset: $('.navbar').outerHeight() + 10
    })
    $('#navigation .scrollto').click(function(){
      if(ww<768){
        $('#navigation').collapse('hide')
      }
    })
  // #endregion

  // #region Page
    $('[data-toggle="video"]').click(function(e){
      e.preventDefault()
      $('#modalVideo').find('.video-placehere').attr('src', $(this).data('video'))
      $('#modalVideo').modal('show')
    })
    $('#modalVideo').on('hide.bs.modal', function (event) {
      $('#modalVideo').find('.video-placehere').attr('src', '')
    })

  // #endregion

  
    $('.collapse').on('hidden.bs.collapse', function () {
      AOS.refresh()
    })
    $('.collapse').on('shown.bs.collapse', function () {
      AOS.refresh()
    })
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
      AOS.refresh()
    })
    AOS.init({offset:0,duration:700,delay:100});
  }

  init();
  
})
