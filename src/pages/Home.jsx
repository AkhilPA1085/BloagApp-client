import { Stack } from '@mui/system'
import React from 'react'
import Posts from '../components/Posts'
import RightBar from '../components/RightBar'
import TopBar from '../components/TopBar'

const Home = () => {
  return (
    <>
      <TopBar/>
      <Stack direction="row" justifyContent='space-between'>
        <Posts/>
        <RightBar/>
      </Stack>
    </>
  )
}

export default Home