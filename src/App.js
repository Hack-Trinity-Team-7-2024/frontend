import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { blue, deepPurple, purple,} from '@mui/material/colors';
import CssBaseline from '@mui/material/CssBaseline';
import './Styles/App.css';
import Home from './Pages/Home';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: blue,
    secondary: purple,
    background: {
      default: '#091C32',
      paper: deepPurple[900],
    }
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
        <div className="App">
          <Home/>
        </div>
    </ThemeProvider>
  );
}

export default App;
