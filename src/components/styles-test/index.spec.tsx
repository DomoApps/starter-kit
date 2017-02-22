import * as React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import StylesTest from './index';

describe('<StylesTest />', function () {

  let component;
  beforeEach(function () {
    component = shallow(<StylesTest />);
  });

  describe('when rendering the component', function () {

    it('should have a className of "styles-test-component"', function () {
      expect(component.hasClass('styles-test-component')).to.equal(true);
    });
  });
});
