/**
 * Script Principal do Portfólio
 * Funcionalidades: Navegação, scroll, animações, contadores
 */
(function ($) {
  "use strict";
  
  var nav = $('nav');
  var navHeight = nav.outerHeight();
  
  // Navbar toggler - garantir que navbar tenha classe reduce quando aberta
  $('.navbar-toggler').on('click', function() {
    if (!$('#mainNav').hasClass('navbar-reduce')) {
      $('#mainNav').addClass('navbar-reduce');
    }
  });

  // Preloader
  $(window).on('load', function () {
    if ($('#preloader').length) {
      $('#preloader').delay(100).fadeOut('slow', function () {
        $(this).remove();
      });
    }
  });

  // Back to top button
  $(window).on('scroll', function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  
  $('.back-to-top').on('click', function(e){
    e.preventDefault();
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // ScrollTop alternativo
  $('.scrolltop-mf').on("click", function (e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: 0
    }, 1000);
  });

  // Contador animado
  if (typeof $.fn.counterUp !== 'undefined') {
    $('.counter').counterUp({
      delay: 15,
      time: 2000
    });
  }

  // Smooth scroll para links de navegação
  $('a.js-scroll[href*="#"]:not([href="#"])').on("click", function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - navHeight + 5)
        }, 800, "swing");
        return false;
      }
    }
  });

  // Fechar menu mobile quando link é clicado
  $('.js-scroll').on("click", function () {
    if ($(window).width() < 992) {
      $('.navbar-collapse').collapse('hide');
    }
  });

  // Scrollspy para destacar item ativo no menu
  if (typeof $.fn.scrollspy !== 'undefined') {
    $('body').scrollspy({
      target: '#mainNav',
      offset: navHeight
    });
  }

  // Navbar reduzida ao fazer scroll
  $(window).on('scroll', function () {
    var pixels = 50; 
    var top = 1200;
    var scrollTop = $(window).scrollTop();
    
    if (scrollTop > pixels) {
      $('.navbar-expand-md').addClass('navbar-reduce');
      $('.navbar-expand-md').removeClass('navbar-trans');
    } else {
      $('.navbar-expand-md').addClass('navbar-trans');
      $('.navbar-expand-md').removeClass('navbar-reduce');
    }
    
    if (scrollTop > top) {
      $('.scrolltop-mf').fadeIn(1000, "easeInOutExpo");
    } else {
      $('.scrolltop-mf').fadeOut(1000, "easeInOutExpo");
    }
  });

  // Trigger inicial do scroll
  $(window).trigger('scroll');


  // Testimonials carousel (se existir)
  if ($('#testimonial-mf').length && typeof $.fn.owlCarousel !== 'undefined') {
    $('#testimonial-mf').owlCarousel({
      margin: 20,
      autoplay: true,
      autoplayTimeout: 4000,
      autoplayHoverPause: true,
      loop: true,
      nav: false,
      dots: true,
      responsive: {
        0: {
          items: 1
        },
        768: {
          items: 1
        }
      }
    });
  }

  // Skills carousel
  if ($('#skills-carousel').length && typeof $.fn.owlCarousel !== 'undefined') {
    try {
      var skillsCarousel = $('#skills-carousel');
      skillsCarousel.owlCarousel({
        margin: 20,
        autoplay: true,
        autoplayTimeout: 4000,
        autoplayHoverPause: true,
        loop: true,
        nav: true,
        dots: true,
        navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
        mouseDrag: true,
        touchDrag: true,
        pullDrag: false,
        freeDrag: false,
        responsive: {
          0: {
            items: 2,
            margin: 15
          },
          576: {
            items: 3,
            margin: 15
          },
          768: {
            items: 4,
            margin: 20
          },
          992: {
            items: 5,
            margin: 20
          },
          1200: {
            items: 6,
            margin: 25
          }
        },
        onInitialized: function() {
          skillsCarousel.css('opacity', '1');
        }
      });
    } catch (e) {
      console.error('Erro ao inicializar carrossel de habilidades:', e);
      $('#skills-carousel').css('opacity', '1');
    }
  }

  // Videos carousel
  if ($('#videos-carousel').length && typeof $.fn.owlCarousel !== 'undefined') {
    try {
      var videosCarousel = $('#videos-carousel');
      videosCarousel.owlCarousel({
        margin: 30,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        loop: true,
        nav: true,
        dots: true,
        navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
        mouseDrag: true,
        touchDrag: true,
        pullDrag: false,
        freeDrag: false,
        responsive: {
          0: {
            items: 1,
            margin: 15
          },
          768: {
            items: 2,
            margin: 20
          },
          992: {
            items: 3,
            margin: 30
          }
        },
        onInitialized: function() {
          videosCarousel.css('opacity', '1');
          // Garantir que não há scrollbars
          videosCarousel.find('.owl-stage-outer').css({
            'overflow': 'hidden',
            '-ms-overflow-style': 'none',
            'scrollbar-width': 'none'
          });
        }
      });
      
      // Remover scrollbars após inicialização
      setTimeout(function() {
        videosCarousel.find('.owl-stage-outer').css({
          'overflow': 'hidden !important',
          '-ms-overflow-style': 'none !important',
          'scrollbar-width': 'none !important'
        });
      }, 100);
    } catch (e) {
      console.error('Erro ao inicializar carrossel de vídeos:', e);
      $('#videos-carousel').css('opacity', '1');
    }
  } else {
    // Fallback se owlCarousel não estiver disponível
    $('#videos-carousel').css('opacity', '1');
  }

  // Lazy loading para imagens (se não houver suporte nativo)
  if ('loading' in HTMLImageElement.prototype) {
    // Navegador suporta lazy loading nativo
    $('img[loading="lazy"]').each(function() {
      this.src = $(this).attr('src');
    });
  } else {
    // Fallback para navegadores antigos
    $('img[loading="lazy"]').each(function() {
      var img = $(this);
      img.attr('data-src', img.attr('src'));
      img.attr('src', 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1 1\'%3E%3C/svg%3E');
    });
  }

  // Prevenir comportamento padrão de links vazios
  $('a[href="#"]').on('click', function(e) {
    e.preventDefault();
  });

  // Melhorar acessibilidade - fechar modais com ESC
  $(document).on('keydown', function(e) {
    if (e.key === 'Escape') {
      $('.navbar-collapse').collapse('hide');
    }
  });

})(jQuery);
