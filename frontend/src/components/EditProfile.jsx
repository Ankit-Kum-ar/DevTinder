import { useState } from 'react';
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { addUser } from '../Redux/Slices/userSlice';

const EditProfile = ({ user }) => {
    const [gender, setGender] = useState(user?.gender || ''); // Set the initial value of the gender to the user's gender.
    const [bio, setBio] = useState(user?.bio || ''); // Set the initial value of the bio to the user's bio.
    const [profilePicture, setProfilePicture] = useState(user?.photoUrl || ''); // Set the initial value of the profile picture to the user's profile picture.
    const [skills, setSkills] = useState(user?.skills || []); // Set the initial value of the skills to the user's skills.
    const [firstName, setFirstName] = useState(user?.firstName || ''); // Set the initial value of the first name to the user's first name.
    const [lastName, setLastName] = useState(user?.lastName || ''); // Set the initial value of the last name to the user's last name.
    const [age, setAge] = useState(user?.age || ''); // Set the initial value of the age to the user's age.
    const dispatch = useDispatch();

    const handleSkillsChange = (e) => {
        setSkills(e.target.value.split(',').map((skill) => skill.trim())); // Split the input by comma and trim the spaces.
    };

    const saveEditProfile = async (e) => {
        e.preventDefault();
        try {
            let photoUrl = profilePicture;
            const response = await axios.patch(`${BASE_URL}/profile/edit`, {
                photoUrl,
                bio,
                skills,
                gender,
            }, { withCredentials: true });
            console.log(response.data);
            // dispatch(addUser(response.data)); // Dispatch the updated user data to the store.
        } catch (error) {
            console.error(error.response?.data || error.message);
        }
    };

    return (
        <div className='flex md:flex-row flex-col justify-center items-center gap-9'>
            <div className="flex flex-col items-center p-6 m-4 max-w-4xl bg-base-200 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold mb-6">Edit Profile</h2>
                <form className="md:w-96" onSubmit={saveEditProfile}>
                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Gender</span>
                        </label>
                        <select 
                            className="select select-bordered w-full"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <option disabled value={gender}>
                            {gender || 'Select Gender'}
                            </option>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Bio</span>
                        </label>
                        <textarea 
                            placeholder="Bio" 
                            className="textarea textarea-bordered w-full"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Profile Picture</span>
                        </label>
                        <input 
                            type="text" 
                            className="input input-bordered w-full"
                            placeholder="Profile Picture URL"
                            value={profilePicture}
                            onChange={(e) => setProfilePicture(e.target.value)}
                        />
                    </div>
                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Skills</span>
                        </label>
                        <input 
                            type="text" 
                            placeholder="Skills (comma separated)" 
                            className="input input-bordered w-full" 
                            value={skills.join(', ')}
                            onChange={handleSkillsChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-full">Save Changes</button>
                </form>
            </div>
            <UserCard post={ { gender, photoUrl: profilePicture, age, bio, skills, firstName, lastName } } />
        </div>
    );
};

export default EditProfile;