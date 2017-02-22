import * as React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import CoolBeansBro from './index';

describe('<CoolBeansBro />', function () {

  let component;
  beforeEach(function () {
    component = shallow(<CoolBeansBro />);
  });

  describe('when rendering the component', function () {

    it('should have a className of "cool-beans-bro-component"', function () {
      expect(component.hasClass('cool-beans-bro-component')).to.equal(true);
    });
  });
});
