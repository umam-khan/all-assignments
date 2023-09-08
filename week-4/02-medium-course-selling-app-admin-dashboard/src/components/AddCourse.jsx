import React from "react";
import { TextField, Card, Button } from "@mui/material";
/// You need to add input boxes to take input for users to create a course.
/// I've added one input so you understand the api to do it.
function CreateCourse() {
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [image, setImgage] = React.useState("");

    return <div>
        
        <center>
          <h1>Create Course Page</h1>
      <Card
        style={{
          width: "400px",
          textAlign: "center",
          padding: "20px"
        }}
      >
        <br />
        <TextField fullWidth={true} variant="outlined" label="title" type="email" onChange={(e)=>{
          setTitle(e.target.value)
        }} />
        <br />
        <br />
        <TextField fullWidth={true} variant="outlined" label="Description" type="email" onChange={(e)=>{
          setDescription(e.target.value)}
          } />
        <br />
        <br />
        <TextField fullWidth={true} variant="outlined" label="ImageLink" type="email" onChange={(e)=>{
          setImgage(e.target.value)}
          } />
        <Button size="large" variant="contained" 
        onClick={()=>{
          fetch("http://localhost:3000/admin/courses",{
            method: "POST",
            body : JSON.stringify({
              title:title,
              description:description,
              imageLink : image,
              published: true
            }),
            headers: {
              "Content-type" : "application/json",
              "Authorization" : "Bearer " + localStorage.getItem("token")
            }
          }).then((res)=>{
            res.json().then((data)=>{
              alert("course added!")
              console.log(data);
            })
          })
        }}
        >Add course</Button>
        <br />
      </Card>
    </center>
    </div>
}
export default CreateCourse;