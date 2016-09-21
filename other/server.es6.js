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
const bodyParser = require('body-parser');
const Domo = require('ryuu-client');
const portfinder = require('portfinder');
portfinder.basePort = 3000;

let baseUrl;
const home = Domo.getHomeDir();
const mostRecent = getMostRecentLogin();
const domo = new Domo(mostRecent.instance, mostRecent.sid, mostRecent.devtoken);
const manifest = fs.readJsonSync(path.resolve(process.cwd() + '/domo/manifest.json'));
const domainPromise = getDomoappsDomain()
  .then(_baseUrl => baseUrl = _baseUrl)
  .then(() => createContext(manifest.id, manifest.mapping));

// webpack-dev-server
const server = new WebpackDevServer(compiler, {
  contentBase: 'dist/',
  hot: false,
  noInfo: true, // set to false if you want to see build info
  stats: {
    colors: true
  }
});

server.app.use(bodyParser.urlencoded({
  extended: false
}));
server.app.use(bodyParser.json());

// domo data service proxy
server.app.all('/data/v1/:query', proxyRequest);

function proxyRequest(req, res) {
  domainPromise
    .then(context => {
      const url = baseUrl + req.url;
      const j = request.jar();

      const referer = req.headers.referer.indexOf('?') >= 0 ? `${req.headers.referer}&context=${context.id}` : `${req.headers.referer}?userId=27&customer=dev&locale=en-US&platform=desktop&context=${context.id}`; // jshint ignore:line
      const headers = Object.assign({
        referer,
        accept: req.headers.accept,
        'content-type': req.headers['content-type'] || req.headers['Content-Type']
      }, domo.getAuthHeader());

      const r = request({
        url,
        method: req.method,
        headers,
        jar: j,
        body: JSON.stringify(req.body)
      });

      r.pipe(res);
    })
    .catch(err => {
      console.warn(err);
    });
}

// start server
checkSession()
  .then(() => {
    portfinder.getPort({
      host: '0.0.0.0'
    }, (err, port) => {
      server.listen(port, '0.0.0.0', () => {
        console.log(`Listening on http://0.0.0.0:${port}/webpack-dev-server/index.html`);
      });
    });
  })
  .catch(reason => {
    console.warn(reason);
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
  return new Promise((resolve) => {
    request({
      url: `https://${mostRecent.instance}/api/content/v1/mobile/environment`,
      headers: domo.getAuthHeader()
    }, (err, res) => {
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
      json: {
        designId,
        mapping
      },
      headers: domo.getAuthHeader()
    };

    request(options, (err, res) => {
      resolve(res.body[0] ? res.body[0] : {
        id: 0
      });
    });
  });
}

function checkSession() {
  return new Promise((resolve, reject) => {
    if (typeof mostRecent.devtoken !== 'undefined') {
      // we don't have any way to check tokens, so we'll default to accent
      // until this is fixed
      resolve(true);
    }
    const options = {
      url: `https://${mostRecent.instance}/auth/validate`,
      method: 'GET',
      headers: {
        'X-Domo-Authentication': mostRecent.sid
      }
    };

    request(options, (err, res) => {
      try {
        const isValid = JSON.parse(res.body)
          .isValid;
        if (isValid) {
          resolve(true);
        } else {
          reject('Session expired. Please login again using domo login.');
        }
      } catch (e) {
        // couldn't parse as JSON which means the service doesn't exist yet.
        // TODO: remove this once the /domoweb/auth/validate service has shipped to prod
        resolve(true);
      }
    });
  });
}
