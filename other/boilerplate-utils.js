export function attachAll(context) {
  const modules = context.keys().map(context);
  return function attachModules(ngModule) {
    modules.forEach(module => module(ngModule));
  };
}

export function injectAll(context) {
  const modules = context.keys().map(context);
  return modules.map(module => module.name);
}
