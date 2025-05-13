import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import {Box, Typography, Alert, CircularProgress} from '@mui/material'
import {fetchData, exerciseOptions, youtubeOptions} from '../utils/fetchData'
import Detail from '../components/Detail'
import ExerciseVideos from '../components/ExerciseVideos'
import SimilarExercises from '../components/SimilarExercises'
import Loader from '../components/Loader'

const ExcerciseDetail = () => {
  const [exerciseDetails, setExerciseDetails] = useState({})
  const [exerciseVideos, setExerciseVideos] = useState([])
  const [targetMuscleExercises, setTargetMuscleExercisesData] = useState([])
  const [equipmentExercises, setEquipmentExercises] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const {id} = useParams()
  
  useEffect(() =>{
    const fetchExerciseData = async() =>{
      setIsLoading(true)
      setError(null)

      try {
        const exerciseDbUrl = 'https://exercisedb.p.rapidapi.com'
        const youtubeSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com'

        // Fetch exercise details
        const exerciseDetailData = await fetchData(`${exerciseDbUrl}/exercises/exercise/${id}`, exerciseOptions)
        setExerciseDetails(exerciseDetailData)

        // Fetch exercise videos
        try {
          const exerciseVideoData = await fetchData(`${youtubeSearchUrl}/search?query=${exerciseDetailData.name}`, youtubeOptions)
          setExerciseVideos(exerciseVideoData.contents || [])
        } catch (videoError) {
          console.error('Error fetching exercise videos:', videoError)
          // Continue with other fetches even if video fetch fails
          setExerciseVideos([])
        }

        // Fetch target muscle exercises
        try {
          const targetMuscleExercisesData = await fetchData(`${exerciseDbUrl}/exercises/target/${exerciseDetailData.target}`, exerciseOptions)
          setTargetMuscleExercisesData(targetMuscleExercisesData || [])
        } catch (muscleError) {
          console.error('Error fetching target muscle exercises:', muscleError)
          setTargetMuscleExercisesData([])
        }

        // Fetch equipment exercises
        try {
          const equipmentExercisesData = await fetchData(`${exerciseDbUrl}/exercises/equipment/${exerciseDetailData.equipment}`, exerciseOptions)
          setEquipmentExercises(equipmentExercisesData || [])
        } catch (equipmentError) {
          console.error('Error fetching equipment exercises:', equipmentError)
          setEquipmentExercises([])
        }
      } catch (error) {
        console.error('Error fetching exercise data:', error)
        setError('Failed to load exercise details. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchExerciseData()
  }, [id])

  const handleRetry = () => {
    window.location.reload()
  }

  if (isLoading) return <Loader />

  if (error) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5, p: 3 }}>
        <Alert severity="error" sx={{ mb: 2, width: '100%', maxWidth: '600px' }}>
          {error}
        </Alert>
        <Typography variant="body1" sx={{ mb: 2 }}>
          There was a problem loading the exercise details.
        </Typography>
        <button 
          onClick={handleRetry}
          style={{
            backgroundColor: '#FF2625',
            color: '#fff',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Try Again
        </button>
      </Box>
    )
  }

  return (
    <Box>
        <Detail exerciseDetails={exerciseDetails}/>
        <ExerciseVideos exerciseVideos={exerciseVideos} name={exerciseDetails.name}/>
        <SimilarExercises targetMuscleExercises={targetMuscleExercises} equipmentExercises={equipmentExercises} />
    </Box>
  )
}

export default ExcerciseDetail