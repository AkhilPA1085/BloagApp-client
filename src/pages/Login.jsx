import { Lock } from "@mui/icons-material";
import React, { useState } from "react";
import CommonButton from "../basic-components/CommonButton";
import CommonInput from "../basic-components/CommonInput";
import { login } from "../redux/apiCalls";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };

  return (
    <>
      <div className="login-page">
        <div className="login-form">
          <h1 className="login-title">LOGIN</h1>
          <form onSubmit={handleSubmit}>
            <CommonInput
              props={{
                placeholder: "username",
                onChange: (e) => setUsername(e.target.value),
              }}
              inputType="outlined"
            />
            <CommonInput
              props={{
                placeholder: "password",
                type: "password",
                onChange: (e) => setPassword(e.target.value),
              }}
              inputType="outlined"
            />
            <CommonButton
              props={{
                type: "submit",
                startIcon: <Lock />,
              }}
              buttonType="filled"
            >
              {"Login"}
            </CommonButton>
            
            <CommonButton props={{ startIcon: <Lock /> }} buttonType="outlined">
             <Link className="link" to="/register"> {"Register"} </Link>
            </CommonButton>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
