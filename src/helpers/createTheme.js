import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';


export default () => {
  return createMuiTheme({
    palette: {
      primary: {
        main: '#000',
      },
      secondary: {
        main: '#FFF',
      },
      error: {
        main: red[500],
      },
    },
  });
};
