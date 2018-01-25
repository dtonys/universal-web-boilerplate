import Navbar from 'components/Navbar/Navbar';
import { mountComponent } from 'pages/__tests__/helpers';


describe('Navbar component', () => {


  test('Should mount and render', () => {
    const navbar = mountComponent(Navbar, {});
    expect(navbar).toEqual(expect.anything());
  });

  test('Should show the logged in user when logged in', () => {
    const loggedInState = {
      user: {
        user: {
          user: {
            email: 'testuser@gmail.com',
          },
          loading: false,
          error: null,
        },
      },
    };
    const navbar = mountComponent(Navbar, loggedInState);
    expect(navbar.contains('testuser')).toBe(true);
  });

  test('Should show the login and signup buttons when logged out', () => {
    const loggedOutState = {
      user: {
        user: {
          user: null,
          loading: false,
          error: null,
        },
      },
    };
    const navbar = mountComponent(Navbar, loggedOutState);
    expect(navbar.contains('Login')).toBe(true);
    expect(navbar.contains('Signup')).toBe(true);
  });

});
