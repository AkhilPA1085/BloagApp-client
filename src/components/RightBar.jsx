import styled from "@emotion/styled";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Box, List, ListItem, Typography } from "@mui/material";
import React from "react";

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontFamily: theme.fontfamily.fontfamily,
  textAlign: "center",
  color: theme.palette.secondary.main,
  textTransform: "uppercase",
  fontWeight: 600,
  letterSpacing: "2px",
}))
  

const RightBar = () => {
  return (
    <Box
      bgcolor="#F5F8FA"
      flex={3}
      p={3}
      sx={{ display: { xs:"none",sm: "none", md: "block" } }}
    >
      <Box>
        <List>
          <StyledTypography>About</StyledTypography>
          <ListItem>
            <img
              src="https://i0.wp.com/www.followchain.org/wp-content/uploads/2022/03/Music-Equalizer_40.png?fit=640%2C480&ssl=1"
              alt="" style={{height:"40vh"}}/>
          </ListItem>

          <ListItem sx={{display:"flex",flexDirection:"column"}}>
              <StyledTypography>Categories</StyledTypography>
            <Box sx={{columnCount:3}}>
              <ListItem>Life</ListItem>
              <ListItem>Tech</ListItem>
              <ListItem>Write</ListItem>
              <ListItem>Sport</ListItem>
              <ListItem>Art</ListItem>
              <ListItem>Books</ListItem>
            </Box>
          </ListItem>

          <ListItem sx={{display:"flex",flexDirection:"column"}}>
            <StyledTypography>Social</StyledTypography>
            <ListItem sx={{display:'flex',alignItems:'center',justifyContent:'center',gap:'20px'}}>
              <Facebook/>
              <Instagram/>
              <Twitter/>
            </ListItem>
          </ListItem>

        </List>
      </Box>
    </Box>
  );
};

export default RightBar;
