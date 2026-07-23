/**
 * Pacino's Playcare — Food Pre-Pay Page JavaScript
 * Handles: category filtering of food catalogue items
 */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     Category filter buttons
  ---------------------------------------------------------- */
  var filterBtns = document.querySelectorAll('.filter-btn');
  var foodCards  = document.querySelectorAll('.food-card[data-category]');

  if (filterBtns.length && foodCards.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        // Toggle active state
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        var category = btn.getAttribute('data-filter');

        foodCards.forEach(function (card) {
          if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }
})();
