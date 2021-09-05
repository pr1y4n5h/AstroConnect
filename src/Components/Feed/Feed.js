import Post from "../Post/Post";
import Share from "../Share/Share";
import "./Feed.style.css";
import { CircularProgress } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { fetchTimeline } from "../../Redux/postSlice";

const Feed = () => {
  const { userInfo } = useSelector((state) => state.user);
  const { posts, error, pending } = useSelector((state) => state.post);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!pending) {
      dispatch(fetchTimeline(userInfo));
    }
  }, []);

  return (
    <div className="feed-container">
      <div className="feed-wrapper">
        <Share />
        { pending ? (
          <div className="flex justify-center items-center h-80"> <CircularProgress color="secondary" /> </div>
        ) : (
          posts?.map((item) => <Post key={item._id} post={item} />)
        )}
      </div>
    </div>
  );
};

export default Feed;
