/**
 * DO NOT EDIT ME!
 */
const re = /platform=(\w+)\W*/ig;
const match = re.exec(location.search);

if (match) {
  const platform = match[1];
  const params = location.search || '';
  const url = '/' + platform + '/index.html' + params;

  const request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.onload = function onLoad() {
    if (request.status >= 200 && request.status < 400) {
      window.location.replace(url);
    } else {
      window.location.replace('/desktop/index.html' + params);
    }
  };

  request.onerror = function onError() {
    window.location.replace('/desktop/index.html' + params);
  };

  request.send();
} else if (location.hostname === 'localhost') {
  window.location.replace('/lab.html');
} else {
  window.location.replace('/desktop/index.html');
}
