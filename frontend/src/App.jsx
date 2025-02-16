import { Route, Routes, useNavigate } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Footer from "./components/Footer"
import Login from "./pages/Login"
import Feed from "./pages/Feed"
import Signup from "./pages/Signup"
import { useEffect } from "react"
import axios from "axios"
import { BASE_URL } from "./utils/constant"
import { useDispatch, useSelector } from "react-redux"
import { addUser } from "./Redux/Slices/userSlice"
import Profile from "./pages/Profile"

function App() {

  const dispatch = useDispatch(); // Dispatch function to dispatch actions to the Redux store
  const navigate = useNavigate(); // Navigate function to navigate to different pages
  const userData = useSelector((store) => store.user); // Selector to get the user data from the Redux store  

  // Function to fetch user data from the server. If the user is already logged in, navigate to the feed page.
  const viewUser = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/profile/view`, { withCredentials: true });
      // console.log("User data", response.data);
      dispatch(addUser(response.data));
      navigate("/feed");
    } catch (error) {
      if(error.response?.status === 401) {
        navigate("/");
      }
      console.error("Failed to fetch user", error);
    }
  }

  // useEffect has used to call the viewUser function when the component is mounted.
  useEffect(() => {
    if(!userData) { // If user data is not present in the Redux store, call the viewUser function
      viewUser();
    }
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        {/* Routes go here */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/feed" element= {<Feed />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
