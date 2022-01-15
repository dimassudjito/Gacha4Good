import React from 'react'
import { Link, BrowserRouter as Router, Route, Routes } from 'react-router-dom'
//import pages
import Coin from './pages/Coin'
import Inventory from './pages/Inventory'
import Marketplace from './pages/Marketplace'
import BoxerKing from './pages/BoxerKing'
import Dashboard from './pages/Dashboard'

import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'

// MUI theme configuration
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
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/coin" element={<Coin />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/boxer-king" element={<BoxerKing />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
