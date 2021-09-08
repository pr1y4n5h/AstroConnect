import axios from "axios";
import { useEffect, useState } from "react";
import "./postdetails.style.css";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import {
  getCurrentPost,
  updateCurrentPost,
  updatePosts,
} from "../../Redux/postSlice";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Rightbar from "../../Components/Rightbar/Rightbar";
import { UseGetIndividualUser } from "../../Hooks/useGetIndividualUser";
import { Edit, Delete, Favourite, AccessTimeSharp } from "@material-ui/icons";
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
  const { currentPost, posts, isEditable } = useSelector((state) => state.post);
  const { userInfo: authUser } = useSelector((state) => state.user);
  const { postId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isEdit, setEdit] = useState(false);

  const [post, setPost] = useState();
  const [postText, setPostText] = useState(post?.desc);

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const currentUser = UseGetIndividualUser(post?.userId, postId);

  useEffect(() => {
    if(post?.userId === authUser._id) {
      setEdit(true)
    }
  })


  async function fetchThisPost(postID) {

    try {
      const {data, status} = await axios.get(`https://AstroConnect-Backend.pr1y4n5h.repl.co/posts/${postID}`);

      if(status === 200){
        setPost(data)
      }
    }
    catch(error) {
      console.log(error)
    }
  }


  useEffect(() => {
    // dispatch(getCurrentPost(postId));

    fetchThisPost(postId)
  }, [postId]);

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
        
        setPost(postText)
        setOpen(false);

      }
    } catch (error) {
      console.log(error);
    }
  };

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
              <p> {post?.desc} </p>
            </div>
          </div>
        </div>
        <Rightbar />
      </div>
    </>
  );
};

export default PostDetails;
