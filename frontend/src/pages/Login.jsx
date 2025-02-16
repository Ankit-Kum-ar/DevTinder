import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { addUser } from '../Redux/Slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constant';

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("elon@gmail.com");
  const [password, setPassword] = useState("Elon@123");
  const [error, setError] = useState("");

  // Function to toggle password visibility.
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Dispatch login action to the store.
  const dispatch = useDispatch();

  // Navigate to the home page if the user is already logged in.
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Implement login functionality here.
    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        email,
        password,
      }, { withCredentials: true }); // Send the cookies along with the request. This is important for authentication.
      // console.log("Login successful", response.data);
      dispatch(addUser(response.data)); // Dispatch the user data to the store.
      navigate("/feed"); // Navigate to the home page after successful login.
    } catch (error) {
      console.error("Login failed", error);
      setError(error.response?.data || "Invalid Credentials"); // Set the error message received from the server.
    }
  }

  return (
    <div className="flex justify-center min-h-screen items-center">
      <div className="card md:w-96 bg-base-300 shadow-xl">
        <div className="card-body flex-col space-y-3">
            <h2 className="card-title">Login!</h2>
            <div className="items-center space-y-2">
              <label className="input input-bordered flex items-center gap-2 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
                    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                  </svg>
                  <input
                    type="text" 
                    className="grow placeholder:text-gray-500" 
                    placeholder="Email" 
                    value={email}  
                    onChange={(e) => setEmail(e.target.value)}
                  />
              </label>
              <label className="input input-bordered flex items-center gap-2 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
                    <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
                  </svg>
                  <input 
                    type={passwordVisible ? "text" : "password"} 
                    className="grow placeholder:text-gray-500" 
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button type="button" onClick={togglePasswordVisibility}>
                    {/* SVG for open eye and close eye to toggle. */}
                    {
                      passwordVisible ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye-off"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/></svg>
                      )
                    }
                  </button>
              </label>
            </div>
            <p className="text-red-500 text-sm">{error}</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary w-full" onClick={handleLogin}>Login</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Login
