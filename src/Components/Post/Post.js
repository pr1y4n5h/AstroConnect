import { Favorite, FavoriteBorder } from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import "./Post.style.css";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToLikes, removeFromLikes } from "../../Redux/postSlice";
import { UseGetIndividualUser } from "../../Hooks/useGetIndividualUser";

const Post = ({ post }) => {
  const { desc, likes } = post;
  const user = UseGetIndividualUser(post.userId);
  const { userInfo: authUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  
  const isLiked = () => post?.likes?.includes(authUser._id);

  const likeHandler = async () => {
    try {
      if (isLiked()) {
        const { status } = await axios.post(
          `https://AstroConnect-Backend.pr1y4n5h.repl.co/posts/${post._id}/like`,
          {
            userId: authUser._id,
            type: "REMOVE",
          }
        );
        if (status === 200) {
          dispatch(removeFromLikes({postId: post._id, userId: authUser._id}));
        }
      } else {
        const { status } = await axios.post(
          `https://AstroConnect-Backend.pr1y4n5h.repl.co/posts/${post._id}/like`,
          {
            userId: authUser._id,
            type: "ADD",
          }
        );
        if (status === 200) {
          dispatch(addToLikes({postId: post._id, userId: authUser._id}));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="post-container">
      <div className="p-4">
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center">
            <div className="profile-pic-sm mr-3">
              <span>{user?.username?.charAt().toUpperCase()}</span>
            </div>
            <Link to={`/profile/${post.userId}`}>
              <span className="font-semibold font-sans">{user?.username}</span>
            </Link>
            <span className="text-xs ml-3"> {format(post.createdAt)}</span>
          </div>
        </div>
        <Link to={`/post/${post._id}`}>
          <div className="mt-4 ml-2">
            <div> {desc} </div>
          </div>
        </Link>
        <div className="flex justify-between items-center mt-4">
          <div>
          <span onClick={likeHandler}>
            { isLiked() ? <Favorite
              className="text-red-500 cursor-pointer"
            /> : <FavoriteBorder className="text-red-500 cursor-pointer" />  }
            </span>
            <span className="text-sm"> {likes.length < 1 && "Be the first one to Like this post"} {isLiked() && likes.length === 1 && "You Liked this post!"} {likes.length > 1 && isLiked() &&  `You and ${likes.length - 1} others liked this Post!` } {!isLiked() && likes.length !== 0 && `${likes.length} people liked this Post`}  </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
