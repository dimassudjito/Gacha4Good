import React from 'react'

import { Box } from '@mui/material'

import BoxerCard from './BoxerCard'

const ChooseBoxer = ({ boxers }) => {
  return (
    <Box>
      {boxers.map((boxer) => (
        <BoxerCard key={boxer.name} boxer={boxer} />
      ))}
    </Box>
  )
}

export default ChooseBoxer
