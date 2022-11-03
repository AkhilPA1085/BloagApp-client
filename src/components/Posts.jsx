import { Container, Grid } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import CardComponent from './CardComponent'
import { publicRequest } from '../requestMethods'
import { useDispatch, useSelector } from 'react-redux'
import { getPost } from '../redux/apiCalls'

const Posts = () => {
  const [posts, setPosts] = useState([])
  const dispatch = useDispatch()
  const postsData = useSelector((State)=>State.post.posts)
  useEffect(()=>{
    getPost(dispatch)
  },[dispatch])
  return (
      <Container>
        <Grid container spacing={1} marginTop="20px">
          {postsData.map((post)=>(
            <Grid item xs={12} sm={6} xl={4} lg={4} md={6} key={post._id}>
              <Link className='link' to={`/post/${post._id}`}>
                <CardComponent post={post} key={post.id}/>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
  )
}

export default Posts