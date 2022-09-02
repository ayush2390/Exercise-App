import React from 'react'
import {Stack, Box, Typography, Button} from '@mui/material'
import HeroBannerImage from '../assets/images/banner.png'


const HeroBanner = () => {
  return (
    <Box sx={{
        mt: {lg: '212px', xs: '70px'},
        ml: {sm: '50px'}
    } } position='relative' p='20px'>
        <Typography color= '#FF2625' fontWeight='600' fontSize='26px'>
            Fitness Club
        </Typography>
        <Typography fontWeight={700} sx={{fontSize: {lg :'44px', xs: '40px'}}} mb='23px' mt='30px'>
            Sweat, Smile <br /> and Repeat 
        </Typography>
        <Typography fontSize='22px' lineHeight='35px' mb={4}>
            Check out the most effective excercises 
        </Typography>
        <Typography fontWeight={600} color='#ff2625' sx={{
            opacity: 0.1,
            display: {lg: 'block', sm: 'none'}
        }} fontSize='200px'>Excercises</Typography>
        <Button variant='contained' color='error'
        href='#excercises' sx={{backgroundColor: '#ff2625', padding: '10px'}}>Explore Excercises</Button>
        <img src={HeroBannerImage} alt='banner' className='hero-banner-img' />
    </Box>
  )
}

export default HeroBanner
