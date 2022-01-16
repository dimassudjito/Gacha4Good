import React from 'react'

import { Box, Typography, Avatar } from '@mui/material'

const BoxerHead = ({ boxer: { name, hp, power, img, head_img } }) => {
  return (
    <Box>
      <img
        style={{ borderRadius: '100%', border: '5px solid red', width: '15em' }}
        src={head_img}
      />
    </Box>
  )
}

export default BoxerHead
