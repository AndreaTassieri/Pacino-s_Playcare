/**
 * Pacino's Playcare — Pricing Page JavaScript
 *
 * Discount algorithm:
 *   The business charges a base rate per unit (half-day / overnight).
 *   Combining units triggers a sliding-scale discount — the longer
 *   the stay, the lower percentage of the base price the customer pays.
 *   Discounts are capped at a floor (MIN_DISCOUNT_PCT) so the business
 *   always earns at or above a fair minimum wage.
 *
 * Base prices (£):
 *   Half-day  = £20
 *   Overnight = £35  (approx. 12-hour stay with overnight care)
 *
 * Discount tiers (% off total rack-rate):
 *   1 unit       →  0%
 *   2 units      →  5%
 *   3 units      → 10%
 *   4–5 units    → 15%
 *   6–7 units    → 20%
 *   8–9 units    → 25%
 *   10–13 units  → 30%
 *   14+ units    → 35%  ← floor (fair-wage cap)
 */

(function () {
  'use strict';

  // ── Configuration ──────────────────────────────────────────
  var PRICES = {
    halfDay:   20,
    overnight: 35
  };

  var TIERS = [
    { minUnits:  1, maxUnits:  1, pctOff:  0 },
    { minUnits:  2, maxUnits:  2, pctOff:  5 },
    { minUnits:  3, maxUnits:  3, pctOff: 10 },
    { minUnits:  4, maxUnits:  5, pctOff: 15 },
    { minUnits:  6, maxUnits:  7, pctOff: 20 },
    { minUnits:  8, maxUnits:  9, pctOff: 25 },
    { minUnits: 10, maxUnits: 13, pctOff: 30 },
    { minUnits: 14, maxUnits: Infinity, pctOff: 35 }
  ];

  var FLOOR_PCT_OFF = 35; // Maximum discount — business minimum-wage floor

  // ── Helpers ────────────────────────────────────────────────
  function getDiscountPct(totalUnits) {
    for (var i = TIERS.length - 1; i >= 0; i--) {
      if (totalUnits >= TIERS[i].minUnits) {
        return Math.min(TIERS[i].pctOff, FLOOR_PCT_OFF);
      }
    }
    return 0;
  }

  function formatGBP(amount) {
    return '£' + amount.toFixed(2).replace(/\.00$/, '');
  }

  // ── Populate discount table ────────────────────────────────
  function buildDiscountTable() {
    var tbody = document.getElementById('discount-tbody');
    if (!tbody) return;

    var html = '';
    TIERS.forEach(function (tier) {
      var exampleUnits = tier.minUnits;
      var rackRate = exampleUnits * PRICES.halfDay; // illustrative with half-days
      var discounted = rackRate * (1 - tier.pctOff / 100);
      var rangeLabel = tier.maxUnits === Infinity
        ? tier.minUnits + '+ units'
        : tier.minUnits === tier.maxUnits
          ? tier.minUnits + ' unit' + (tier.minUnits !== 1 ? 's' : '')
          : tier.minUnits + '–' + tier.maxUnits + ' units';

      var floorNote = tier.pctOff === FLOOR_PCT_OFF ? ' <span class="badge badge-gold" style="font-size:0.65rem">Max</span>' : '';

      html +=
        '<div class="tier-row" role="row">' +
        '<span class="tier-cell tier-cell--duration" role="cell">' + rangeLabel + '</span>' +
        '<span class="tier-cell tier-cell--discount" role="cell">' + tier.pctOff + '%' + floorNote + '</span>' +
        '<span class="tier-cell tier-cell--price" role="cell">You pay ' + (100 - tier.pctOff) + '%</span>' +
        '<span class="tier-cell" role="cell">' +
          (tier.pctOff === 0
            ? 'Full rate — short visits'
            : tier.pctOff === FLOOR_PCT_OFF
              ? '⬇️ Best rate — fair-wage floor reached'
              : 'Longer stays save more') +
        '</span>' +
        '</div>';
    });

    tbody.innerHTML = html;
  }

  // ── Quote estimator widget ─────────────────────────────────
  function initEstimator() {
    var form      = document.getElementById('estimator-form');
    var halfInput = document.getElementById('est-half-days');
    var overInput = document.getElementById('est-overnights');
    var resultEl  = document.getElementById('estimator-result');

    if (!form || !resultEl) return;

    function updateEstimate() {
      var halfDays   = Math.max(0, parseInt(halfInput.value, 10) || 0);
      var overnights = Math.max(0, parseInt(overInput.value, 10) || 0);
      var totalUnits = halfDays + overnights;

      if (totalUnits === 0) {
        resultEl.innerHTML = '<p class="estimator-hint">Enter a stay combination above to see your estimated price.</p>';
        return;
      }

      var rackRate = halfDays * PRICES.halfDay + overnights * PRICES.overnight;
      var pctOff   = getDiscountPct(totalUnits);
      var saving   = rackRate * (pctOff / 100);
      var total    = rackRate - saving;

      var html =
        '<div class="estimator-breakdown">' +
          '<div class="estimator-row">' +
            '<span>Half-days (' + halfDays + ' × ' + formatGBP(PRICES.halfDay) + ')</span>' +
            '<span>' + formatGBP(halfDays * PRICES.halfDay) + '</span>' +
          '</div>' +
          '<div class="estimator-row">' +
            '<span>Overnights (' + overnights + ' × ' + formatGBP(PRICES.overnight) + ')</span>' +
            '<span>' + formatGBP(overnights * PRICES.overnight) + '</span>' +
          '</div>' +
          '<div class="estimator-row estimator-row--discount">' +
            '<span>Loyalty discount (' + pctOff + '% off)</span>' +
            '<span>- ' + formatGBP(saving) + '</span>' +
          '</div>' +
          '<div class="estimator-row estimator-row--total">' +
            '<span>Estimated Total</span>' +
            '<span class="estimator-total-price">' + formatGBP(total) + '</span>' +
          '</div>' +
        '</div>';

      if (pctOff === FLOOR_PCT_OFF) {
        html += '<p class="estimator-floor-note">🎉 You\'ve reached our best rate — the fair-wage floor means we can\'t go lower, but you\'re getting maximum value!</p>';
      }

      resultEl.innerHTML = html;
    }

    halfInput.addEventListener('input', updateEstimate);
    overInput.addEventListener('input', updateEstimate);
    form.addEventListener('submit', function (e) { e.preventDefault(); });
    updateEstimate();
  }

  // ── Init ───────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    buildDiscountTable();
    initEstimator();
  });
})();
