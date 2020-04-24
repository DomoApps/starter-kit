# Domo Apps Starter Kit
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FDomoApps%2Fstarter-kit.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2FDomoApps%2Fstarter-kit?ref=badge_shield)

## Prerequisites
1. [domo-cli](https://domoapps.herokuapp.com/dev-kit)
    `npm install -g ryuu`
2. [plop](https://www.npmjs.com/package/plop)
    `npm install -g plop`

## Getting Started
1. clone this repo
    `$ git clone https://github.com/DomoApps/starter-kit.git {APP_NAME}`
2. install dependencies `$ npm install`
3. create new (empty) repo on github and copy its SSH link
4. run setup command `$ npm run setup` and follow prompts
5. configure `domo/manifest.json` file
6. run `domo login` if you are not already authenticated
7. upload to domo `$ npm run upload`
8. copy the id and value from `dist/manifest.json` to `domo/manifest.json`

Read more about using starter-kit on the [project wiki](https://github.com/DomoApps/starter-kit/wiki).

### What does the setup task do?
1. Configures `package.json` { name, version, decription, repository } props.
2. renames git remote to this repo from 'origin' to generator.
3. creates new 'origin' remote to newly created repo
4. adds and commit's all new files
5. pushes changes to remote.

## Usage
- `$ npm run setup` to setup your repo to new git remote
- `$ npm start` to run webpack-dev-server
- `$ npm test` to run unit tests
- `$ npm run tdd` to continuously run tests
- `$ npm run lint` to lint code
- `$ npm run build` to build (and minify)
- `$ npm version (patch|minor|major)` to create git release
- `$ npm run upload` to upload new version to domo. aka `domo publish`
- `$ npm run update-tools` to pull in improvements to the dev tools

## Adding or removing platform views (responsive, desktop)
- Change config values at top of `webpack.config.js`

```js
// set views to true if you want to include them in you app
// these can be changed at any time.
  includeDesktopView: false,
  includeResponsiveView: true,
```

## Updates
To update your build tools, use the `update-tools` script:

```bash
$ npm run update-tools
```

Under the hood, this script is running `git merge --no-commit generator/master`. Make sure to run a `git diff HEAD` to make sure you are not overriding any of your own code in the update. You may also have to resolve some merge conflicts.

### Updating CDN'd dependencies
If you would like to add/edit/remove a dependency from a CDN, you'll need to add/edit/remove the script tag in your main HTML file, you'll also have to add/edit/remove it to the `webpack.config.js`'s `externals` property and to the `karma.conf.js`'s array variable called CDNS.

## Technology
- [Webpack](http://webpack.github.io/)
- [ES2015 via Babel](https://babeljs.io/docs/learn-es2015/)
- [Postcss & Precss](https://github.com/jonathantneal/precss)
- [Angular 1.x](https://angularjs.org/)
- [Redux](http://redux.js.org/docs/introduction/) and [ngRedux](https://github.com/angular-redux/ng-redux)

## Features
- Unit Testing
  + [karma](http://karma-runner.github.io/): Test Runner
  + [mocha](https://mochajs.org/)
  + [chai](http://chaijs.com/)
- Code Linting
  + [eslint]() - For JavaScript
- Dev Server with auto-reload
  + [webpack-dev-server](http://webpack.github.io/docs/webpack-dev-server.html)
  + Proxy for data service
- Changelog Generation
  + [conventional-changelog](https://github.com/ajoslin/conventional-changelog)
- Minification
  + [UglifyJS2](https://github.com/mishoo/UglifyJS2)
- Git Release Automation
- [.editorconfig](http://editorconfig.org/)
- Plop
  + $ plop [type e.g. directive, factory, filter, route]
  + [da-plop](https://git.empdev.domo.com/AppTeam6/da-plop)

## Domo App Specific Features
- Platform Detection / Routing
- "Lab" view

## Folder Structure
```text
. // top level config stuff for webpack, karma, eslint, ect...
├── src
|    ├── common // common across desktop and responsive
|    |    ├── components // place for common components
|    |    |
|    |    ├── filters // place for common filters
|    |    |
|    |    ├── services // place for common services
|    |    |
|    |    ├── store // place for Redux files
|    |    |    ├── actions // Action creator files
|    |    |    ├── constants // Redux action constants
|    |    |    └── reducers // Reducer files. Reducer files must export a named module, not default.
|    |    |         └── index.js // Automatically combines all reducers into one to create the store in the top level config file.
|    |    ├── styles // place for common styles
|    |    |    ├── typebase.css // base type for all apps
|    |    |    └── variable.css // variables
|    |    └── index.js // JS entry for common Angular module
|    |
|    ├── responsive // a folder for each component
|    |    ├── components // place for dumb/presenter components common across routes
|    |    |
|    |    ├── containers // place for smart/container components common across routes
|    |    |
|    |    ├── routes // place for routes
|    |    |    └── my-route
|    |    |        ├── components // place for dumb/presenter components specific to this route
|    |    |        |
|    |    |        ├── containers // place for smart/container components specific to this route
|    |    |        |    └── my-container
|    |    |        |        ├── my-container.component.js
|    |    |        |        ├── my-container.component.css
|    |    |        |        └── my-container.component.html
|    |    |        |
|    |    |        └── index.js // define module and route
|    |    |
|    |    ├── responsive.cofig.js // responsive app top level configuration
|    |    ├── responsive.init.js // top level initialization code
|    |    ├── responsive.html // html entry (layout html goes here)
|    |    ├── responsive.css // common css for responsive
|    |    └── index.js // JS entry
|    |
|    └── desktop // same structure as responsive
|
└── dist // Generated by build
...

```
This folder structure is optimized for component-based development. Read more on the [project wiki](https://github.com/DomoApps/starter-kit/wiki/Component-Based-Development).

## Prerequisites for publishing
- A thumbnail must be present in the domo folder under the name "thumbnail.png"
- A valid json file named "manifest.json" must be present in the domo folder with the necessary meta data required by the domo cli. For more information on the manifest.json, please see [Domo's manifest.json documentation](https://developer.domo.com/docs/dev-studio/dev-studio-manifest-json-reference)

```text
├── domo
|    ├── thumbnail.png // A thumnail for the app that will represent the app
|    |                 // on mobile and in the asset library
|    ├── manifest.json // The mapping file that communicates to the domo
|    |                 // cli which asset ids and aliases are used

...

```
If either of these files is missing, or if the manifest.json file is malformed, the publish will fail. For more on publishing, please see [Domo's publish and share documentation](https://developer.domo.com/docs/dev-studio/dev-studio-publish)

## Style Guides
- For now, we're writing everything as CommonJS2 modules.
- For CSS rules, please see [Reasonable CSS](http://rscss.io/)
- For JS rules, please see [AirBnB's styleguide](https://github.com/airbnb/javascript)
- For Angular rules, please see [John Papa's styleguide](https://github.com/johnpapa/angular-styleguide)

## Future Plans
- [x] configurable proxy
- [ ] localization strategy
- [ ] closure optimization as soon as it's ready for babel 6

---

# Domo Widgets (visualization components)

Domo has a growing library of visualization components (we call them widgets) that we have developed over time and incorporated into the apps that we have created. These widgets are built on top of a charting library called [d3.js](http://d3js.org/) and a framework on top of d3.js called [d3.chart](http://misoproject.com/d3-chart/). In order to consume these widgets, you don't *need* to be very familiar with these libraries and frameworks although a familiarity would be helpful.

These widgets are available to download as dependencies to your project via [NPM](https://www.npmjs.com/) and they are all name-spaced to the [@domoinc](https://www.npmjs.com/org/domoinc) organization. They are bundled as [UMD](https://github.com/umdjs/umd) modules so they should be consumable by most JavaScript bundlers and module systems (eg. RequireJS, Webpack, Browserify, Rollup). To see a list of all of our available widgets, simply navigate your browser to [https://www.npmjs.com/org/domoinc](https://www.npmjs.com/org/domoinc).

### Example
1. Install desired widget `$ npm i -S @domoinc/barchart`
2. Include widget into source code via module system or script tag.
3. Create instance of chart by passing the constructor a d3 selection.
4. Set chart's configurable options via `config` method.
5. Set chart's accessor functions via `accessor` method.
6. Draw chart by passing data to chart method.

```js
 // CommonJS (webpack, browserify)
 const d3 = require('d3');
 const BarChart = require('@domoinc/bar-chart');
 const chart = new BarChart(d3.select('#chart'))
   .accessor('value', 'value', d => d.value)
   .config('width', 500)
   .draw(data);

 // AMD (RequireJS)
 define(['d3', 'bar-chart'], function(d3, BarChart) {
 var chart = new BarChart(d3.select('#chart'));
   chart
    .accessor('value', function(d) { return d.value; })
    .config('width', 500)
    .draw(data);
 });

 // globals (via script tag)
 var chart = new BarChart(d3.select('#chart'));
 chart
   .accessor('value', function(d) { return d.value; });
   .config('width', 500)
   .draw(data);
```


## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FDomoApps%2Fstarter-kit.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2FDomoApps%2Fstarter-kit?ref=badge_large)