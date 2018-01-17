import { createMuiTheme } from 'material-ui/styles';
import red from 'material-ui/colors/red';


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
