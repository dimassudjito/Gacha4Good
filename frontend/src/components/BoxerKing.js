import React from 'react'

import { Container, Box } from '@mui/material'

import ChooseBoxer from './boxerKing/ChooseBoxer'

const BoxerKing = () => {
  return (
    <Box>
      <Container maxWidth="md">
        <ChooseBoxer />
      </Container>
    </Box>
  )
}

export default BoxerKing
