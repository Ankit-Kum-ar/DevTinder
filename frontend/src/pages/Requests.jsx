import axios from 'axios';
import { useEffect } from 'react'
import { BASE_URL } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { addRequest } from '../Redux/Slices/requestSlice';


const Requests = () => {

    const dispatch = useDispatch();
    const requests = useSelector((store) => store.requests);

    const fetchRequests = async () => {
        // Implement fetching requests functionality here.
        try {
            // Fetch requests from the server.
            const response = await axios.get(`${BASE_URL}/user/requests/received`, { withCredentials: true });
            console.log("Requests", response.data);
            dispatch(addRequest(response.data));            
        } catch (error) {
            console.error("Failed to fetch requests", error);
        }
    }

    useEffect(() => {
        fetchRequests();
    }, [])
    return (
        <div className='flex justify-center items-center min-h-screen'>
            {/* Implement the UI for the requests page here. */}
            <h1 className='text-2xl font-bold'>Requests</h1>
        </div>
    )
}

export default Requests
