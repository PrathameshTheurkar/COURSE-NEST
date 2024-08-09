import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';

// const darkTheme = createTheme({
//   palette: {
//     mode: 'dark',
//     // primary: {
//     //   main: '#121212'
//     // }
//     background: {
//       paper: '#000'
//     }
//   }
// })

const theme = createTheme({
  palette: {
    primary: {
      main: '#e3f2fd'
    }
  }
})


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
  </React.StrictMode>,
)
