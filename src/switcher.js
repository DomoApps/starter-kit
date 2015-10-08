/*
 * DO NOT EDIT ME!
 */
var re = /platform=(\w+)\W*/ig
var match = re.exec(location.search);

if (match) {
  var platform = match[1];
  var params = location.search || '';
  var url = '/' + platform + '/index.html' + params;

  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      window.location.replace(url);
    } else {
      window.location.replace('/desktop/index.html' + params);
    }
  };
  request.onerror = function() { window.location.replace('/desktop/index.html' + params); };
  request.send();

} else if (location.hostname === 'localhost') {
  window.location.replace('/lab.html');
} else {
  window.location.replace('/desktop/index.html');
}