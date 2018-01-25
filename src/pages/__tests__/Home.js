import HomePage from '../Home/Home';
import { mountPage } from './helpers';


describe('Home page', () => {

  test('Should mount and render', () => {
    const homePage = mountPage(HomePage, {});
    expect(homePage).toEqual(expect.anything());
  });

});
