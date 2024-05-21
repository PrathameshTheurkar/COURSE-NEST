import Appbar from "./components/Appbar"
import SignIn from "./pages/SignIn"
import { RecoilRoot } from 'recoil'
import {Routes, Route, BrowserRouter } from "react-router-dom";
import SignUp from "./pages/SignUp";
import AddCourse from "./pages/AddCourse";
import Courses from "./pages/Courses";
import Course from "./pages/Course";

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