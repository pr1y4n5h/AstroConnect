import { useEffect, useState } from "react";
import "./postdetails.style.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Rightbar from "../../Components/Rightbar/Rightbar";
import {
  AccessTimeSharp,
  Favorite,
  FavoriteBorder,
} from "@material-ui/icons";
import DeletePost from "../../Components/Post/DeletePost";
import React from "react";
import {
  getCurrentPost,
  unlikeCurrentPost,
  likeCurrentPost,
} from "../../Redux/postSlice";
import { CircularProgress } from "@material-ui/core";
import { likePost, unlikePost } from "../../API/LikePost";
import PostUpdateButton from "../../Components/Post/UpdatePost";

const PostDetails = () => {
  const { userInfo: authUser, allUsers } = useSelector((state) => state.user);
  const { currentPost, status } = useSelector((state) => state.post);
  const { postId } = useParams();
  const dispatch = useDispatch();

  const [isEditable, setEditable] = useState(false);

  const currentUser = allUsers.find((item) => item._id === currentPost?.userId);

  useEffect(() => {
    dispatch(getCurrentPost(postId));
  }, [postId]);

  useEffect(() => {
    currentPost && currentUser && setEditable(currentPost.userId === authUser._id);
  },[currentPost, currentUser])

  const processJoinedDate = (createdTime) => {
    const currentDate = new Date(createdTime).toUTCString().substring(5, 16);
    return currentDate;
  };

  const isLiked = () => currentPost?.likes?.includes(authUser._id);

  async function likeHandler() {
    if (isLiked()) {
      await unlikePost(postId, authUser._id);
      dispatch(unlikeCurrentPost({ userId: authUser._id }));
    } else {
      await likePost(postId, authUser._id);
      dispatch(likeCurrentPost({ userId: authUser._id }));
    }
  }

  const { likes, img } = currentPost;

  return (
    <>
      <Navbar />
      <div className="flex w-full">
        <Sidebar />
        <div className="post-details">
          {status.loading ? (
            <div className="flex justify-center items-center h-3/5">
              <CircularProgress color="secondary" />
            </div>
          ) : (
            <div className="post-details-wrapper">
              {/* top */}
              <div className="flex justify-between">
                <div className="flex">
                  <div className="profile-pic-medium mx-3 my-3">
                    <span className="text-xl">
                      {currentUser?.username?.charAt().toUpperCase()}
                    </span>
                  </div>

                  <div className="h-20 flex flex-col justify-between">
                    <div className="text-3xl text-black mt-3">
                      {currentUser?.username}
                    </div>
                    <div className="text-gray-600	text-sm">
                      <AccessTimeSharp fontSize="small" />
                      {processJoinedDate(currentPost?.createdAt)}
                    </div>
                  </div>
                </div>

                <div className={`mt-4 ${!isEditable && "hidden"}`}>
                  <PostUpdateButton
                    postID={postId}
                    userID={authUser._id}
                    currentPost={currentPost}
                  />
                  <DeletePost postID={postId} userID={authUser._id} />
                </div>
              </div>

              {/* body */}

              <div className="px-4 py-4">
                <div>
                  <p> {currentPost?.desc} </p>

                  {img && (
                    <img
                      className="mt-6"
                      src={`https://astroconnect-backend.pr1y4n5h.repl.co/${img}`}
                    />
                  )}
                </div>
                <div className="my-6">
                  <button className="mr-4" onClick={likeHandler}>
                    {isLiked() ? (
                      <Favorite className="text-red-500 cursor-pointer" />
                    ) : (
                      <FavoriteBorder className="text-red-500 cursor-pointer" />
                    )}
                  </button>
                  <span className="text-sm">
                    {likes?.length < 1 && "Be the first one to Like this post"}
                    {isLiked() && likes?.length === 1 && "You Liked this post!"}
                    {likes?.length > 1 &&
                      isLiked() &&
                      `You and ${likes?.length - 1} others liked this Post!`}
                    {!isLiked() &&
                      likes?.length !== 0 &&
                      `${likes?.length} people liked this Post`}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
        <Rightbar />
      </div>
    </>
  );
};

export default PostDetails;
