import React from 'react'
import {Box, Stack, Typography} from '@mui/material'
import {Link} from 'react-router-dom'
import Logo from '../assets/images/Logo-1.png'

const Footer = () => {
  return (
    <Box mt="80px" bgcolor='#fff3f4'>
      <Stack gap='40px' alignItems='center' px='40px' pt='24px'>
        <Link to='/'><img src={Logo} alt='logo' width='200px' height='40px' /></Link>
        <Typography variant='h5' pb='40px' mt='20px'>
          Made with ❤ by JavaScript Mastery
        </Typography>
      </Stack>
    </Box>
  )
}

export default Footer
