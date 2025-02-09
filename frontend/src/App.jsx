import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Footer from "./components/Footer"
import Login from "./pages/Login"
import Feed from "./pages/Feed"
import Signup from "./pages/Signup"

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        {/* Routes go here */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/feed" element= {<Feed />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
