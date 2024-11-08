(function ($) {

  "use strict";

  // ------------------------------------------------------------------------------ //
  // Overlay Menu Navigation
  // ------------------------------------------------------------------------------ //
  var overlayMenu = function () {
    // Vérifie si l'élément avec la classe 'nav-overlay' existe sur la page
    if (!$('.nav-overlay').length) {
      return false;
    }

    // Déclare les variables nécessaires pour l'overlay menu
    var body = undefined;
    var menu = undefined;
    var menuItems = undefined;

    // Fonction d'initialisation pour configurer les variables et les écouteurs d'événements
    var init = function init() {
      body = document.querySelector('body');
      menu = document.querySelector('.menu-btn');
      menuItems = document.querySelectorAll('.nav__list-item');
      applyListeners();
    };

    // Ajoute un écouteur d'événement au bouton de menu pour basculer la classe 'nav-active' sur le corps du document
    var applyListeners = function applyListeners() {
      menu.addEventListener('click', function () {
        return toggleClass(body, 'nav-active');
      });
    };

    // Fonction pour ajouter ou retirer une classe à un élément
    var toggleClass = function toggleClass(element, stringClass) {
      if (element.classList.contains(stringClass)) 
        element.classList.remove(stringClass); 
      else 
        element.classList.add(stringClass);
    };

    // Appelle la fonction d'initialisation
    init();
  }


  // Configuration du Portfolio Slider en utilisant Swiper.js
  var swiper = new Swiper(".portfolio-Swiper", {
    slidesPerView: 4,
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    // Configuration des breakpoints pour le responsive design
    breakpoints: {
      300: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });

  // Fonction pour animer les textes
  var initTextFx = function () {
    $('.txt-fx').each(function () {
      var newstr = '';
      var count = 0;
      var delay = 100;
      var stagger = 10;
      var words = this.textContent.split(/\s/);
      var arrWords = new Array();
      
      // Boucle pour chaque mot dans le texte
      $.each(words, function(key, value) {
        newstr = '<span class="word">';

        // Boucle pour chaque lettre dans le mot
        for (var i = 0, l = value.length; i < l; i++) {
          newstr += "<span class='letter' style='transition-delay:"+ (delay + stagger * count) +"ms;'>"+ value[i] +"</span>";
          count++;
        }
        newstr += '</span>';

        arrWords.push(newstr);
        count++;
      });

      // Met à jour le contenu HTML avec les nouvelles structures de mots et de lettres
      this.innerHTML = arrWords.join("<span class='letter' style='transition-delay:"+ delay +"ms;'>&nbsp;</span>");
    });
  }

  // Initialisation d'Isotope pour la gestion des filtres sur les éléments du portfolio
  var initIsotope = function() {
    $('.grid').each(function(){
      // $('.grid').imagesLoaded( function() { // Décommentez cette ligne si vous utilisez imagesLoaded
      
      // Sélectionne les boutons de filtre et récupère la valeur du filtre actif
      var $buttonGroup = $( '.button-group' );
      var $checked = $buttonGroup.find('.is-checked');
      var filterValue = $checked.attr('data-filter');

      // Initialise Isotope avec les éléments du portfolio
      var $grid = $('.grid').isotope({
        itemSelector: '.portfolio-item',
        // layoutMode: 'fitRows',
        filter: filterValue
      });

      // Ajoute un écouteur d'événement pour le clic sur les boutons de filtre
      $('.button-group').on('click', 'a', function(e) {
        e.preventDefault();
        filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
      });

      // Change la classe 'is-checked' sur les boutons de filtre
      $('.button-group').each(function(i, buttonGroup) {
        $buttonGroup.on('click', 'a', function() {
          $buttonGroup.find('.is-checked').removeClass('is-checked');
          $(this).addClass('is-checked');
        });
      });
      // }); // Décommentez cette ligne si vous utilisez imagesLoaded
    });
  }

  // Initialisation de la lightbox Chocolat
  var initChocolat = function() {
    Chocolat(document.querySelectorAll('.image-link'), {
      imageSize: 'contain',
      loop: true,
    })
  }

  // Exécute certaines fonctions une fois le document chargé
  $(document).ready(function () {
    overlayMenu();
    initTextFx();
    initChocolat();

    // Gestion du menu mobile
    $('.menu-btn').click(function(e){
      e.preventDefault();
      $('body').toggleClass('nav-active');
    });

    // Initialisation des animations AOS
    AOS.init({
      duration: 1200,
      // once: true,
    })
  });

  // Exécute certaines fonctions une fois la fenêtre entièrement chargée
  $(window).load(function () {
    $(".preloader").fadeOut("slow");
    initIsotope();
  })

})(jQuery);
