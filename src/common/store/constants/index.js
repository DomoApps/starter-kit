const constants = generateConstants([
/*
  Action constants go here. Constants should uppper snake cased.
  'DATA_REQUESTED',
  'BUTTON_CLICKED',
  'INCREASE_COUNT'
 */
]);

export default constants;

function generateConstants(names) {
  const constantsMap = {};
  names.forEach(name => {
    constantsMap[name] = name;
  });
  return Object.freeze(constantsMap);
}
