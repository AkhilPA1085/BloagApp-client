import {  AddPhotoAlternate, Send } from "@mui/icons-material";
import {Grid, } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { useState } from "react";
import CommonButton from "../basic-components/CommonButton";
import CommonInput from "../basic-components/CommonInput";
import TopBar from "../components/TopBar";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useSelector } from "react-redux";

const Settings = () => {
  const user = useSelector((State)=>State.user.currentUser)
  const [inputs, setInputs] = useState({})
  const [file,setFile] = useState(null)
  
  const handleChange = (e) =>{
    setInputs((prev)=>{
      return{
        ...prev,[e.target.name]:e.target.value
      }
    })
  }

  const handleSubmit = (e) =>{
    e.preventDefault()

  }
  return (
    <>
      <TopBar />
      <Container>
        <Grid container spacing={2} sx={{ paddingTop: "50px" }}>
          <Grid item xs={12}>
            <form onSubmit={handleSubmit}>
              <img
                src={file? URL.createObjectURL(file):user.profilepic}
                alt=""
                style={{
                  height: "50px",
                  width: "50px",
                  objectFit: "cover",
                  borderRadius:"50%",
                  marginRight:"20px",
                  marginBottom: "20px"
                }}
              />
              <label htmlFor="settings-file">
                <AddPhotoAlternate sx={{marginBottom:"20px"}} />
              </label>
              <CommonInput
                props={{
                  id: "settings-file",
                  type: "file",
                  style: { display: "none", marginBottom: "20px" },
                  onChange:(e)=>setFile(e.target.files[0])
                }}
              />

              <CommonInput
                props={{
                  placeholder: "Username",
                  name:"username",
                  style: { marginBottom: "20px" },
                  onChange:handleChange
                }}
                inputType="outlined"
              />

              <CommonInput
                props={{
                  placeholder: "Email",
                  name:"email",
                  type:"email",
                  style: { marginBottom: "20px" },
                  onChange:handleChange
                }}
                inputType="outlined"
              />

              <CommonInput
                props={{
                  placeholder: "Password",
                  name:"password",
                  type:"password",
                  style: { marginBottom: "20px" },
                  onChange:handleChange
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
                Update
              </CommonButton>
            </form>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Settings;
