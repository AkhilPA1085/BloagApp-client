import styled from "@emotion/styled";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";

const StyledDescription = styled(Typography)`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  font-family: "'Kumbh Sans', sans-serif;";
`;
const StyledCategory = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  textTransform: "capitalize",
  fontWeight: "bold",
  fontFamily: theme.fontfamily.fontfamily,
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  color: theme.palette.primary.main,
  fontWeight: 600,
  fontFamily: theme.fontfamily.fontfamily,
}));

const CardComponent = ({ post }) => {
  return (
    <Card sx={{ color: "#7F8D99" }}>
      <CardMedia
        component="img"
        height="140"
        image={
          post.postimage
            ? post.postimage
            : `https://img.freepik.com/free-photo/web-design-internet-website-responsive-software-concept_53876-124757.jpg?w=900&t=st=1666183748~exp=1666184348~hmac=c4892d2cd99c7203472b0e93928a568d93a7a9a95060329b848ca87ac92c8ef2`
        }
      />
      <CardContent>
        <StyledCategory>{post.categories[0]}</StyledCategory>
        <StyledTitle variant="h5">{post.title}</StyledTitle>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <StyledCategory>
            Author: <span style={{ color: "#7F8D99" }}> {post.username}</span>
          </StyledCategory>
          <Typography sx={{ fontSize: "10px" }}>
            {new Date(post.createdAt).toDateString()}
          </Typography>
        </Box>
        <StyledDescription>{post.description}</StyledDescription>
      </CardContent>
    </Card>
  );
};

export default CardComponent;
