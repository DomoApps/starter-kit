function MainCtrl() {
  const main = this;
  main.meaningOfLife = 42;
}

// inject dependencies here
MainCtrl.$inject = [];

if (ON_TEST) {
  require('./Main.ctrl.spec.js')(MainCtrl);
}
