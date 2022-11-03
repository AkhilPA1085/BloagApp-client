import { Image, Send } from "@mui/icons-material";
import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { useState } from "react";
import CommonButton from "../basic-components/CommonButton";
import CommonInput from "../basic-components/CommonInput";
import CommonTextarea from "../basic-components/CommonTextarea";
import TopBar from "../components/TopBar";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import { createPost } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const Write = () => {
  const [inputs,setInputs] = useState({})
  const [file,setFile] = useState(null)
  const [category,setCategory] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userId = useSelector((State)=>State.user.currentUser._id)
  const username = useSelector((State)=>State.user.currentUser.username)

  const handleChange = (e)=>{
    setInputs((prev)=>{return{
      ...prev,[e.target.name]:e.target.value
    }})
  }
  const handleCat = (e) =>{
    setCategory(e.target.value.split(","))
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    const filename = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage,filename)

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
          const post = {...inputs,postimage:downloadURL,categories:category,userId:userId,username:username}
          createPost(post,dispatch)
        });
      }
    );
    navigate("/")

  }
  return (
    <>
      <TopBar />
      <Container>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{ paddingTop: "50px" }}>
          <Grid item xs={12}>

            <img
              src={file ? URL.createObjectURL(file):`https://img.freepik.com/free-photo/web-design-internet-website-responsive-software-concept_53876-124757.jpg?w=900&t=st=1666183748~exp=1666184348~hmac=c4892d2cd99c7203472b0e93928a568d93a7a9a95060329b848ca87ac92c8ef2`}
              alt=""
              style={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
                maxHeight: "300px",
              }}
            />
          </Grid>
          <Grid item xs={12}>
           
              <label htmlFor="write-file">
                <Image />
              </label>
              <CommonInput
                props={{
                  id: "write-file",
                  type: "file",
                  style: { display: "none", marginBottom: "20px" },
                  onChange:e=>setFile(e.target.files[0])
                }}
              />

              <CommonInput
                props={{
                  placeholder: "Title",
                  name:"title",
                  style: { marginBottom: "20px" },
                  onChange:handleChange
                }}
                inputType="outlined"
              />

              <CommonTextarea
                props={{
                  placeholder: "Description",
                  name:"description",
                  style: { marginBottom: "20px" },
                  onChange:handleChange
                }}
                inputType="outlined"
              />

              <CommonInput
                props={{
                  placeholder: "Categories",
                  name:"categories",
                  style: { marginBottom: "20px" },
                  onChange:handleCat
                }}
                inputType="outlined"
              />

              <CommonButton
                props={{
                  type: "submit",
                  endIcon: <Send />,
                  style: { marginBottom: "20px", float: "right" },
                }}
                buttonType="filled"
              >
                Upload
              </CommonButton>
          </Grid>
        </Grid>
        </form>
      </Container>
    </>
  );
};

export default Write;
