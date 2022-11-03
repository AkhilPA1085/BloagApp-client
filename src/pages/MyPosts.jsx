import styled from '@emotion/styled'
import { Grid, Typography } from '@mui/material'
import React from 'react'
import Posts from '../components/Posts'
import TopBar from '../components/TopBar'

const StyledTypography = styled(Typography)(({theme})=>({
    color:theme.palette.primary.main,
    fontFamily:theme.fontfamily.fontfamily,
    textAlign:"center",
    marginTop:"30px"
}))

const MyPosts = () => {
  return (
    <>
      <TopBar/>
      <StyledTypography variant='h3'>My Blogs</StyledTypography>
        <Grid container>
            <Grid item xs={12}>
                <Posts/>
            </Grid>
        </Grid>
    </>
  )
}

export default MyPosts