import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Link from 'redux-first-router-link';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {
  extractUsersState,
} from 'redux/user/reducer';
import Loading from 'components/Loading/Loading';


@connect(
  (globalState) => ({
    users: extractUsersState(globalState),
  })
)
class UsersList extends Component {
  static propTypes = {
    users: PropTypes.object.isRequired,
  };

  render() {
    const {
      users,
    } = this.props.users;

    return (
      <div>
        { !users &&
          <Loading />
        }
        { users &&
          <div>
            <Typography variant="title" gutterBottom>
              Users List
            </Typography>
            <Divider />
            <List>
              { users && users.map((user) => (
                <div data-test="userListItem" key={user.email} >
                  <Link to={`/users/${user._id}`}>
                    <ListItem button>
                      <ListItemText primary={user.email} />
                      <ListItemText secondary={user.roles && user.roles.join(', ')} />
                    </ListItem>
                  </Link>
                  <Divider />
                </div>
              ))}
            </List>
          </div>
        }
      </div>
    );
  }
}

export default UsersList;
