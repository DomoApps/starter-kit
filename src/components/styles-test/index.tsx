import * as React from 'react';
import * as cssmodules from 'react-css-modules';
import * as styles from './index.cssmodule.scss';

interface IStylesTestProps extends React.Props<any> {
  /* define props interface here */
};

const StylesTest = ({
  /* destructure props here */
}: IStylesTestProps) => (
  <div className="styles-test-component" styleName="styles-test-component">
    This is the coolest thing ever!
  </div>
);

export default cssmodules(StylesTest, styles);
