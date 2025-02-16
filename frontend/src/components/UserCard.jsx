import { DEFAULT_PROFILE_PIC } from '../utils/constant';

const UserCard = ({ post }) => {
    const { firstName, lastName, photoUrl, bio, age, gender, skills } = post;
    return (
        <div className="card my-6 bg-base-300 md:w-96 w-72 shadow-xl">
            <figure>
                <img
                src={photoUrl || DEFAULT_PROFILE_PIC}
                alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                {
                    age && <p>Age: {age}</p>
                }
                {
                    gender && <p>Gender: {gender}</p>
                }
                <p>{bio}</p>
                {
                    skills && (
                        <div className="flex flex-wrap gap-1">
                            Skills:
                            {skills && skills.map((skill, index) => (
                                <span key={index} className="badge badge-ghost">{skill}</span>
                            ))}
                        </div>
                    )
                }
                <div className="card-actions justify-end m-3">
                    <button className="btn btn-primary">Ignore</button>
                    <button className="btn btn-secondary">Interested</button>
                </div>
            </div>
        </div>
    )
}

export default UserCard
