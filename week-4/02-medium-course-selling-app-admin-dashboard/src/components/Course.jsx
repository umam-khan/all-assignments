import {Typography, Card , TextField,Button} from '@mui/material';
import React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
const Course = () => {
    let {courseId}= useParams();
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
    let course = null;
    for(let i=0; i<courses.length;i++)
    {
        if(courses[i].id == courseId)
        {
            course = courses[i];
        }
    }
    if(!course)
    {
        return <div>
            Loading...
        </div>
    }
  return (
    <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
    <CourseCard course={course} />
    <UpdateCard courses={courses} course={course} setCourses={setCourses}/>
    </div>
  )
}
function CourseCard(props){
    return (
        <Card style={{width:"300px", margin:"10px", minHeight:"200px"}}>
       <Typography variant="h5" textAlign={"center"}> {props.course.title}</Typography>
        <br />
        <Typography textAlign={"center"}> {props.course.description}</Typography>
        <img src={props.course.imageLink} style={{width:"300px"}}/>
    </Card>
    )
}
function UpdateCard(props){
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [image, setImgage] = React.useState("");

    return <div>
        
        <center>
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
          fetch("http://localhost:3000/admin/courses/" + props.course.id ,{
            method: "PUT",
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
                let updatedCourses= [];
                for(let i=0;i < props.courses.length; i++)
                {
                    if(props.courses[i].id == props.course.id)
                    {
                        updatedCourses.push({
                            id:props.course.id,
                            title:title,
                            description:description,
                            imageLink : image
                        })
                    }
                    else{
                        updatedCourses.push(props.courses[i]);
                    }
                }
                props.setCourses(updatedCourses)
            })
          })
        }}
        >Update course</Button>
        <br />
      </Card>
    </center>
    </div>
}
export default Course