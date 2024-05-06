// Load Styles
import '../scss/main.scss';

// Load Bootstrap init
import {initBootstrap} from "./bootstrap.js";

// Loading bootstrap with optional features
initBootstrap({
  tooltip: true,
  popover: true,
  toasts: true,
});

$(function () {
  // Update active menu item
  var url = window.location;
  $('ul.navbar-nav a').filter(function() {
      return this.href == url;
  }).addClass('active').attr("aria-current","page").append(' <span class="visually-hidden">(Current)</span>');

  // Set copyright year dynamically
  $('#spanYear').html(new Date().getFullYear());
});

// Add additional js files
import './custom.js';