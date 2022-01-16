import React from 'react'

import { Box, Button, Typography } from '@mui/material'

const BoxerHead = ({ boxer: { name, head_img } }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box>
        <img
          style={{
            borderRadius: '100%',
            border: '5px solid red',
            width: '15em',
            height: '15em'
          }}
          src={head_img}
          alt={name}
        />
      </Box>
    </Box>
  )
}

export default BoxerHead
