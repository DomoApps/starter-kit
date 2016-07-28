const constants = generateConstants([
/*
  Action constants go here. Constants should uppper snake cased.
  They should have the pattern of <NOUN>_<VERB PAST TENSE>
  'DATA_REQUESTED',
  'BUTTON_CLICKED'
 */
]);

export default constants;

function generateConstants(names) {
  const constants = {};
  names.forEach(name => {
    constants[name] = name;
  });
  return Object.freeze(constants);
}
