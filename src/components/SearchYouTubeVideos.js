import React, { useState } from 'react'
import { Stack, Box, Typography, Button, TextField } from '@mui/material'
import { youtubeOptions, fetchData } from '../utils/fetchData'
import Loader from './Loader'

const SearchYouTubeVideos = () => {
  const [search, setSearch] = useState('')
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    if (search) {
      setLoading(true)
      const youtubeSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com'
      const videosData = await fetchData(`${youtubeSearchUrl}/search?query=${search} exercise`, youtubeOptions)
      setVideos(videosData.contents)
      setLoading(false)
    }
  }

  return (
    <Stack alignItems='center' mt='37px' justifyContent='center' p='20px'>
      <Typography fontWeight={700} sx={{ fontSize: { lg: '44px', xs: '30px' } }} mb='50px' textAlign='center'>
        Search for Exercise <br />
        Videos
      </Typography>
      <Box position='relative' mb='72px'>
        <TextField
          sx={{
            input: {
              fontWeight: '700',
              border: 'none',
              borderRadius: '4px'
            },
            width: { lg: '800px', xs: '350px' },
            backgroundColor: '#fff',
            borderRadius: '40px'
          }}
          height='76px'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search for exercise videos...'
          type='text'
        />
        <Button
          className='search-btn'
          sx={{
            bgcolor: '#FF2625',
            color: '#fff',
            textTransform: 'none',
            width: { lg: '175px', xs: '80px' },
            fontSize: { lg: '20px', xs: '14px' },
            height: '56px',
            position: 'absolute',
            right: '0'
          }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>

      {loading ? (
        <Loader />
      ) : (
        <Box sx={{ marginTop: { lg: '50px', xs: '20px' } }} p='20px'>
          {videos.length > 0 && (
            <Typography variant='h3' mb='33px'>
              Search Results
            </Typography>
          )}
          <Stack
            justifyContent='flex-start'
            flexWrap='wrap'
            alignItems='center'
            sx={{
              flexDirection: { lg: 'row' },
              gap: { lg: '110px', xs: '0' }
            }}
          >
            {videos?.slice(0, 9).map((item, index) => (
              <a
                key={index}
                className='exercise-video'
                href={`https://www.youtube.com/watch?v=${item.video.videoId}`}
                target='_blank'
                rel='noreferrer'
              >
                <img src={item.video.thumbnails[0].url} alt={item.video.title} />
                <Box>
                  <Typography variant='h5' color='#000'>
                    {item.video.title}
                  </Typography>
                  <Typography variant='h6' color='#000'>
                    {item.video.channelName}
                  </Typography>
                </Box>
              </a>
            ))}
          </Stack>
        </Box>
      )}
    </Stack>
  )
}

export default SearchYouTubeVideos