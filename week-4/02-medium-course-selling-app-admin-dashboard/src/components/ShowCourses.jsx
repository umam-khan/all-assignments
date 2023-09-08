import { Card, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
function ShowCourses() {
    const [courses, setCourses] = React.useState([]);
    useEffect(()=>{
        fetch("http://localhost:3000/admin/courses",{
            method: "GET",
            headers : {
                "Authorization" : "Bearer " + localStorage.getItem("token")
            }
        }).then((res)=>{
            res.json().then((data)=>{
                console.log(data);
                setCourses(data.courses);
            })
        })
    }, [])
    // Add code to fetch courses from the server
    // and set it in the courses state variable.
    return <>
    <h1>Create Course Page</h1><div style={{display:"flex", flexWrap:"wrap"}}>
        
        {courses.map(c => {
            return <Course c={c} /> 
        })}
    </div>
    </>
}

export function Course(props) {
    return <Card style={{width:"300px", margin:"10px", minHeight:"200px"}}>
       <Typography variant="h5" textAlign={"center"}> {props.c.title}</Typography>
        <br />
        <Typography textAlign={"center"}> {props.c.description}</Typography>
        <img src={props.c.imageLink} style={{width:"300px"}}/>
    </Card>
}

export default ShowCourses;