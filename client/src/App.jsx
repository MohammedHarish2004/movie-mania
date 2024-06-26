import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Movies from './pages/Movies.jsx'
import Dashboard from './pages/Dashboard.jsx'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'
import Missing from './pages/Missing.jsx'
import Header from './components/Header.jsx'
import { ToastContainer } from 'react-toastify'
import PrivateRoute from './components/PrivateRoute.jsx'
import AdminPrivateRoute from './components/AdminPrivateRoute.jsx'
import WatchLater from './pages/WatchLater.jsx'
import FooterCom from './components/FooterComp.jsx'
import UpdateMovie from './pages/UpdateMovie.jsx'
import UpdateSlider from './pages/UpdateSlider.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import MoviePage from './pages/MoviePage.jsx'
import $ from 'jquery';
import About from './pages/About.jsx'
import PlayMovie from './pages/PlayMovie.jsx'

export default function App() {
  return (
   <BrowserRouter>
   <ScrollToTop />
   <Header />
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/movies' element={<Movies />}/>
      <Route path='/sign-in' element={<SignIn />}/>
      <Route path='/sign-up' element={<SignUp />}/>
      <Route path='/about' element={<About />}/>
      <Route path='/details/:movieId' element={<MoviePage />}/>
      <Route path='/view' element={<PlayMovie />}/>
      <Route path='/watch-later' element={<WatchLater />}/>
      <Route element={<PrivateRoute />}>
        <Route path='/dashboard' element={<Dashboard />}/>
      </Route>
      <Route element={<AdminPrivateRoute />}>
        <Route path='/edit-movie/:movieId' element={ <UpdateMovie />}/>
        <Route path='/edit-slider/:sliderId' element={ <UpdateSlider />}/>
      </Route>
      <Route path='*' element={<Missing />}/>
    </Routes>
    <FooterCom />
    <ToastContainer 
        position="top-right"
        theme="dark"
        hideProgressBar={false}
      />
   </BrowserRouter>
  )
}
