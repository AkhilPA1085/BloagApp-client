

import CommonButton from "../basic-components/CommonButton";
import CommonInput from "../basic-components/CommonInput";
import { Lock } from "@mui/icons-material";
import { publicRequest } from "../requestMethods";
import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [error, setError] = useState(false);


  const handleSubmit = async (e) => {
  e.preventDefault()
  if(password !== cpassword){
    setError(true)
  }else{
      try {
        const res = await publicRequest.post("/auth/register", {
          username,
          email,
          password,
        });
        res.data && window.location.replace("/login");
      } catch (err) {}

    }
  };
  

  return (
    <>
      <div className="register-page">
        <div className="register-form">
          <h1 className="register-title">REGISTER</h1>

          <form onSubmit={handleSubmit}>
            <CommonInput
              props={{
                placeholder: "username",
                name: "username",
                onChange: (e) => setUsername(e.target.value),
              }}
              inputType="outlined"
            />

            <CommonInput
              props={{
                placeholder: "email",
                type: "email",
                name: "email",
                onChange: (e) => setEmail(e.target.value),
              }}
              inputType="outlined"
            />

            <CommonInput
              props={{
                placeholder: "password",
                type: "password",
                name: "password",
                onChange: (e) => setPassword(e.target.value),
              }}
              inputType="outlined"
            />

            <CommonInput
              props={{
                placeholder: "confirm password",
                type: "password",
                name: "confirmPassword",
                onChange: (e) => setCPassword(e.target.value)
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
              {"Register"}
            </CommonButton>

            <CommonButton props={{ startIcon: <Lock /> }} buttonType="outlined">
              <Link className="link" to="/login">
                {"Login"}
              </Link>
            </CommonButton>
            {error &&  
            <p style={{ color: "tomato" }}>
              passwords doesnot matches
            </p>}
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
