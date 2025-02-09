import { useDispatch, useSelector } from "react-redux"
import { BASE_URL, DEFAULT_PROFILE_PIC } from "../utils/constant";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { removeUser } from "../Redux/Slices/userSlice";

const Navbar = () => {    

    const user = useSelector((store) => store.user); // Selector to get the user data from the Redux store.
    const dispatch = useDispatch(); // Dispatch function to dispatch actions to the Redux store.
    const navigate = useNavigate(); // Navigate function to navigate to different pages.

    const handleLogout = async () => {
        try {
            await axios.post(`${BASE_URL}/logout`, { withCredentials: true });
            dispatch(removeUser());
            navigate("/");
        } catch (error) {
            console.error("Failed to logout", error);   
        }   
    }

    // If user is not logged in, return the following JSX.
    if (!user) {
        return (
            <div className="navbar bg-base-300">
                <div className="flex-1">
                    <Link to="/" className="btn btn-ghost text-xl">
                        <img src="/logo.jpg" className="w-6 rounded-3xl"/>
                        DevTinder
                    </Link>
                </div>
            </div>
        )
    }    

    return (
        <div className="navbar bg-base-300">
            <div className="flex-1">
                <Link to="/feed" className="btn btn-ghost text-xl">
                    <img src="/logo.jpg" className="w-6 rounded-3xl"/>
                    DevTinder
                </Link>
            </div>
            <div className="flex-none gap-1">
                <p className="avatar hidden md:block">Welcome, {user.firstName}</p>
            <div className="dropdown dropdown-end mx-3"> 
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                        {
                            user.photoUrl ? (
                                <img src={user.photoUrl} className="rounded-full w-10"/>
                            ) : (
                                <img src={DEFAULT_PROFILE_PIC} className="rounded-full w-10"/>
                            )
                        }
                    </div>
                </div>
                <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-200 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                    <li>
                        <Link to="/profile" className="justify-between">
                            Profile
                            <span className="badge">New</span>
                        </Link>
                    </li>
                    <li><a>Settings</a></li>
                    <li><a onClick={handleLogout}>Logout</a></li>
                </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar
