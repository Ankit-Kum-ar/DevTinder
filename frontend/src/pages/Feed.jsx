import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../Redux/Slices/feedSlice';

const Feed = () => {

  const dispatch = useDispatch(); // Dispatch function to dispatch actions to the Redux store

  // Function to fetch the feed data from the server.
  const getFeed = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/feed`, { withCredentials: true });
      console.log("Feed data", response.data);
      // Dispatch the feed data to the store.
      dispatch(addFeed(response.data));
    } catch (error) {
      console.error("Failed to fetch feed", error);
    }
  }

  useEffect(() => {
    getFeed();
  }, []);

  const feed = useSelector((store) => store.feed); // Selector to get the feed data from the Redux store

  return (
    <div className='flex justify-center items-center min-h-screen'>
      {
        feed ? (
          <div className='grid grid-cols-1 md:grid-cols-1 gap-4'>
            {
              feed.map((post) => (
                <div key={post._id} className='card shadow-xl bg-base-300'>
                  <div className='card-body'>
                    <h2 className='card-title'>{post.bio}</h2>
                    <p>{post.age}</p>
                    <p>By: {post.firstName} {post.lastName}</p>
                  </div>
                </div>
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
