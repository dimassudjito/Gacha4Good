import React, { useState } from 'react'

import { Box, Typography, Card, Button, Grid, CardContent } from '@mui/material'

import BoxerCard from './BoxerCard'

const GamePlay = ({ boxers }) => {
  const [p1, setP1] = useState(boxers[0])
  const [p2, setP2] = useState(boxers[1])

  return (
    <Box>
      <Grid container columnSpacing={1}>
        <Grid item xs={6}>
          <Card>
            <Typography>userId1</Typography>
            <Typography>HP: {p1.hp}</Typography>
            <hr />
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <Typography>userId2</Typography>
            <Typography>HP: {p2.hp}</Typography>
            <hr />
          </Card>
        </Grid>
      </Grid>
      <Grid container sx={{ mt: 2 }}>
        <Grid item xs={4}>
          <BoxerCard boxer={p1} />
        </Grid>
        <Grid item xs={4}>
          <Button color="secondary" variant="outlined">
            Rock
          </Button>
          <Button color="secondary" variant="outlined">
            Paper
          </Button>
          <Button color="secondary" variant="outlined">
            Scissor
          </Button>
        </Grid>
        <Grid item xs={4}>
          <BoxerCard boxer={p2} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default GamePlay
