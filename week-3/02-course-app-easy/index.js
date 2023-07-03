const express = require("express");
const app = express();

app.use(express.json());

let USERS = [];
let ADMINS = [];
let COURSES = [];

//authentication middleware

const authenticateAdmin = (req,res,next) =>{
  const { username, password } = req.headers;
  const adminExists = ADMINS.some(
    (admin) => admin.username === username && admin.password === password
  );
  if (adminExists) {
    req.isAdmin = true;
    next();
  } else {
    res.status(400).json({ message: "Not an admin" });
  }
};
const authenticateUser = (req, res, next) => {
  const { username, password } = req.headers;
  const user = USERS.find(
    (user) => user.username === username && user.password === password
  );
  if (user) {
    req.user = user ; // reference pass hogayii
    req.isUser = true;
    req.username = username
    req.password = password
    next();
  } else {
    res.status(400).json({ message: "Not a user" });
  }
};

// Admin routes
app.post("/admin/signup", (req, res) => {
  const { username, password } = req.body;
  const admin = {
    username: username,
    password: password,
  };
  const adminExists = ADMINS.find(a => a.username === admin.username) //existing toh check kar while signing up
  if(adminExists)
  {
    res.status(403).json({ message: "Admin already exists" });
  }else {
  ADMINS.push(admin);
  res.status(200).json({ message: "Admin created successfully" });
}
});

app.post("/admin/login", authenticateAdmin, (req, res) => {
  res.json({ message: "Logged in successfully" });
  // logic to log in admin
});

app.post("/admin/courses",authenticateAdmin, (req, res) => {
  const { title, description, price, imageLink, published } = req.body;
  const course = {
    courseId: Math.floor(Math.random() * 100),
    title: title,
    description: description,
    price: price,
    imageLink: imageLink,
    published: published,
  };
  COURSES.push(course);
  res.json({
    message: "Course created successfully",
    courseId: course.courseId,
  });
  // logic to create a course
});

app.put("/admin/courses/:courseId", authenticateAdmin,(req, res) => {
  const { courseId } = req.params;
  const course = COURSES.find((course) => course.courseId === +courseId);
  if (!course) {
    res.status(400).json({ message: "Course not found" });
  } else {
    Object.assign(course, req.body)
    res.status(200).json({ message: "Course updated successfully" });
  }
  // logic to edit a course
});

app.get("/admin/courses", authenticateAdmin, (req, res) => {
  if(req.isAdmin)
  {
    res.status(200).json(COURSES);
  }
  else{
    res.json({ message: "not an admin" })
  }
});

// User routes
app.post("/users/signup", (req, res) => {
  const user = {...req.body, purchasedCourses : []} 
  USERS.push(user);
  res.status(200).json({ message: "User created successfully" });
});

app.post("/users/login",authenticateUser, (req, res) => {
  if (req.isUser) {
    res.json({ message: "Logged in successfully" });
  } else {
    res.status(400).json({ message: "not a user" });
  }
});

app.get("/users/courses",authenticateUser, (req, res) => {
  if(req.isUser)
  {
    res.status(200).json(COURSES);
  }
  else{
    res.json({ message: "not an admin" })
  }
});

app.post("/users/courses/:courseId", authenticateUser,(req, res) => {
  const user = USERS.find((user) => user.username === req.username && user.password === req.password)
  const courseId = +req.params.courseId;
  const course = COURSES.find((course) => course.courseId === courseId);
  if(req.isUser)
  {
    user.purchasedCourses.push(course);
    console.log(user.purchasedCourses);
    res.status(200).json({ message: 'Course purchased successfully'})
  }
  else{
    res.status(400).json({message : "error"})
  }
});

app.get("/users/purchasedCourses", authenticateUser, (req, res) => {
  const { username, password } = req.headers; 
  const userIndex = USERS.findIndex((user) => user.username === username && user.password === password)
  if(userIndex === -1)
  {
    res.status(400).json({message : "error"})
  }
  else{
    console.log(USERS[userIndex].purchasedCourses);
    res.status(200).json({ purchasedCourses: USERS[userIndex].purchasedCourses})
  }
    
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
