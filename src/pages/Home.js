import { Box } from '@mui/material'
import React, { useState } from 'react'
import HeroBanner from '../components/HeroBanner'
import SearchExcercises from '../components/SearchExcercises'
import Excercises from '../components/Excercises'
import SearchYouTubeVideos from '../components/SearchYouTubeVideos'

const Home = () => {
    const [exercises, setExercises] = useState([])
    const [bodyPart, setBodyPart] = useState('all')
    console.log(bodyPart)
  return (
    <Box>
        <HeroBanner />
        <SearchExcercises setExercises={setExercises} bodyPart={bodyPart} setBodyPart={setBodyPart}/>
        <Excercises setExercises={setExercises} bodyPart={bodyPart} exercises={exercises}/>
        <SearchYouTubeVideos />
    </Box>
  )
}

export default Home