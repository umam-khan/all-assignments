// const express = require("express");
// const app = express();
// const jwt = require("jsonwebtoken")
// app.use(express.json());

// let USERS = [];
// let ADMINS = [];
// let COURSES = [];
// const secretKey = "secret_key_here";
// //authentication middleware

// const authenticateAdmin = (req,res,next) =>{
//   const fulltoken = req.headers.authorization;
//   const token = fulltoken.split(" ")[1];
//   if(token) {
//     jwt.verify(token, secretKey, (err,payload)=>{
//       if(err){
//         return res.status(401).json({message: "invalid token"})
//       }
//       if(payload.isAdmin)
//       {
//         req.isAdmin = true;
//         next();
//       } else {
//         res.status(400).json({ message: "Not an admin" });
//       }
//     })
//   }
// };
// const authenticateUser = (req, res, next) => {
//   const fulltoken = req.headers.authorization;
//   const token = fulltoken.split(" ")[1];
//   if(token){
//     jwt.verify(token, secretKey, (err, payload)=>{
//       if(err)
//       {
//         return res.status(403).json({ message: "invalid " });
//       }
//       if(payload.isUser)
//       {
//         req.isUser=true;
//         next();
//       }
//       else{
//         res.status(400).json({ message: "Not a user" });
//       }
//     })
//   }
// };

// // Admin routes
// app.post("/admin/signup", (req, res) => {
//   const { username, password } = req.body;
//   const admin = {
//     username: username,
//     password: password,
//   };
//   const adminExists = ADMINS.find(a => a.username === admin.username) //existing toh check kar while signing up
//   if(adminExists)
//   {
//     res.status(403).json({ message: "Admin already exists" });
//   }else {
//   ADMINS.push(admin);
//   const token = jwt.sign({isAdmin:true},secretKey);
//   res.status(200).json({ message: "Admin created successfully",token });
// }
// });

// app.post("/admin/login", (req, res) => {
//   const { username, password } = req.headers;
//   const adminExists = ADMINS.find(a => a.username === username && a.password === password) //existing toh check kar while signing up
//   if(adminExists)
//   {
//     const token =jwt.sign({isAdmin :true}, secretKey , {expiresIn : '1hr'});
//     res.status(403).json({ message: "Admin already exists", token });
//   }else {
//   res.status(400).json({ message: "invallid " });
// }
//   // logic to log in admin
// });

// app.post("/admin/courses",authenticateAdmin, (req, res) => {
//   const course = req.body;
//   COURSES.push({...course, courseId: Math.floor(Math.random() * 100)});
//   res.json({
//     message: "Course created successfully",
//     courseId: course.courseId,
//   });
//   // logic to create a course
// });

// app.put("/admin/courses/:courseId", authenticateAdmin,(req, res) => {
//   const { courseId } = req.params;
  
//   const course = COURSES.find(
//     (course) => course.courseId === +courseId
//   );
  
//   if (!course) {
//     res.status(400).json({ message: "Course not found" });
//   } else {
//     Object.assign(course, req.body)
//     // const oldCourse = COURSES[courseIndex];
//     // const updatedCourse = { ...oldCourse, ...req.body, courseId: +courseId };
//     // COURSES.splice(courseIndex, 1, updatedCourse);
//     res.status(200).json({ message: "Course updated successfully" });
//   }
//   // logic to edit a course
// });

// app.get("/admin/courses", authenticateAdmin, (req, res) => {
//     res.status(200).json(COURSES);
// });

// // User routes
// app.post("/users/signup", (req, res) => {
//   const { username, password } = req.body;
//   const user = {
//     username: username,
//     password: password,
//     purchasedCourses : []
//   };
//   USERS.push(user);
//   const token = jwt.sign({isUser:true},secretKey);
//   res.status(200).json({ message: "User created successfully", token });
// });

// app.post("/users/login",authenticateUser, (req, res) => {
//   if (req.isUser) {
//     const token =jwt.sign({isUser :true}, secretKey , {expiresIn : '1hr'});
//     res.json({ message: "Logged in successfully", token });
//   } else {
//     res.status(400).json({ message: "not a user" });
//   }
// });

// app.get("/users/courses",authenticateUser, (req, res) => {
//   if(req.isUser)
//   {
//     res.status(200).json(COURSES);
//   }
//   else{
//     res.json({ message: "not an admin" })
//   }
// });

// app.post("/users/courses/:courseId", authenticateUser,(req, res) => {
//   const userIndex = USERS.findIndex((user) => user.username === req.username && user.password === req.password)
//   const courseId = +req.params.courseId;
//   const courseIndex = COURSES.findIndex((course) => course.courseId === courseId);
//   if(req.isUser)
//   {
//     USERS[userIndex].purchasedCourses.push(COURSES[courseIndex]);
//     console.log(USERS[userIndex].purchasedCourses);
//     res.status(200).json({ message: 'Course purchased successfully'})
//   }
//   else{
//     res.status(400).json({message : "error"})
//   }
// });

// app.get("/users/purchasedCourses", authenticateUser, (req, res) => {
//   const { username, password } = req.headers; 
//   const userIndex = USERS.findIndex((user) => user.username === username && user.password === password)
//   if(userIndex === -1)
//   {
//     res.status(400).json({message : "error"})
//   }
//   else{
//     console.log(USERS[userIndex].purchasedCourses);
//     res.status(200).json({ purchasedCourses: USERS[userIndex].purchasedCourses})
//   }
    
// });

// app.listen(3000, () => {
//   console.log("Server is listening on port 3000");
// });


const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];

const secretKey = "superS3cr3t1"; // replace this with your own secret key

const generateJwt = (user) => {
  const payload = { username: user.username, };
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};

const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

app.post('/admin/signup', (req, res) => {
  const admin = req.body;
  const existingAdmin = ADMINS.find(a => a.username === admin.username);
  if (existingAdmin) {
    res.status(403).json({ message: 'Admin already exists' });
  } else {
    ADMINS.push(admin);
    const token = generateJwt(admin);
    res.json({ message: 'Admin created successfully', token });
  }
});

app.post('/admin/login', (req, res) => {
  const { username, password } = req.headers;
  const admin = ADMINS.find(a => a.username === username && a.password === password);

  if (admin) {
    const token = generateJwt(admin);
    res.json({ message: 'Logged in successfully', token });
  } else {
    res.status(403).json({ message: 'Admin authentication failed' });
  }
});

app.post('/admin/courses', authenticateJwt, (req, res) => {
  const course = req.body;
  course.id = COURSES.length + 1; 
  COURSES.push(course);
  res.json({ message: 'Course created successfully', courseId: course.id });
});

app.put('/admin/courses/:courseId', authenticateJwt, (req, res) => {
  const courseId = parseInt(req.params.courseId);

  const courseIndex = COURSES.findIndex(c => c.id === courseId);

  if (courseIndex > -1) {
    const updatedCourse = { ...COURSES[courseIndex], ...req.body };
    COURSES[courseIndex] = updatedCourse;
    res.json({ message: 'Course updated successfully' });
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});

app.get('/admin/courses', authenticateJwt, (req, res) => {
  res.json({ courses: COURSES });
});

app.post('/users/signup', (req, res) => {
  const user = req.body;
  const existingUser = USERS.find(u => u.username === user.username);
  if (existingUser) {
    res.status(403).json({ message: 'User already exists' });
  } else {
    USERS.push(user);
    const token = generateJwt(user);
    res.json({ message: 'User created successfully', token });
  }
});

app.post('/users/login', (req, res) => {
  const { username, password } = req.headers;
  const user = USERS.find(u => u.username === username && u.password === password);
  if (user) {
    const token = generateJwt(user);
    res.json({ message: 'Logged in successfully', token });
  } else {
    res.status(403).json({ message: 'User authentication failed' });
  }
});

app.get('/users/courses', authenticateJwt, (req, res) => {
  res.json({ courses: COURSES });
});

app.post('/users/courses/:courseId', authenticateJwt, (req, res) => {
  const courseId = parseInt(req.params.courseId);
  const course = COURSES.find(c => c.id === courseId);
  if (course) {
    const user = USERS.find(u => u.username === req.user.username);
    if (user) {
      if (!user.purchasedCourses) {
        user.purchasedCourses = [];
      }
      user.purchasedCourses.push(course);
      res.json({ message: 'Course purchased successfully' });
    } else {
      res.status(403).json({ message: 'User not found' });
    }
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});

app.get('/users/purchasedCourses', authenticateJwt, (req, res) => {
  const user = USERS.find(u => u.username === req.user.username);
  if (user && user.purchasedCourses) {
    res.json({ purchasedCourses: user.purchasedCourses });
  } else {
    res.status(404).json({ message: 'No courses purchased' });
  }
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});





