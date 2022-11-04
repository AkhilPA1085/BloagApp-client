import styled from "@emotion/styled";
import { Delete, Edit } from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import CommonButton from "../basic-components/CommonButton";
import CommonInput from "../basic-components/CommonInput";
import CommonTextarea from "../basic-components/CommonTextarea";
import TopBar from "../components/TopBar";
import { deletePost, editPost } from "../redux/apiCalls";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";

const StyledTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 600,
  textTransform: "capitalize",
  textAlign: "center",
  fontFamily: theme.fontfamily.fontfamily,
}));

const StyledDescription = styled(Typography)(({ theme }) => ({
  fontFamily: theme.fontfamily.fontfamily,
}));

const SinglePost = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const user = useSelector((State) => State.user.currentUser);
  const postData = useSelector((State) =>
    State.post.posts.find((postItem) => postItem._id === id)
  );
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [editMod, setEditMod] = useState(false);

  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState([]);

  const handleDelete = (id) => {
    deletePost(id, dispatch);
    navigate("/");
  };

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleCat = (e) => {
    setCategory(e.target.value.split(","));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filename = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, filename);

    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const post = {...inputs,postimage:downloadURL,categories:category}
          editPost(id,post,dispatch)
        });
      }
    );
    navigate("/")
  };
  return (
    <>
      <TopBar />
      <Container>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ paddingTop: "50px" }}>
            <Grid item xs={12}>
              {editMod ? (
                <CommonInput
                  props={{
                    type: "file",
                    onChange: (e) => setFile(e.target.files[0]),
                  }}
                />
              ) : (
                <img
                  src={
                    postData.postimage
                      ? postData.postimage
                      : `https://img.freepik.com/free-photo/web-design-internet-website-responsive-software-concept_53876-124757.jpg?w=900&t=st=1666183748~exp=1666184348~hmac=c4892d2cd99c7203472b0e93928a568d93a7a9a95060329b848ca87ac92c8ef2`
                  }
                  alt=""
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                    maxHeight: "300px",
                  }}
                />
              )}
            </Grid>
            <Grid item xs={12}>
              <Box>
                {user?._id === postData.userId && (
                  <Box sx={{ float: "right" }}>
                    <Edit
                      sx={{ color: "teal", marginRight: "20px" }}
                      onClick={() => setEditMod(true)}
                    />
                    <Delete
                      sx={{ color: "tomato" }}
                      onClick={() => handleDelete(postData._id)}
                    />
                  </Box>
                )}
              </Box>

              {editMod ? (
                <CommonInput
                  props={{
                    name: "categories",
                    placeholder: postData.categories,
                    style: { marginBottom: "20px" },
                    onChange: handleCat,
                  }}
                  inputType="borderBottom"
                />
              ) : (
                <StyledDescription sx={{ textAlign: "center" }}>
                  {postData.categories}
                </StyledDescription>
              )}
              {editMod ? (
                <CommonInput
                  props={{
                    name: "title",
                    placeholder: postData.title,
                    style: { marginBottom: "20px" },
                    onChange: handleChange,
                  }}
                  inputType="borderBottom"
                />
              ) : (
                <StyledTitle variant="h4">{postData.title}</StyledTitle>
              )}

              {editMod ? (
                <CommonTextarea
                  props={{
                    name: "description",
                    placeholder: postData.description,
                    style: { marginBottom: "20px" },
                    onChange: handleChange,
                  }}
                  inputType="borderBottom"
                />
              ) : (
                <StyledDescription sx={{ marginTop: "60px" }}>
                  {postData.description}
                </StyledDescription>
              )}
              {user?._id === postData.userId &&(<CommonButton
                props={{
                  type: "submit",
                  sx: { float: "right", marginTop: "30px" },
                }}
                buttonType="filled"
              >
                Update
              </CommonButton>)}
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
};

export default SinglePost;
