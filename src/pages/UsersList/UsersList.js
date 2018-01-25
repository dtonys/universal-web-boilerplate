import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import List, { ListItem, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
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
            <Typography type="title" gutterBottom>
              Users List
            </Typography>
            <Divider />
            <List>
              { users && users.map((user) => (
                <div data-test="userListItem" key={user.email} >
                  <ListItem button>
                    <ListItemText primary={user.email} />
                    <ListItemText secondary={user.roles && user.roles.join(', ')} />
                  </ListItem>
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
