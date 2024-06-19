import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/Footer'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
     <Navbar/>
     <div className="min-h-[100vh] bg-green-50 bg-[linear-gradient(to_right,#81px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
     <Manager/>
     </div>
    
     <Footer/>
    </div>
  )
}

export default App
