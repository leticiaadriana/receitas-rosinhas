import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from "./components/header"
import Footer from "./components/footer"
import HomePage from "./pages/home"

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
