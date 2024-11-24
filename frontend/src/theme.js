// theme.js
import { createTheme } from '@mui/material/styles';
import TUFont from './assets/Fonts/TUFont-bold.ttf';

const thammasat = {
  fontFamily: 'Thammasat',
  fontStyle: 'Bold',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('Thammasat'),
    local('Thammasat-Bold'),
    url(${TUFont}) format('truetype')
  `,
  unicodeRange:
    'UTF-8',  
};

const theme = createTheme({
  palette: {
    primary: {
      main: '#902923',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography:{
    fontFamily: 'Thammasat, bold',
    fontWeightBold: 800,
    fontStyle: 'bold',

  },
  
});

export default theme;