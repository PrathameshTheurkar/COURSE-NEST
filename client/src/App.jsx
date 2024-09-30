import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Layout from "./Layout";
import Courses from "./pages/Courses";
import { Toaster } from "react-hot-toast";
import CourseDetails from "./pages/CourseDetails";
import Purchases from "./pages/Purchases";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/courses" element={<Courses />} />
              <Route path="/course/:courseId" element={<CourseDetails />} />
              <Route path="/purchases" element={<Purchases />} />
              <Route path="/profile" element={<Profile /> }/>
            </Route>
            <Route path={"/login"} element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
        <Toaster position="top-center" />
      </RecoilRoot>
    </>
  );
}
export default App;
