import React from 'react'
import { Stack } from '@mui/material'

const loaderStyle = {
  border: '6px solid #e0e0e0',
  borderTop: '6px solid #3f51b5',
  borderRadius: '50%',
  width: '40px',
  height: '40px',
  animation: 'spin 1s linear infinite'
}

const keyframesStyle = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`

const Loader = () => {
  return (
    <>
      <style>{keyframesStyle}</style>
      <Stack direction='row' justifyContent='center' alignItems='center' width='100%' height='100%'>
        <div style={loaderStyle} />
      </Stack>
    </>
  )
}

export default Loader
