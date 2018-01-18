import React, { Component } from 'react';

import Page from 'components/Page/Page';
import PageLayout from 'components/PageLayout/PageLayout';
import styles from 'components/App/App.scss';


class App extends Component {

  componentDidMount() {
    // Remove JSS injected for material UI
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    return (
      <div className={`${styles.app} container`} >
        <PageLayout>
          <Page />
        </PageLayout>
      </div>
    );
  }
}
export default App;
