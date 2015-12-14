/* eslint no-console: 0 */
// webpack
const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config');
webpackConfig.output.path = '/';

const compiler = webpack(webpackConfig);

// proxy
const path = require('path');
const fs = require('fs-extra');
const glob = require('glob');
const request = require('request');
const Domo = require('ryuu-client');
const portfinder = require('portfinder');
portfinder.basePort = 3000;

const home = Domo.getHomeDir();
const mostRecent = getMostRecentLogin();
const domainPromise = getDomoappsDomain();

// webpack-dev-server
const server = new WebpackDevServer(compiler, {
  contentBase: 'dist/',
  hot: false,
  noInfo: true, // set to false if you want to see build info
  stats: { colors: true }
});

// domo data service proxy
server.app.get('/data/v1/:query', (req, res) => {
  const manifest = fs.readJsonSync(path.resolve(process.cwd() + '/manifest.json'));
  let baseUrl;
  domainPromise
    .then(_baseUrl => baseUrl = _baseUrl)
    .then(() => createContext(manifest.id, manifest.mapping))
    .then(context => {
      const j = request.jar();
      const url = baseUrl + req.url;
      const auth = `DA-SID-${getCustomer()}="${mostRecent.sid}"`;
      const cookie = request.cookie(auth);
      j.setCookie(cookie, baseUrl);

      const referer = req.headers.referer.indexOf('?') >= 0
        ? `${req.headers.referer}&context=${context.id}` // jshint ignore:line
        : `${req.headers.referer}?userId=27&customer=dev&locale=en-US&platform=desktop&context=${context.id}`; // jshint ignore:line

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
      console.warn(err);
    });
});

// start server
checkSession().then(() => {
  portfinder.getPort((err, port) => {
    server.listen(port, '0.0.0.0', () => {
      console.log(`Listening on http://0.0.0.0:${port}/webpack-dev-server/index.html`);
    });
  });
})
.catch(()=>{
  console.warn('Session expired. Please login again using domo login.');
});

// helpers
function getMostRecentLogin() {
  const logins = glob.sync(`${home}/login/*.json`);
  if (logins.length === 0) {
    return null;
  }

  const mostRecentLogin = logins.reduce((prev, next) => {
    return fs.statSync(prev).mtime > fs.statSync(next).mtime ? prev : next;
  });
  return fs.readJsonSync(mostRecentLogin);
}

function getCustomer() {
  const regexp = /([\w]+)[\.|-]/;
  return mostRecent.instance.match(regexp)[1];
}

function getEnv() {
  const regexp = /([-_\w]+)\.(.*)/;
  return mostRecent.instance.match(regexp)[2];
}

function getDomoappsDomain() {
  const uuid = Domo.createUUID();
  const j = request.jar();
  const auth = `SID="${mostRecent.sid}"`;
  const cookie = request.cookie(auth);
  j.setCookie(cookie, `https://${mostRecent.instance}`);
  return new Promise((resolve) => {
    request({ url: `https://${mostRecent.instance}/api/content/v1/mobile/environment`, jar: j }, (err, res) => {
      if (res.statusCode === 200) {
        resolve(`https://${uuid}.${JSON.parse(res.body).domoappsDomain}`);
      } else {
        resolve(`https://${uuid}.domoapps.${getEnv()}`);
      }
    });
  });
}

function createContext(designId, mapping) {
  return new Promise(resolve => {
    const options = {
      url: `https://${mostRecent.instance}/domoapps/apps/v2/contexts`,
      method: 'POST',
      json: { designId: designId, mapping: mapping },
      headers: { 'X-Domo-Authentication': mostRecent.sid }
    };

    request(options, (err, res) => {
      resolve(res.body[0] ? res.body[0] : { id: 0 });
    });
  });
}

function checkSession() {
  return new Promise((resolve, reject) => {
    const options = {
      url: `https://${mostRecent.instance}/auth/validate`,
      method: 'GET',
      headers: { 'X-Domo-Authentication': mostRecent.sid }
    };

    request(options, (err, res) => {
      try {
        const isValid = JSON.parse(res.body).isValid;
        if (isValid) {
          resolve(true);
        } else {
          reject(false);
        }
      } catch (e) {
        // couldn't parse as JSON which means the service doesn't exist yet.
        // TODO: remove this once the /domoweb/auth/validate service has shipped to prod
        resolve(true);
      }
    });
  });
}
