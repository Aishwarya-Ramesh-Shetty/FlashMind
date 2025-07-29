import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'
import Flashcards from './pages/Flashcards.jsx'
import Navbar from './components/Navbar.jsx'

const App = () => {
  return (
    <div>
      <Navbar /> 
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/flashcards" element={<Flashcards />} />
      </Routes>
    </div>
  )
}

export default App
