import Appbar from "./components/Appbar"
import SignIn from "./components/SignIn"
import { RecoilRoot } from 'recoil'
import {Routes, Route, BrowserRouter } from "react-router-dom";
import SignUp from "./components/SignUp";
import AddCourse from "./components/AddCourse";
import Courses from "./components/Courses";
import Course from "./components/Course";

function App(){
  return <div
  style={{
    width: "100vw",
    height: "100vh",
  }}
  >
<RecoilRoot>
  <BrowserRouter>
  <Appbar/>
      <Routes>
        <Route path="/">
          <Route path="/signin" element ={<SignIn/>}></Route>
          <Route path="/signup" element ={<SignUp/>}></Route>
          <Route path="/addcourse" element={<AddCourse/>}></Route>
          <Route path="/courses" element={<Courses/>}></Route>
          <Route path="/course/:courseId" element={<Course/>}></Route>
        </Route>
      </Routes>
  </BrowserRouter>
 </RecoilRoot>
  </div> 
}

export default App