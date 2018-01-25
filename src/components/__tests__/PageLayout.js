import React from 'react';
import { mount } from 'enzyme';
import PageLayout from 'components/PageLayout/PageLayout';
import { wrapWithProviders } from 'pages/__tests__/helpers';


describe('PageLayout component', () => {

  let layoutInstance = null;
  beforeAll((done) => {
    layoutInstance = mount(wrapWithProviders(
      <PageLayout>Test</PageLayout>
    ));
    done();
  });

  test('Should mount and render', () => {
    expect(layoutInstance).toEqual(expect.anything());
  });

  test('Should contain a navbar and some inner content', () => {
    expect(layoutInstance.find('Navbar').exists()).toBe(true);
    expect(layoutInstance.contains('Test')).toBe(true);
  });

});
