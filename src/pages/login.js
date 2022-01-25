import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
//import { Button } from "react-bootstrap"; first commit removal
import { useUserAuth } from "../util/userAuthContext";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {Grid,Paper,Avatar,TextField,Box} from "@material-ui/core/";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn, googleSignIn } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  const paperStyle={padding:20 , height:'60vh', width:350, margin:"20px auto", backgroundColor:"#FFE5B4"}
  const avatarStyle={backgroundColor:"#1bbd7e"}
  const textfieldStyle={margin:"10px 0"}
  const btnStyle={margin:"20px 0"} //first commit styling options
  return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
          <Paper elevation={10} style={paperStyle}>
            <Grid align='center'>
              <Avatar style={avatarStyle}><LockIcon/></Avatar>
              <h2>Sign In</h2>
            </Grid>
            <Form onSubmit={handleSubmit}></Form> {/*don't know if correct to put this here*/}
            <TextField label='email' placeholder='Enter email' fullWidth required style={textfieldStyle} onChange={(e) => setEmail(e.target.value)}/>
            <TextField label='password' placeholder='Enter password' type='password' fullWidth required style={textfieldStyle} onChange={(e) => setPassword(e.target.value)}/>
            <Button type='submit' color='primary' variant="contained" fullWidth style={btnStyle}>Sign In</Button>
            <Typography>Don't have an account?<Link to="/signup">Sign up</Link></Typography>
          </Paper>
        </Box>
  );
};

export default Login;
