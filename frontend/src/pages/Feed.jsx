import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../Redux/Slices/feedSlice';
import UserCard from '../components/UserCard';

const Feed = () => {

  const dispatch = useDispatch(); // Dispatch function to dispatch actions to the Redux store

  const feed = useSelector((store) => store.feed); // Selector to get the feed data from the Redux store

  // Function to fetch the feed data from the server.
  const getFeed = async () => {
    if (feed.length) return;
    try {
      const response = await axios.get(`${BASE_URL}/feed`, { withCredentials: true });
      console.log("Feed data", response.data);
      // Dispatch the feed data to the store.
      dispatch(addFeed(response?.data));
    } catch (error) {
      console.error("Failed to fetch feed", error);
    }
  }

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <div className='flex justify-center items-center min-h-screen'>
      {
        feed ? (
           <div className='flex-col space-y-10 my-4'>
             {
              feed.map((post) => (
                 <UserCard key={post._id} post={post} />
               ))
             }
           </div>
        ) : (
          <h1>Loading...</h1>
        )
      }
    </div>
  )
}

export default Feed
