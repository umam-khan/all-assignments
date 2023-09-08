import React, { useEffect, useState } from "react";
import { Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const AppBar = () => {
const [useremail, setUserEmail] = useState("");
    useEffect(()=>{
        fetch("http://localhost:3000/admin/me",{
            method: "GET",
            headers : {
                "Authorization" : "Bearer " + localStorage.getItem("token")
            }
        }).then((res)=>{
            res.json().then((data)=>{
                console.log("app bar loaded")
                if(data.username)
                {
                    setUserEmail(data.username)
                }
            })
        })
    }, [])


    const navigate = useNavigate();

    if(useremail) {
        return (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px"
              }}
            >
              <Typography>Horsera</Typography>
              <div>
                {useremail}
                <Button variant="contained" onClick={()=>{
                    localStorage.setItem("token",null);
                }}>logout</Button>
              </div>
            </div>
          );
    }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px"
      }}
    >
      <Typography>Horsera</Typography>
      <div>
        <Button variant="contained" onClick={()=>{
            navigate("/signin")
        }}>Sign IN</Button>
        <Button variant="contained" onClick={()=>{
            navigate("/signup")
        }}>Sign up</Button>
      </div>
    </div>
  );
};

export default AppBar;
