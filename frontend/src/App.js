import React from 'react'

import BoxerKing from './components/BoxerKing'

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
      <main>
        <BoxerKing />
      </main>
    </ThemeProvider>
  )
}

export default App
