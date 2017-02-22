import * as React from 'react';
import { connect } from 'react-redux';

import CoolBeansBro from 'components/cool-beans-bro';
import StylesTest from 'components/styles-test';

interface IAppProps extends React.Props<any> {

};

function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {

  };
}

class App extends React.Component<IAppProps, void> {
  render() {
    return (
      <div>
        <CoolBeansBro />
        <StylesTest />
      </div>
    );
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
