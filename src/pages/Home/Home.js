import React, { Component } from 'react';
import styles from 'pages/Home/Home.scss';
import PageLayout from 'components/PageLayout/PageLayout';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';


class HomePage extends Component {

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

  render() {
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
              {this.state.count}
            </Typography>
            <Button raised onClick={this.inc} >
              Inc
            </Button>
            <Button raised onClick={this.dec} >
              Dec
            </Button>
          </div>
        </PageLayout>
      </div>
    );
  }
}

export default HomePage;
