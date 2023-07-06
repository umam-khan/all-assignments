const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const mongoose=require("mongoose")
app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];

// Connect to MongoDB

mongoose.connect('mongodb+srv://umamkhan:nP2oomDs61COw0tj@cluster0.6umualh.mongodb.net/courses', { useNewUrlParser: true, useUnifiedTopology: true, dbName: "courses" });
//mongooose stuff
//schema
const userSchema = new mongoose.Schema({
  username : String,
  password : String,
  purchasedCourses : [{type : mongoose.Schema.Types.ObjectId , ref : 'Course'}]
})
const adminSchema = new mongoose.Schema({
  username : String,
  password : String
})
const courseSchema = new mongoose.Schema({
  title : String,
  description : String,
  price : Number,
  imageLink : String,
  published : Boolean
})

//models now from schema
const User = mongoose.model("Users",userSchema);
const Admin = mongoose.model("Admins",adminSchema);
const Course = mongoose.model('Course', courseSchema);

//now change all apis to include mongoose CRUD operations

const secretKey = "superS3cr3t1"; // replace this with your own secret key

const generateJwt = (user) => {
  const payload = { username: user.username, };
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};

const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, secretKey, (err, payload) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = payload;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

app.post('/admin/signup', async (req, res) => {
  const {username, password} = req.body;
  // const existingAdmin = ADMINS.find(a => a.username === admin.username);
  const admin = await Admin.findOne({username});
  if (admin) {
    res.status(403).json({ message: 'Admin already exists' });
  } else {
    const newAdmin = new Admin({username : username, password : password})
    await newAdmin.save();
    const token = jwt.sign({username, role: 'Admin'}, secretKey, {expiresIn : '1hr'})
    res.json({ message: 'Admin created successfully', token });
  }
});

app.post('/admin/login', async (req, res) => {
  const { username, password } = req.headers;
  const admin = await Admin.findOne({username : username, password : password});
  if (admin) {
    const token = jwt.sign({ username, role: 'admin' }, secretKey, { expiresIn: '1h' });
    res.json({ message: 'Logged in successfully', token });
  } else {
    res.status(403).json({ message: 'Invalid username or password' });
  }
});

app.post('/admin/courses', authenticateJwt, async (req, res) => {
  const course = new Course(req.body)
  await course.save();
  res.json({ message: 'Course created successfully', courseId: course.id });
});

app.put('/admin/courses/:courseId', authenticateJwt,async(req, res) => {
  const courseId = req.params.courseId;
  const course = await Course.findByIdAndUpdate(courseId, req.body, {new : true})
  if (course) {
    res.json({ message: 'Course updated successfully' });
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});

app.get('/admin/courses', authenticateJwt, async(req, res) => {
  const courses = await Course.find({});
  res.json({ courses: courses });
});

app.post('/users/signup', async(req, res) => {
  const {username,password} = req.body;
  const userExists = await User.findOne({username})
  if (userExists) {
    res.status(403).json({ message: 'User already exists' });
  } else {
    const newUser = new User({username: username, password : password})
    await newUser.save();
    const token = jwt.sign({ username, role: 'user' }, secretKey, { expiresIn: '1h' });
    res.json({ message: 'User created successfully', token });
  }
});

app.post('/users/login', async(req, res) => {
  const { username, password } = req.headers;
  const user = await User.findOne({username, password})
  if (user) {
    const token = jwt.sign({ username, role: 'user' }, secretKey, { expiresIn: '1h' });
    res.json({ message: 'Logged in successfully', token });
  } else {
    res.status(403).json({ message: 'User authentication failed' });
  }
});

app.get('/users/courses', authenticateJwt, async(req, res) => {
  const courses = await Course.find({published : true});
  res.json({ courses: courses });
});

app.post('/users/courses/:courseId', authenticateJwt, async(req, res) => {
  const course = await Course.findById(req.params.courseId)
  if (course) {
    const user = await User.findOne({username : req.user.username})
    if (user) {
      user.purchasedCourses.push(course);
      await user.save();
      res.json({ message: 'Course purchased successfully' });
    } else {
      res.status(403).json({ message: 'User not found' });
    }
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});

app.get('/users/purchasedCourses', authenticateJwt, async (req, res) => {
  const user = await User.findOne({username : req.user.username}).populate('purchasedCourses');
  if (user) {
    res.json({ purchasedCourses: user.purchasedCourses || [] });
  } else {
    res.status(404).json({ message: 'No courses purchased' });
  }
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
