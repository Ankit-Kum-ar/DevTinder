import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../Redux/Slices/userSlice';

const Signup = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [skills, setSkills] = useState('');

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await axios.post("http://localhost:3000/signup", {
        firstName,
        lastName,
        email,
        password,
        age,
        skills: skills.split(',').map(skill => skill.trim()), // Convert skills string to an array
      }, { withCredentials: true });
      console.log("Signup successful", response.data);
      dispatch(addUser(response.data));
      navigate("/feed");
    } catch (error) {
      console.error("Signup failed", error);
    }
  };

  return (
    <div className="flex justify-center min-h-screen items-center">
      <div className="card w-full max-w-4xl bg-base-300 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Sign Up!</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="input input-bordered flex items-center gap-2 mb-2">
              <input
                type="text"
                className="grow placeholder:text-gray-500"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 mb-2">
              <input
                type="text"
                className="grow placeholder:text-gray-500"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 mb-2">
              <input
                type="email"
                className="grow placeholder:text-gray-500"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 mb-2">
              <input
                type={passwordVisible ? "text" : "password"}
                className="grow placeholder:text-gray-500"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="button" onClick={togglePasswordVisibility}>
                {passwordVisible ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye-off"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/></svg>
                )}
              </button>
            </label>
            <label className="input input-bordered flex items-center gap-2 mb-2">
              <input
                type="text"
                className="grow placeholder:text-gray-500"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 mb-2">
              <input
                type="text"
                className="grow placeholder:text-gray-500"
                placeholder="Skills (comma separated)"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />
            </label>
          </div>
          <div className="card-actions justify-end mt-4">
            <button className="btn btn-primary w-full" onClick={handleSignup}>Sign Up</button>
          </div>
          <p className="mt-4 text-center">
            Already have an account? <Link className="text-blue-300 hover:underline" to="/login">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;