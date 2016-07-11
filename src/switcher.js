const DESKTOP_VIEW_ON_TABLET = true;

/**
 * DO NOT EDIT BELOW ME!
 */

const enquire = require('enquire.js');


function redirect() {
  console.log(window.innerWidth);
  /* Desktops and laptops ----------- */
  enquire.register('only screen and (min-width : 1025px)', () => {
    window.location.replace('/desktop/index.html');
  });

  enquire.register('only screen and (max-width : 736px)', () => {
    window.location.replace('/responsive/index.html');
  });

  /* iPads (portrait and landscape) ----------- */
  enquire.register('only screen and (min-width : 736px) and (orientation: portrait), only screen and (min-width: 737px) and (max-width : 1024px)', () => {
    if (DESKTOP_VIEW_ON_TABLET) {
      window.location.replace('/desktop/index.html');
    } else {
      window.location.replace('/responsive/index.html');
    }
  });
}

window.requestAnimationFrame(redirect);
