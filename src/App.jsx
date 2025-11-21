import './App.css'

import { Outlet } from 'react-router'
import Navbar from './components/Shared/Navbar'
import Footer from './components/Shared/Footer'


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
