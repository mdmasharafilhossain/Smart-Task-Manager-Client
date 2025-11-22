import './App.css'

import { Outlet } from 'react-router'
import Navbar from './components/Shared/Navbar.jsx'
import Footer from './components/Shared/Footer.jsx'


function App() {
 

  return (
    <>
     <Navbar/>
     <div className='min-h-screen mt-16'>
      <Outlet />
     </div>
     <Footer/>
    </>
  )
}

export default App
