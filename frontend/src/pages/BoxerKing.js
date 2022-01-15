import React, { useState } from 'react'

import { Container, Box } from '@mui/material'

// import ChooseBoxer from '../components/boxerKing/ChooseBoxer'

const dummyBoxerData = [
  {
    name: 'Mike Tyson',
    hp: 100,
    power: 25,
    img: 'https://cdn.vox-cdn.com/thumbor/LtQtXYaj-suLI0jKUBLE-Fx2O9s=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/22127884/1288364271.jpg'
  },
  {
    name: 'Manny Pacquiao',
    hp: 95,
    power: 20,
    img: 'https://www.biography.com/.image/t_share/MTg0ODYyNTg1Njg0ODI5MzA0/gettyimages-1163293092.jpg'
  }
]

const BoxerKing = () => {
  const [boxers, setBoxers] = useState(dummyBoxerData)

  return (
    <Box>
      <Container maxWidth="md">
        {/* <ChooseBoxer boxers={dummyBoxerData} /> */}
      </Container>
    </Box>
  )
}

export default BoxerKing
