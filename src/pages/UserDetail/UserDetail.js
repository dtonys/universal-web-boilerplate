import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  extractUserById,
  extractUsersState,
} from 'redux/user/reducer';
import { ROUTE_USER_DETAIL_TAB } from 'redux/routesMap';
import Typography from 'material-ui/Typography';
import Tabs, { Tab } from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';
import Loading from 'components/Loading/Loading';


@connect(
  (globalState) => ({
    users: extractUsersState(globalState),
    userDetail: extractUserById(globalState, globalState.location.payload.id ),
    tabValue: globalState.location.payload.tab || false,
  })
)
class UserDetail extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    userDetail: PropTypes.object.isRequired,
    users: PropTypes.array.isRequired,
    tabValue: PropTypes.oneOf([
      'id', 'email', 'roles', false,
    ]).isRequired,
  }

  onTabChange = ( event, tabValue ) => {
    const {
      dispatch,
      userDetail,
    } = this.props;
    dispatch({
      type: ROUTE_USER_DETAIL_TAB,
      payload: {
        id: userDetail._id,
        tab: tabValue,
      },
    });
  }

  render() {
    const {
      userDetail,
      users,
      tabValue,
    } = this.props;

    return (
      <div>
        { !users &&
          <Loading />
        }
        { users &&
          <div>
            <Typography type="title" gutterBottom>
              User Detail
            </Typography>
            <br />
            <Paper style={{ wordWrap: 'break-word', padding: 10 }} >
              { JSON.stringify(userDetail) }
            </Paper>
            <br />
            <Tabs
              value={tabValue}
              onChange={this.onTabChange}
              indicatorColor="primary"
              textColor="primary"
              fullWidth
            >
              <Tab label="Id" value="id" />
              <Tab label="Email" value="email" />
              <Tab label="Roles" value="roles" />
            </Tabs>
            {tabValue === 'id' && <div><br />{userDetail._id}</div>}
            {tabValue === 'email' && <div><br />{userDetail.email}</div>}
            {tabValue === 'roles' && <div><br />{userDetail.roles.join(', ')}</div>}
          </div>
        }
      </div>
    );
  }
}

export default UserDetail;
