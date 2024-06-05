import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Movies from './pages/Movies.jsx'
import Dashboard from './pages/Dashboard.jsx'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'
import Missing from './pages/Missing.jsx'

export default function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/movies' element={<Movies />}/>
      <Route path='/dashboard' element={<Dashboard />}/>
      <Route path='/sign-in' element={<SignIn />}/>
      <Route path='/sign-up' element={<SignUp />}/>
      <Route path='*' element={<Missing />}/>
    </Routes>
   </BrowserRouter>
  )
}
