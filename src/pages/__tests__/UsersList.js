import UsersListPage from '../UsersList/UsersList';
import { mountPage } from './helpers';


describe('UsersList page', () => {

  const populatedState = {
    user: {
      users: {
        users: [
          { email: 'test1@gmail.com' },
          { email: 'test2@gmail.com' },
        ],
      },
    },
  };
  let usersListPage = null;
  beforeAll((done) => {
    usersListPage = mountPage(UsersListPage, populatedState);
    done();
  });

  test('Should mount and render', () => {
    expect(usersListPage).toEqual(expect.anything());
  });

  test('Shows a list of users', () => {
    const items = [
      usersListPage.find('[data-test="userListItem"]').at(0),
      usersListPage.find('[data-test="userListItem"]').at(1),
    ];
    expect(items[0].contains('test1@gmail.com')).toBe(true);
    expect(items[1].contains('test2@gmail.com')).toBe(true);
  });

});
