import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import {Box} from '@mui/material'
import {fetchData, exerciseOptions, youtubeOptions} from '../utils/fetchData'
import Detail from '../components/Detail'
import ExerciseVideos from '../components/ExerciseVideos'
import SimilarExercises from '../components/SimilarExercises'

const ExcerciseDetail = () => {
  const [exerciseDetails, setExerciseDetails] = useState({})
  const [exerciseVideos, setExerciseVideos] = useState([])
  const [targetMuscleExercises, setTargetMuscleExercisesData] = useState([])
  const [equipmentExercises, setEquipmentExercises] = useState([])
  const {id} = useParams()
  
  useEffect(() =>{
    const fetchExerciseData = async() =>{
    const exerciseDbUrl = 'https://exercisedb.p.rapidapi.com'
    const youtubeSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com'

    const exerciseDetailData = await fetchData(`${exerciseDbUrl}/exercises/exercise/${id}`, exerciseOptions)
    setExerciseDetails(exerciseDetailData)
    const exerciseVideoData = await fetchData(`${youtubeSearchUrl}/search?query=${exerciseDetailData.name}`, youtubeOptions)
    setExerciseVideos(exerciseVideoData.contents)
    const targetMuscleExercisesData = await fetchData(`${exerciseDbUrl}/exercises/target/${exerciseDetailData.target}`, exerciseOptions)
    setTargetMuscleExercisesData(targetMuscleExercisesData)
    const equipmentExercisesData = await fetchData(`${exerciseDbUrl}/exercises/equipment/${exerciseDetailData.equipment}`, exerciseOptions)
      setEquipmentExercises(equipmentExercisesData)
  }
    fetchExerciseData()
  }, [id])
  return (
    <Box>
        <Detail exerciseDetails={exerciseDetails}/>
        <ExerciseVideos exerciseVideos={exerciseVideos} name={exerciseDetails.name}/>
        <SimilarExercises targetMuscleExercises={targetMuscleExercises}equipmentExercises={equipmentExercises} />
    </Box>
  )
}

export default ExcerciseDetail
