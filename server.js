// webpack
var WebpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config');
webpackConfig.output.path = '/';
var compiler = webpack(webpackConfig);
// proxy
var path = require('path');
var fs = require('fs-extra');
var glob = require('glob');
var request = require('request');
var Domo = require('ryuu-client');
var portfinder = require('portfinder');
portfinder.basePort = 3000;
var home = Domo.getHomeDir();
var mostRecent = getMostRecentLogin();
var domainPromise = getDomoappsDomain();

// webpack-dev-server
var server = new WebpackDevServer(compiler, {
  contentBase: 'dist/',
  hot: true,
  noInfo: true, // set to false if you want to see build info
  stats: { colors: true }
});

// domo data service proxy
server.app.get('/data/v1/:query', (req, res) => {
  var manifest = fs.readJsonSync(path.resolve(process.cwd() + '/manifest.json'));
  var baseUrl;
  domainPromise
    .then(_baseUrl => baseUrl = _baseUrl)
    .then(() => createContext(manifest.id, manifest.mapping))
    .then(context => {
      var j = request.jar();
      var url = baseUrl + req.url;
      var auth = `DA-SID-${getCustomer()}="${mostRecent.sid}"`;
      var cookie = request.cookie(auth);
      j.setCookie(cookie, baseUrl);
      var referer = req.headers.referer.indexOf('?') >= 0 ? `${req.headers.referer}&context=${context.id}` : `${req.headers.referer}?userId=27&customer=dev&locale=en-US&platform=desktop&context=${context.id}`;
      console.log('base', baseUrl);
      console.log('url', url);
      console.log('ref', referer);
      request({
        url: url, 
        jar: j, 
        headers: {
          referer: referer, 
          accept: req.headers.accept
        }
      }).pipe(res);
    })
    .catch(err => {
      console.log(err);
    });
});

// start server
checkSession().then(() => {
  portfinder.getPort((err, port) => {
    server.listen(port, 'localhost', () => {
      console.log(`Listening on http://localhost:${port}/webpack-dev-server/index.html`);
    });
  });
})
.catch(()=>{
  console.warn('Session expired. Please login again using domo login.');
});

// helpers
function getMostRecentLogin () {
  var logins = glob.sync(`${home}/login/*.json`);
  if (logins.length === 0) {
    return;
  }

  var mostRecent = logins.reduce((prev, next) => {
    return fs.statSync(prev).mtime > fs.statSync(next).mtime ? prev : next;
  });
  return fs.readJsonSync(mostRecent);
}

function getCustomer () {
  var regexp = /([\w]+)[\.|-]/;
  return mostRecent.instance.match(regexp)[1];
}

function getEnv () {
  var regexp = /([-_\w]+)\.(.*)/;
  return mostRecent.instance.match(regexp)[2];
}

function getDomoappsDomain () {
  var uuid = Domo.createUUID();
  var j = request.jar();
  var auth = `SID="${mostRecent.sid}"`;
  var cookie = request.cookie(auth);
  j.setCookie(cookie, `https://${mostRecent.instance}`);
  return new Promise((resolve, reject) => {
    request({url: `https://${mostRecent.instance}/api/content/v1/mobile/environment`, jar: j}, (err, res) => {
      if (res.statusCode === 200){
        resolve(`https://${uuid}.${JSON.parse(res.body).domoappsDomain}`);
      }
      else {
        resolve(`https://${uuid}.domoapps.${getEnv()}`);
      }
    });
  });
}

function createContext (designId, mapping) {
  return new Promise((resolve, reject) => {
    var options = {
      url: `https://${mostRecent.instance}/domoapps/apps/v2/contexts`,
      method: 'POST',
      json: {designId: designId, mapping: mapping},
      headers: { 'X-Domo-Authentication': mostRecent.sid }
    };
    
    request(options, (err, res) => {
      resolve(res.body[0] ? res.body[0] : {id: 0});
    });
    
  });
}

function checkSession () {
  return new Promise((resolve, reject) => {
    var options = {
      url: `https://${mostRecent.instance}/auth/validate`,
      method: 'GET',
      headers: { 'X-Domo-Authentication': mostRecent.sid }
    };
    
    request(options, (err, res) => {
      try{
        var isValid = JSON.parse(res.body).isValid;
        if(isValid){
          resolve(true);
        }
        else {
          reject(false);
        }
      }
      catch(e){
        // couldn't parse as JSON which means the service doesn't exist yet.
        // TODO: remove this once the /domoweb/auth/validate service has shipped to prod
        resolve(true);
      }
    })
    
    
  });
}
