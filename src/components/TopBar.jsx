import styled from "@emotion/styled";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/apiCalls";
import { logoutUser } from "../redux/userSlice";

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontFamily: theme.fontfamily.fontfamily,
}));

const TopBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const dispatch = useDispatch()
  const user = useSelector(State=>State.user.currentUser.accessToken)
  const userData = useSelector(State=>State.user.currentUser)

  const handleDrawerOpen = () => {
    console.log("drower open");
    setDrawerOpen(!drawerOpen);
  };
  const handleLogout = ()=>{
    dispatch(logoutUser(null))
    window.location.replace("/login")
  }
 


  const drawer = (
    <Box>
      <List sx={{ backgroundColor: "#fff", color: "#428bca" }}>
        <ListItem>
          <StyledTypography>
            <Link className="link" to="/">
              Home
            </Link>
          </StyledTypography>
        </ListItem>
        {user && (
          <ListItem>
            <StyledTypography>
              <Link className="link" to="/myposts">
                Posts
              </Link>
            </StyledTypography>
          </ListItem>
        )}
        <ListItem>
          <StyledTypography>
            <Link className="link" to="/write">
              Write
            </Link>
          </StyledTypography>
        </ListItem>
        <ListItem>
          <StyledTypography>
            <Link className="link" to={`/settings/${userData._id}`}>
              Settings
            </Link>
          </StyledTypography>
        </ListItem>
        <ListItem>
        
          {user ? (
            <StyledTypography onClick={handleLogout}>
              <Link className="link" to="">
                Logout
              </Link>
            </StyledTypography>
          ) : (
            <StyledTypography>
              <Link className="link" to="/login">
                Login
              </Link>
            </StyledTypography>
          )}
        </ListItem>
        <ListItem>
          <Stack direction="row" justifyContent="space-between" spacing={3}>
            <Facebook />
            <Instagram />
            <Twitter />
          </Stack>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        sx={{ backgroundColor: "#fff", color: "#428bca" }}
        position="sticky"
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <StyledTypography
            variant="h4"
            sx={{ display: { xs: "block", sm: "none" } }}
          >
            blog
          </StyledTypography>
          <IconButton
            sx={{ display: { xs: "block", sm: "none" } }}
            onClick={handleDrawerOpen}
          >
            <Avatar src={user.profilepic}/>
          </IconButton>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <List sx={{ display: "flex" }}>
              <ListItem>
                <Facebook />
              </ListItem>
              <ListItem>
                <Instagram />
              </ListItem>
              <ListItem>
                <Twitter />
              </ListItem>
            </List>
          </Box>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <List sx={{ display: "flex" }}>
              <ListItem>
                <StyledTypography>
                  <Link className="link" to="/">
                    Home
                  </Link>
                </StyledTypography>
              </ListItem>
              {user && (
                <ListItem>
                  <StyledTypography>
                    <Link className="link" to="/myposts">
                      Posts
                    </Link>
                  </StyledTypography>
                </ListItem>
              )}
              <ListItem>
                <StyledTypography>
                  <Link className="link" to="/write">
                    Write
                  </Link>
                </StyledTypography>
              </ListItem>
            </List>
          </Box>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <List sx={{ display: "flex", alignItems: "center" }}>
              <ListItem>
                {user ? (
                  <StyledTypography onClick={handleLogout}>
                    <Link className="link" to="">
                      Logout
                    </Link>
                  </StyledTypography>
                ) : (
                  <StyledTypography>
                    <Link className="link" to="/login">
                      Login
                    </Link>
                  </StyledTypography>
                )}
              </ListItem>
              {user ? (
                <ListItem>
                  <Link className="link" to={`/settings/${userData._id}`}>
                    <Avatar src={user.profilepic}/>
                  </Link>
                </ListItem>
              ) : (
                <ListItem>
                  <StyledTypography>
                    <Link className="link" to="/register">
                      Register
                    </Link>
                  </StyledTypography>
                </ListItem>
              )}
            </List>
          </Box>
        </Toolbar>
      </AppBar>

      <Box component="nav">
        <Drawer
          variant="temporary"
          open={drawerOpen}
          onClose={handleDrawerOpen}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box" },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
};

export default TopBar;
