import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//import pages
import Dashboard from './pages/Dashboard';
// MUI theme configuration
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'
const theme = createTheme({
  palette: {
    primary: {
      main: '#26354A'
    },
    secondary: {
      main: '#ffffff'
    },
    background: {
      default: '#26354A'
    }
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Dashboard />
    </ThemeProvider>
  )
}

export default App
