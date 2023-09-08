import React from "react";
import { Link } from "react-router-dom";
import {Button, TextField, Card} from "@mui/material"
/// File is incomplete. You need to add input boxes to take input for users to register.
function SignUp() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  return <div>
    
        <center>
        <div style={{
          textAlign: "center",
          paddingTop:"150px"
        }}>
        <h3>welcome to Horsera, sign up</h3>
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
        <TextField fullWidth={true} variant="outlined" label="Email" type="email" onChange={(e)=>{
          setUsername(e.target.value)
        }} />
        <br />
        <br />
        <TextField fullWidth={true} variant="outlined" label="Password" type="email" onChange={(e)=>{
          setPassword(e.target.value)}
          } />
        <br />
        <br />
        <Button size="large" variant="contained" 
        onClick={()=>{
          fetch("http://localhost:3000/admin/signup",{
            method: "POST",
            body : JSON.stringify({
              username:username,
              password: password
            }),
            headers: {
              "Content-type" : "application/json"
            }
          }).then((res)=>{
            res.json().then((data)=>{
              localStorage.setItem("token", data.token);
              console.log(data);
            })
          })
        }}
        >Sign up</Button>
        <br />
        <br />
        Already a user? <Link to="/signin"> Login</Link>
      </Card>
    </center>
  </div>;
}

export default SignUp;
