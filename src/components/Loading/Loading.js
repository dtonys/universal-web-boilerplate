import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';


const Loading = () => (
  <CircularProgress style={{
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -20,
    marginLeft: -20,
  }} />
);

export default Loading;
