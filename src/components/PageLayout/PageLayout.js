import React from 'react';
import PropTypes from 'prop-types';
import styles from 'components/PageLayout/PageLayout.scss';
import Navbar from 'components/Navbar/Navbar';


const PageLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className={styles.pageContent} >
        {children}
      </div>
    </div>
  );
};
PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageLayout;
