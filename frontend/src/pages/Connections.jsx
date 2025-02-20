import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../Redux/Slices/connectionSlice";
import ConnectionCard from "../components/ConnectionCard";

const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector((store) => store.connections);

    const fetchConnections = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/user/connections`, { withCredentials: true });
            console.log("Connections data", response.data);
            dispatch(addConnection(response.data));
        } catch (error) {
            console.error("Failed to fetch connections", error);
        }
    };

    useEffect(() => {
        fetchConnections();
    }, [dispatch]);

    return (
        <div className="flex flex-col items-center min-h-screen p-4 justify-center">
            <h1 className="font-bold text-4xl mb-8">Connections</h1>
            <div className="md:flex flex-wrap gap-6 justify-center items-center">
                {connections && connections.map((connection) => (
                    <ConnectionCard key={connection._id} connection={connection} />
                ))}
            </div>
        </div>
    );
};

export default Connections;