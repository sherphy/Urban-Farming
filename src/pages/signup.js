// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Form, Alert } from "react-bootstrap";
// import { Button } from "react-bootstrap";
// import { useUserAuth } from "../util/userAuthContext";

// const Signup = () => {
//   const [email, setEmail] = useState("");
//   const [error, setError] = useState("");
//   const [password, setPassword] = useState("");
//   const { signUp } = useUserAuth();
//   let navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     try {
//       await signUp(email, password);
//       navigate("/");
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <>
//       <div className="p-4 box">
//         <h2 className="mb-3">Signup</h2>
//         {error && <Alert variant="danger">{error}</Alert>}
//         <Form onSubmit={handleSubmit}>
//           <Form.Group className="mb-3" controlId="formBasicEmail">
//             <Form.Control
//               type="email"
//               placeholder="Email address"
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </Form.Group>

//           <Form.Group className="mb-3" controlId="formBasicPassword">
//             <Form.Control
//               type="password"
//               placeholder="Password"
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </Form.Group>

//           <div className="d-grid gap-2">
//             <Button variant="primary" type="Submit">
//               Sign up
//             </Button>
//           </div>
//         </Form>
//       </div>
//       <div className="p-4 box mt-3 text-center">
//         Already have an account? <Link to="/">Log In</Link>
//       </div>
//     </>
//   );
// };

// export default Signup;

import React, { useState } from 'react'
import { auth, db } from '../util/firebase'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

toast.configure();

const Signup = (props) => {
    // defining state
    const [fullName, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    let navigate = useNavigate();

    // signup
    const signup = (e) => {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email, password).then((cred) => {
            db.collection('SignedUpUsersData').doc(cred.user.uid).set({
                FullName: fullName,
                Email: email,
                //must find way to update points
                Points: 0,
                Camera: "unset"
                // Password: password
            }).then(() => {
                setEmail('');
                setFullname('');
                setPassword('');
                setError('');
                navigate("/");
                toast.success('Your sign up is successful! You can login now', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                  });
            }).catch(err => setError(err.message));
        }).catch(err => setError(err.message));
    }

    //can add Signup successful
    return (
        <div className='container'>
            <br />
            <h2 style={{color: "black", textAlign: "center"}}>Sign up</h2>
            <br />
            <form autoComplete="off" className='form-group' onSubmit={signup}>
                <label>Name</label>
                <input type="text" className='form-control' required
                    onChange={(e) => setFullname(e.target.value)} value={fullName}></input>
                <br></br>
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
            <button style={{backgroundColor: "white"}}>
                <Link to="/"> Already have an account? Login here</Link>
            </button>
        </div>
    )
}

export default Signup;