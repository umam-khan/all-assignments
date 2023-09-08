import React from "react";
import { Link } from "react-router-dom";
import {Button, TextField, Card} from "@mui/material"
/// File is incomplete. You need to add input boxes to take input for users to register.
function SignIn() {
  const [email, setEmail] = React.useState("");

  return <div>
    
        <center>
        <div style={{
          textAlign: "center",
          paddingTop:"150px"
        }}>
        <h3>welcome back to Horsera, sign in below</h3>
        </div>
        </center>
   
    <center>
      <Card
        style={{
          width: "400px",
          textAlign: "center",
          padding: "20px"
        }}
      >
        <br />
        <TextField fullWidth={true} variant="outlined" label="Email" type="email" />
        <br />
        <br />
        <TextField fullWidth={true} variant="outlined" label="Password" type="email" />
        <br />
        <br />
        <Button size="large" variant="contained" >Sign IN</Button>
        <br />
        <br />
        Not A user? <Link to="/signup"> SIGN up</Link>
      </Card>
    </center>
  </div>;
}

export default SignIn;
