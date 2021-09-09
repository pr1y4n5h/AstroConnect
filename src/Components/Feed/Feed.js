import Post from "../Post/Post";
import Share from "../Share/Share";
import "./Feed.style.css";
import { CircularProgress } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTimeline, fetchCurrentUserPosts } from "../../Redux/postSlice";

const Feed = ({userID}) => {
  const { userInfo } = useSelector((state) => state.user);
  const { posts, pending } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!pending) {
      userID ? dispatch(fetchCurrentUserPosts(userID)) : dispatch(fetchTimeline(userInfo));
    }
  }, [userID]);

  return (
    <div className="feed-container">
      <div className="w-full">
        <Share user={userID} />
        { pending ? (
          <div className="flex justify-center items-center h-80"> <CircularProgress color="secondary" /> </div>
        ) : (

          posts.length > 0 ? (
          userID ? posts?.map((item) => <Post key={item._id} post={item} />) : 
          posts?.map((item) => <Post key={item._id} post={item} />)) : <div className="h-80 flex items-center justify-center w-full"> <h2 className="text-center"> Nothing to show here... </h2> </div>
        )}
      </div>
    </div>
  );
};

export default Feed;
