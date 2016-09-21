/**
 * Use to attach multiple Angular components, services, etc. to an Angular module.
 * Takes a required context from webpack's required.context
 * and maps it to an array of modules to be attached to an
 * Angular module.
 *
 * @param  {webpackContext} context Webpack context object
 * @return {function}         Used to attach an array of modules to an Angular module
 */
export function attachAll(context) {
  const modules = context.keys().map(context);
  return function attachModules(ngModule) {
    modules.forEach(module => module(ngModule));
  };
}


/**
 * Use to get names for multiple Angular modules to inject as dependencies on an Angular module.
 * Context must be Angular modules i.e. require.context('./dir', /file\.js/) must
 * reference files that export an Angular module.
 *
 * @param  {webpackContext} context Webpack context object from require.context().
 * @return {Array}         An array of Angular module names
 */
export function getNgModuleNames(context) {
  const modules = context.keys().map(context);
  return modules.map(module => module.default.name);
}
