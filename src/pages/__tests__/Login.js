import LoginPage from '../Login/Login';
import { mountPage } from './helpers';


describe('Login page', () => {

  let loginPage = null;
  beforeAll((done) => {
    loginPage = mountPage(LoginPage, {});
    done();
  });

  test('Should mount and render', () => {
    expect(loginPage).toEqual(expect.anything());
  });

  test('Shows a form', () => {
    expect(loginPage.find('form[data-test="loginForm"]').exists()).toBe(true);
  });

  test('Shows an error message on submit fail', ( done ) => {
    const errorResponse = [
      JSON.stringify({
        error: {
          message: 'Email not found',
        },
      }),
      { status: 404 },
    ];
    fetch.mockResponseOnce(...errorResponse);

    loginPage.find('input[name="email"]')
      .simulate('change', { target: { value: 'abcdefg@gmail.com' } });
    loginPage.find('input[name="password"]')
      .simulate('change', { target: { value: '12345678' } });
    loginPage.find('form[data-test="loginForm"]').simulate('submit');
    setTimeout(() => {
      loginPage.update();
      expect(
        loginPage
          .find('[data-test="serverError"]').first()
          .contains('Email not found')
      ).toBe(true);
      done();
    }, 100);
  });

});
