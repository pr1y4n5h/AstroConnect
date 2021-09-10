import axios from "axios";
import { useEffect, useState } from "react";
import "./postdetails.style.css";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Rightbar from "../../Components/Rightbar/Rightbar";
import {
  Edit,
  Delete,
  Favourite,
  AccessTimeSharp,
  Favorite,
  FavoriteBorder,
} from "@material-ui/icons";
import moment from "moment";
import DeletePost from "../../Components/Post/DeletePost";
import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const PostDetails = () => {
  const { userInfo: authUser, allUsers } = useSelector((state) => state.user);
  const { posts, pending } = useSelector((state) => state.post);
  const { postId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentPost, setCurrentPost] = useState({});
  const [postText, setPostText] = useState("");

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function fetchCurrentPost(postID) {
    try {
      const { data, status } = await axios.get(
        `https://AstroConnect-Backend.pr1y4n5h.repl.co/posts/${postID}`
      );

      if (status === 200) {
        setCurrentPost(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  
  const currentUser = allUsers.find((item) => item._id === currentPost?.userId);

  // const isEditable = currentUser?._id === 


  
  useEffect(() => {
    // dispatch(getCurrentPost(postId));
    fetchCurrentPost(postId);
  }, []);

  useEffect(() => {
    if(currentPost) {
      if(currentUser?._id === authUser._id)
      console.log((currentUser?._id === authUser._id))
    }

    console.log(currentUser?._id)
  },[])

  const processJoinedDate = (createdTime) => {
    const currentDate = new Date(createdTime).toUTCString().substring(5, 16);
    return currentDate;
  };

  const updatePostHandler = async () => {
    try {
      const { data, status } = await axios.post(
        `https://AstroConnect-Backend.pr1y4n5h.repl.co/posts/${postId}`,
        {
          userId: authUser._id,
          desc: postText,
        }
      );
      if (status === 200) {
        // dispatch(updatePosts({postId, postText}))

        // dispatch(updateCurrentPost(postText));

        // setPost(postText)

        setCurrentPost({ ...currentPost, desc: postText });
        setPostText(currentPost?.desc);
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isLiked = () => currentPost?.likes?.includes(authUser._id);

  async function likeHandler() {
    try {
      if (isLiked()) {
        const { status } = await axios.post(
          `https://AstroConnect-Backend.pr1y4n5h.repl.co/posts/${postId}/like`,
          {
            userId: authUser._id,
            type: "REMOVE",
          }
        );
        if (status === 200) {
          setCurrentPost({
            ...currentPost,
            likes: currentPost.likes.filter((item) => item !== authUser._id),
          });
        }
      } else {
        const { status } = await axios.post(
          `https://AstroConnect-Backend.pr1y4n5h.repl.co/posts/${postId}/like`,
          {
            userId: authUser._id,
            type: "ADD",
          }
        );
        if (status === 200) {
          setCurrentPost({
            ...currentPost,
            likes: [...currentPost.likes, authUser._id],
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const { likes, img } = currentPost;

  return (
    <>
      <Navbar />
      <div className="flex w-full">
        <Sidebar />
        <div className="post-details">
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
                    <AccessTimeSharp fontSize="small" />{" "}
                    {processJoinedDate(currentPost?.createdAt)}
                  </div>
                </div>
              </div>

              {/* ${!isEdit && "hidden"} */}

              <div className={`mt-4 `}>
                <Edit
                  onClick={handleClickOpen}
                  className="mr-3 cursor-pointer"
                />
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="form-dialog-title"
                >
                  <DialogTitle id="form-dialog-title">
                    Update your Post
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Made some typo? or wanna make some changes to your current
                      post? Go Ahead
                    </DialogContentText>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      fullWidth
                      multiline
                      value={postText}
                      onChange={(e) => setPostText(e.target.value)}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={updatePostHandler} color="primary">
                      Update
                    </Button>
                  </DialogActions>
                </Dialog>

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
                <button  className="mr-4" onClick={likeHandler}>
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
        </div>
        <Rightbar />
      </div>
    </>
  );
};

export default PostDetails;
