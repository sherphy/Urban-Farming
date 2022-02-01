import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
//import { Button } from "react-bootstrap"; first commit removal
import { useUserAuth } from "../util/userAuthContext";
import { auth, db } from '../util/firebase'
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {Grid,Paper,Avatar,TextField,Box} from "@material-ui/core/";
import LockIcon from '@mui/icons-material/Lock';
import "./login.css"


const Signup = (props) => {
  // defining state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  let navigate = useNavigate();

  // signup
  const signup = (e) => {
      e.preventDefault();
      auth.createUserWithEmailAndPassword(email, password).then((cred) => {
          db.collection('SignedUpUsersData').doc(cred.user.uid).set({
              Email: email,
              // Password: password
          }).then(() => {
              setEmail('');
              setPassword('');
              setError('');
              navigate("/")
          }).catch(err => setError(err.message));
      }).catch(err => setError(err.message));
  }

    //can add Signup successful
    return (
      <div className='sign'>
          <br />
          <h2>Sign up</h2>
          <br />
          <form autoComplete="off" className='form-group' onSubmit={signup}>
              <label htmlFor="email">Email</label>
              <input type="email" className='form-control' required
                  onChange={(e) => setEmail(e.target.value)} value={email} />
              <br />
              <label htmlFor="passowrd">Password</label>
              <input type="password" className='form-control' required
                  onChange={(e) => setPassword(e.target.value)} value={password} />
              <br />
              <button type="submit" className='btn btn-success btn-md mybtn'>SUBMIT</button>
          </form>
          {error && <span className='error-msg'>{error}</span>}
          <br />
          <span>
              <Link to="/"> Already have an account? Login</Link>
          </span>
      </div>
  )
}

export default Signup;
