const DESKTOP_VIEW_ON_TABLET = false;

/**
 * DO NOT EDIT BELOW ME!
 */

const enquire = require('enquire.js');

function redirect() {
  /* Desktops and laptops ----------- */
  enquire.register('only screen and (min-width : 1025px)', () => {
    window.location.replace('/desktop/index.html');
  });

  enquire.register('only screen and (max-width : 767px)', () => {
    window.location.replace('/responsive/index.html');
  });

  /* iPads (portrait and landscape) ----------- */
  enquire.register('only screen and (min-device-width : 768px) and (max-device-width : 1024px)', () => {
    if (DESKTOP_VIEW_ON_TABLET) {
      window.location.replace('/desktop/index.html');
    } else {
      window.location.replace('/responsive/index.html');
    }
  });
}

window.requestAnimationFrame(redirect);
