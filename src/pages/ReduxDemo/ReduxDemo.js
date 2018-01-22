import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from 'pages/ReduxDemo/ReduxDemo.scss';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import { CircularProgress } from 'material-ui/Progress';
import { connect } from 'react-redux';
import {
  INCREMENT_COUNTER,
  DECREMENT_COUNTER,
  INCREMENT_COUNTER_ASYNC,
  DECREMENT_COUNTER_ASYNC,
  LOAD_DATA_REQUESTED,
} from 'redux/demo/actions';


const CounterView = ({
  _inc,
  _dec,
  _incAsync,
  _decAsync,
  count,
}) => {
  return (
    <Paper className={styles.column} >
      <Typography type="headline" color="primary" gutterBottom >
        Count: {count}
      </Typography>
      <span style={{ marginRight: 10, marginBottom: 10 }} ></span>
      <Button raised onClick={_inc} >
        Inc
      </Button>
      <span style={{ marginRight: 10, marginBottom: 10 }} ></span>
      <Button raised onClick={_dec} >
        Dec
      </Button>
      <span style={{ marginRight: 10, marginBottom: 10 }} ></span>
      <Button raised onClick={_incAsync} >
        Inc Async
      </Button>
      <span style={{ marginRight: 10, marginBottom: 10 }} ></span>
      <Button raised onClick={_decAsync} >
        Dec Async
      </Button>
    </Paper>
  );
};
CounterView.propTypes = {
  _inc: PropTypes.func.isRequired,
  _dec: PropTypes.func.isRequired,
  _incAsync: PropTypes.func.isRequired,
  _decAsync: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
};


const LoadDataView = ({
  loadData,
  posts,
  postsLoading,
}) => {
  return (
    <Paper className={styles.column}>
      <Button raised onClick={loadData} >
        Load Data
      </Button>
      <div style={{ marginBottom: 10 }} ></div>
      { postsLoading &&
        <div>
          <CircularProgress />
        </div>
      }
      { !postsLoading &&
        <div>
          {JSON.stringify(posts)}
        </div>
      }
    </Paper>
  );
};
LoadDataView.propTypes = {
  loadData: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
  postsLoading: PropTypes.bool.isRequired,
};

@connect(
  (globalState) => ({
    count: globalState.demo.count,
    posts: globalState.demo.posts,
    postsLoading: globalState.demo.postsLoading,
  })
)
class ReduxDemo extends Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
    posts: PropTypes.array.isRequired,
    postsLoading: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  _inc = () => {
    this.props.dispatch({ type: INCREMENT_COUNTER });
  }

  _dec = () => {
    this.props.dispatch({ type: DECREMENT_COUNTER });
  }

  _incAsync = () => {
    this.props.dispatch({ type: INCREMENT_COUNTER_ASYNC });
  }

  _decAsync = () => {
    this.props.dispatch({ type: DECREMENT_COUNTER_ASYNC });
  }

  loadData = () => {
    this.props.dispatch({ type: LOAD_DATA_REQUESTED });
  }

  render() {
    const {
      count,
      posts,
      postsLoading,
    } = this.props;

    return (
      <div className={ styles.wrap } >
        <Typography type="display2" color="primary" gutterBottom >
          Redux Demo Page
        </Typography>
        <Typography type="display1" color="primary" gutterBottom >
          Click the buttons below to change the state
        </Typography>
        <br />
        <Grid container>
          <Grid item xs>
            <CounterView
              _inc={this._inc}
              _dec={this._dec}
              _incAsync={this._incAsync}
              _decAsync={this._decAsync}
              count={count}
            />
          </Grid>
          <Grid item xs>
            <LoadDataView
              loadData={this.loadData}
              posts={posts}
              postsLoading={postsLoading}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default ReduxDemo;
