import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './components/SignIn';
import Landing from "./components/Landing";
import AddCourse from './components/AddCourse';
import SignUp from './components/SignUp';
import ShowCourses from './components/ShowCourses';
import AppBar from './components/AppBar';
import Course from './components/Course';
// This file shows how you can do routing in React.
// Try going to /login, /register, /about, /courses on the website and see how the html changes
// based on the route.
// You can also try going to /random and see what happens (a route that doesnt exist)
function App() {
    return (
        <div style={{height:"",
        width:"100vw", backgroundColor: "#eeeeee"}} >
           
        <Router>
             <AppBar />
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/addcourse" element={<AddCourse />} />
                <Route path="/courses" element={<ShowCourses />} />
                <Route path="/course/:courseId" element={<Course />} />
            </Routes>
        </Router>
         </div>
    );
}

export default App;