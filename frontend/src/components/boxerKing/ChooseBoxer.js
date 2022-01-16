import React, { useState } from 'react'

import { Box } from '@mui/material'

import BoxerCard from './BoxerCard'

const ChooseBoxer = ({ boxers }) => {
  const [index, setIndex] = useState(0)

  return (
    <Box>
      {boxers.map((boxer) => (
        <BoxerCard key={boxer.name} boxer={boxer} />
      ))}
    </Box>
  )
}

export default ChooseBoxer
