import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import PrivateRoutes from './PrivateRoutes'
import Login from './pages/Login'
import SignUp from './pages/Signup'
import AddCourse from './pages/AddCourse'
import Courses from './pages/Courses'
import Layout from './Layout'
import Course from './pages/Course'


const App = () => {

  return (
    <div className='px-5 py-0'>
    <RecoilRoot>
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<Layout /> }>
          <Route path='/courses' element={<Courses />} /> 
          <Route path='/addcourse'element={<AddCourse />} />
          <Route path='/course/:courseId' element={<Course />}/>
          </Route>
        </Route>

        <Route path={'/login'} element={<Login />} />
        <Route path='/signup'element={<SignUp />} /> 
      </Routes>
    </BrowserRouter>
    </RecoilRoot>
    </div>
  )
}

export default App
