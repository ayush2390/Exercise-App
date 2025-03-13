import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import axios from 'axios';
import Detail from '../components/Detail';
import ExerciseVideos from '../components/ExerciseVideos';
import SimilarExercises from '../components/SimilarExercises';

const exerciseOptions = {
  headers: {
    'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY',
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
  },
};

const youtubeOptions = {
  headers: {
    'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY',
    'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com',
  },
};

const ExcerciseDetail = () => {
  const [exerciseDetails, setExerciseDetails] = useState({});
  const [exerciseVideos, setExerciseVideos] = useState([]);
  const [targetMuscleExercises, setTargetMuscleExercisesData] = useState([]);
  const [equipmentExercises, setEquipmentExercises] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchExerciseData = async () => {
      try {
        const exerciseDbUrl = 'https://exercisedb.p.rapidapi.com';
        const youtubeSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com';

        // Fetch exercise details
        const { data: exerciseDetailData } = await axios.get(`${exerciseDbUrl}/exercises/exercise/${id}`, exerciseOptions);
        setExerciseDetails(exerciseDetailData);

        // Fetch exercise videos
        const { data: exerciseVideoData } = await axios.get(`${youtubeSearchUrl}/search?query=${exerciseDetailData.name}`, youtubeOptions);
        setExerciseVideos(exerciseVideoData.contents);

        // Fetch similar exercises (target muscle)
        const { data: targetMuscleExercisesData } = await axios.get(`${exerciseDbUrl}/exercises/target/${exerciseDetailData.target}`, exerciseOptions);
        setTargetMuscleExercisesData(targetMuscleExercisesData);

        // Fetch similar exercises (equipment)
        const { data: equipmentExercisesData } = await axios.get(`${exerciseDbUrl}/exercises/equipment/${exerciseDetailData.equipment}`, exerciseOptions);
        setEquipmentExercises(equipmentExercisesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchExerciseData();
  }, [id]);

  return (
    <Box>
      <Detail exerciseDetails={exerciseDetails} />
      <ExerciseVideos exerciseVideos={exerciseVideos} name={exerciseDetails.name} />
      <SimilarExercises targetMuscleExercises={targetMuscleExercises} equipmentExercises={equipmentExercises} />
    </Box>
  );
};

export default ExcerciseDetail;
