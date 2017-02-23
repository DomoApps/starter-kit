import * as React from 'react';
import { connect } from 'react-redux';

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
        Please edit <code>src/containers/app.container.tsx</code> to get started!
      </div>
    );
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
