import React from 'react';
import PageLayout from 'components/PageLayout/PageLayout';
import Typography from 'material-ui/Typography';


const NotFoundPage = () => {
  return (
    <PageLayout>
      <Typography align="center" type="display2" color="primary" gutterBottom >
        Page Not Found
      </Typography>
    </PageLayout>
  );
};

export default NotFoundPage;
