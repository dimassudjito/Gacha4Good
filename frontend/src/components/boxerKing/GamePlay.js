import React, { useState } from 'react'

import { Box, Typography, Card, Button, Grid } from '@mui/material'

import BoxerCard from './BoxerCard'
import BoxerHead from './BoxerHead'

const GamePlay = ({ boxers }) => {
  // general card data
  const [p1] = useState(boxers[0])
  const [p2] = useState(boxers[1])
  // gameplay data
  const [p1Move, setP1Move] = useState(null)
  const [p2Move, setP2Move] = useState(null)
  const [p1Hp, setP1Hp] = useState(p1.hp)
  const [p2Hp, setP2Hp] = useState(p2.hp)

  const makeMove = (move) => {
    // update p1Move
    setP1Move(move)
    // make move for bot
    setP2Move('paper')
    // evaluate game
    let winner = evaluateMove(p1Move, p2Move)
    // adjust health point
    modifyHp(winner)
  }

  const evaluateMove = (move1, move2) => {
    return 'p1'
  }

  const modifyHp = (winner) => {
    if (winner === 'p1') {
      setP2Hp(p2Hp - p1.power)
    }
  }

  return (
    <Box>
      <Grid container columnSpacing={1}>
        <Grid item xs={6}>
          <Card>
            <Typography>Player 1 (Human)</Typography>
            <Typography>HP: {p1Hp}</Typography>
            <hr />
            <BoxerHead boxer={p1} />
            <Typography>{p1Move}</Typography>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <Typography>Player 2 (Bot)</Typography>
            <Typography>HP: {p2Hp}</Typography>
            <hr />
            <BoxerHead boxer={p2} />
            <Typography>{p2Move}</Typography>
          </Card>
        </Grid>
      </Grid>
      <Grid container sx={{ mt: 2 }}>
        <Grid item xs={4}>
          <BoxerCard boxer={p1} />
        </Grid>
        <Grid item xs={4}>
          <Button
            color="secondary"
            variant="outlined"
            onClick={() => {
              makeMove('rock')
            }}
          >
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
