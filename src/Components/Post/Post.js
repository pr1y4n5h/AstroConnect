import { MoreVert, Favorite } from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import "./Post.style.css";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Post = ({ post }) => {
  const { desc, likes } = post;

  const [user, setUser] = useState({});

  const {userInfo: authUser , error, token} = useSelector(state => state.user)
  const dispatch = useDispatch();

  async function fetchPost() {
    try {
      const { data, status } = await axios.get(
        `https://AstroConnect-Backend.pr1y4n5h.repl.co/user/${post.userId}`
      );

      if (status === 200) {
        setUser(data);
        console.log(user);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchPost();
  }, [post.userId]);

  const likeHandler = async () => {
    try {
      const {data,status} = await axios.post(`https://AstroConnect-Backend.pr1y4n5h.repl.co/posts/${post._id}/like`, {
        userId: authUser._id
      })

      if(status===200){
        alert("Post Liked")
      }
    }
    catch(error){
      console.log(error);
    }
  }

  return (
    <div className="post-container">
      <div className="p-4">
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center">
            <div className="profile-pic-sm mr-3">
              <span>{user?.username?.charAt().toUpperCase()}</span>
            </div>
            <Link to={`/profile/${post.userId}`}>
              <span className="font-semibold font-sans"> {user.username} </span>
            </Link>
            <span className="text-xs ml-3"> {format(post.createdAt)}</span>
          </div>
          <div className="post-top-right">
            <MoreVert />
          </div>
        </div>
        <div className="mt-4 ml-2">
          <div> {desc} </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div>
            <Favorite
              fontSize="small"
              className="text-red-500 cursor-pointer"
              onClick={likeHandler}
            />
            <span className="text-sm"> {likes.length} people liked this</span>
          </div>
          <div className="text-sm">9 comments</div>
        </div>
      </div>
    </div>
  );
};

export default Post;
