import React, { useState } from 'react'

import { Box, Typography, Card, Button } from '@mui/material'

const GamePlay = () => {
  const [P1Move, setP1Move] = useState(null)
  const [P2Move, setP2Move] = useState(null)
  const [P1IsChoosing, setP1IsChoosing] = useState(true)
  const [P2IsChoosing, setP2IsChoosing] = useState(true)

  const makeP1Move = (move) => {
    setP1Move(move)
    setP1IsChoosing(false)
  }

  const makeP2Move = (move) => {
    setP2Move(move)
    setP2IsChoosing(false)
  }

  return (
    <Box>
      {/* <Card sx={{ mb: 2 }}>
        <Typography>Debugging station</Typography>
        <Typography>Player 1: {P1Move}</Typography>
        <Typography>Player 2: {P2Move}</Typography>
      </Card> */}
      <Card sx={{ mb: 2 }}>
        {P1Move.length === null || P1IsChoosing || P2IsChoosing ? (
          <Typography>Make your move!</Typography>
        ) : (
          <Box>
            P1 ({P1Move}) Vs. P2 ({P2Move})
          </Box>
        )}
      </Card>
      <Card sx={{ mb: 2 }}>
        <Typography>Player 1</Typography>
        <Button
          onClick={() => {
            makeP1Move('rock')
          }}
        >
          Rock
        </Button>
        <Button
          onClick={() => {
            makeP1Move('paper')
          }}
        >
          Paper
        </Button>
        <Button
          onClick={() => {
            makeP1Move('scissor')
          }}
        >
          Scissor
        </Button>
        <Button onClick={() => setP1IsChoosing(true)}>Continue</Button>
      </Card>
      <Card>
        <Typography>Player 2</Typography>
        <Button
          onClick={() => {
            makeP2Move('rock')
          }}
        >
          Rock
        </Button>
        <Button
          onClick={() => {
            makeP2Move('paper')
          }}
        >
          Paper
        </Button>
        <Button
          onClick={() => {
            makeP2Move('scissor')
          }}
        >
          Scissor
        </Button>
        <Button onClick={() => setP2IsChoosing(true)}>Continue</Button>
      </Card>
    </Box>
  )
}

export default GamePlay
