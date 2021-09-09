import axios from "axios";
import { useEffect, useState } from "react";
import "./postdetails.style.css";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import {
  updatePosts,
} from "../../Redux/postSlice";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Rightbar from "../../Components/Rightbar/Rightbar";
import { useGetAuthor } from "../../Hooks/useGetAuthor";
import { Edit, Delete, Favourite, AccessTimeSharp, Favorite, FavoriteBorder } from "@material-ui/icons";
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
  const { userInfo: authUser } = useSelector((state) => state.user);
  const { postId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isEdit, setEdit] = useState(false);

  const [currentPost, setCurrentPost] = useState({});

  const [postText, setPostText] = useState("");

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const currentUser = useGetAuthor(currentPost?.userId, postId);

  async function fetchCurrentPost(postID) {

    try {
      const {data, status} = await axios.get(`https://AstroConnect-Backend.pr1y4n5h.repl.co/posts/${postID}`);

      if(status === 200){
        setCurrentPost(data);
      }
    }
    catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    // dispatch(getCurrentPost(postId));
    fetchCurrentPost(postId)
    
  }, [postId]);

  useEffect(() => {
    setPostText(currentPost?.desc)
  },[currentPost?.desc])


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
        
        setCurrentPost( {...currentPost, desc: postText} ); 
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    if(currentPost?.userId === authUser._id) {
      setEdit(true)
    }
  })

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
            setCurrentPost( {...currentPost, likes: currentPost.likes.filter(item => item !== authUser._id)});
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
            setCurrentPost( {...currentPost, likes: [...currentPost.likes, authUser._id]});
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    const {likes} = currentPost

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
                    <AccessTimeSharp fontSize="small" /> 23 Sept, 2023, 6:40PM
                  </div>
                </div>
              </div>

              <div className={`mt-4 ${!isEdit && "hidden" }`}>
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
              <p> {currentPost?.desc} </p>

              <div className="my-6">

              <span onClick={likeHandler}>
            { isLiked() ? <Favorite
              className="text-red-500 cursor-pointer"
            /> : <FavoriteBorder className="text-red-500 cursor-pointer" />  }
            </span>
            <span className="text-sm"> {likes?.length < 1 && "Be the first one to Like this post"} {isLiked() && likes?.length === 1 && "You Liked this post!"} {likes?.length > 1 && isLiked() &&  `You and ${likes?.length - 1} others liked this Post!` } {!isLiked() && likes?.length !== 0 && `${likes?.length} people liked this Post`}  </span>
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
