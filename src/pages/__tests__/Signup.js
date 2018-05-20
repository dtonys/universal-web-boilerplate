import SignupPage from '../Signup/Signup';
import { mountPage } from './helpers';


describe('Signup page', () => {

  let signupPage = null;
  beforeAll((done) => {
    signupPage = mountPage(SignupPage, {});
    done();
  });

  test('Should mount and render', () => {
    expect(signupPage).toEqual(expect.anything());
  });

  test('Shows a form', () => {
    expect(signupPage.find('form[data-test="signupForm"]').exists()).toBe(true);
  });

  test('Shows an error message on submit fail', (done) => {
    const errorResponse = [
      JSON.stringify({
        error: {
          message: 'User email already in use',
        },
      }),
      { status: 404 },
    ];
    fetch.mockResponseOnce(...errorResponse);
    signupPage.find('input[name="email"]')
      .simulate('change', { target: { value: 'abcdefg@gmail.com' } });
    signupPage.find('input[name="password"]')
      .simulate('change', { target: { value: '12345678' } });
    signupPage.find('form[data-test="signupForm"]').simulate('submit');

    setTimeout(() => {
      signupPage.update();
      expect(
        signupPage
          .find('[data-test="serverError"]').first()
          .contains('User email already in use')
      ).toBe(true);
      done();
    }, 100);

  });

});
