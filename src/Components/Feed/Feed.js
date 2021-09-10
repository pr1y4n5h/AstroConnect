import Post from "../Post/Post";
import Share from "../Share/Share";
import "./Feed.style.css";
import { CircularProgress } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTimeline, fetchCurrentUserPosts } from "../../Redux/postSlice";
import {Image} from '@material-ui/icons';


const Feed = ({userID}) => {
  const { userInfo, token } = useSelector((state) => state.user);
  const { posts, pending } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    if(token) {
      userID ? dispatch(fetchCurrentUserPosts(userID)) : dispatch(fetchTimeline(userInfo._id));
    }
  }, [userID, token]);

  return (
    <div className="feed-container">
      <div className="w-full md:px-6">
        <Share user={userID} />
        { pending ? (
          <div className="flex justify-center items-center h-80"> <CircularProgress color="secondary" /> </div>
        ) : (

          posts.length > 0 && token ? (
          userID ? posts?.map((item) => <Post key={item._id} post={item} />) : 
          posts?.map((item) => <Post key={item._id} post={item} />)) : <div className="h-80 flex items-center justify-center w-full"> <h2 className="text-center text-2xl"> <Image fontSize="large" /> Nothing to show here! </h2> </div>
        )}
      </div>
    </div>
  );
};

export default Feed;
