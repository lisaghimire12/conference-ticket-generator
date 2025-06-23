import { useState } from 'react'
import { Route,Routes } from 'react-router-dom'

import Homepage from './Homepage'
import Ticket from './Ticket'
import Loader from './Loader'

import './Homepage.css'
import './Ticket.css'
import './Loader.css'


function App() {
  const [count, setCount] = useState(0) 

  return (
    <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/ticket' element={<Ticket/>}/>
        <Route path='/loader' element={<Loader/>}/>
    </Routes>
  )
}

export default App