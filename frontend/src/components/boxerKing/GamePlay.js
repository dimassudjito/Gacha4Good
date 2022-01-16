import React, { useState } from 'react'

import { Box, Typography, Card, Button, Grid, CardContent } from '@mui/material'

import BoxerCard from './BoxerCard'
import BoxerHead from './BoxerHead'

const GamePlay = ({ boxers }) => {
  // general card data
  const [p1] = useState(boxers[0])
  const [p2] = useState(boxers[1])
  // gameplay data
  const [p1Game, setP1Game] = useState({ hp: p1.hp, move: null })
  const [p2Game, setP2Game] = useState({ hp: p2.hp, move: null })

  const makeMove = (move) => {
    // update p1Game
    setP1Game({ ...p1Game, move })
    // make move for bot
    setP2Game({ ...p2Game, move: 'scissor' })
    // evaluate game
    let winner = evaluateMove(p1Game.move, p2Game.move)
    // adjust health point
    modifyHp(winner)
  }

  const evaluateMove = (move1, move2) => {
    return 'p1'
  }

  const modifyHp = (winner) => {
    if (winner === 'p1') {
      const newHp = p2Game.hp - p1.power
      setP2Game({ ...p2Game, hp: newHp })
    }
  }

  return (
    <Box>
      <Grid container columnSpacing={1}>
        <Grid item xs={6}>
          <Card>
            <Typography>Player 1 (Human)</Typography>
            <Typography>HP: {p1Game.hp}</Typography>
            <hr />
            <BoxerHead boxer={p1} />
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <Typography>Player 2 (Bot)</Typography>
            <Typography>HP: {p2Game.hp}</Typography>
            <hr />
            <BoxerHead boxer={p2} />
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
