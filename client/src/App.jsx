import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Layout from './Layout'
import Courses from './pages/Courses'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route element={<Layout /> }>
      <Route path='/courses' element={<Courses />} /> 
      </Route>
      <Route path='/login' element={<Login />}/>
      <Route path='/signup' element={<SignUp />}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
