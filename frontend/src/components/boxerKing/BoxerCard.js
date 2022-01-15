import React from 'react'

import { Card, CardMedia, CardContent, Typography } from '@mui/material'

const BoxerCard = () => {
  return (
    <Card sx={{ width: '10em' }}>
      <CardMedia
        component="img"
        image="https://cdn.vox-cdn.com/thumbor/LtQtXYaj-suLI0jKUBLE-Fx2O9s=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/22127884/1288364271.jpg"
      />
      <CardContent>
        <Typography>Mike Tyson</Typography>
        <Typography>HP: 100</Typography>
        <Typography>Power: 25</Typography>
      </CardContent>
    </Card>
  )
}

export default BoxerCard
