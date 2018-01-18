import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from 'pages/Home/Home.scss';
import PageLayout from 'components/PageLayout/PageLayout';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { connect } from 'react-redux';
import {
  INCREMENT_COUNTER,
  DECREMENT_COUNTER,
  INCREMENT_COUNTER_ASYNC,
  DECREMENT_COUNTER_ASYNC,
  LOAD_DATA_REQUESTED,
} from 'redux/counter/actions';


@connect(
  (state) => ({
    count: state.counter.count,
    posts: state.counter.posts,
  })
)
class HomePage extends Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
    posts: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  inc = () => {
    this.setState({
      count: this.state.count + 1,
    });
  }

  dec = () => {
    this.setState({
      count: this.state.count - 1,
    });
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
    } = this.props;

    return (
      <div className={`${styles.homePage} grey lighten-3`} >
        <PageLayout>
          <div className={ styles.wrap } >
            <Typography type="display2" color="primary" gutterBottom >
              Welcome to the home page
            </Typography>
            <Typography type="display1" color="primary" gutterBottom >
              <a href="/signup" >
                Sign up to get started
              </a>
            </Typography>
            <Typography type="body1" color="primary" gutterBottom >
              {count}
            </Typography>
            <Button raised onClick={this._inc} >
              Inc
            </Button>
            <Button raised onClick={this._dec} >
              Dec
            </Button>
            <Button raised onClick={this._incAsync} >
              Inc Async
            </Button>
            <Button raised onClick={this._decAsync} >
              Dec Async
            </Button>
            <Button raised onClick={this.loadData} >
              Load Data
            </Button>
            <div>
              {JSON.stringify(posts)}
            </div>
          </div>
        </PageLayout>
      </div>
    );
  }
}

export default HomePage;
