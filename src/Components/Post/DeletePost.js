import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import axios from "axios";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const DeletePost = ({ postID, userID }) => {

  const {token} = useSelector(state => state.user)


  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();

  const handlePostDelete = async () => {
    try {
      const { data, status } = await axios.delete(
        "https://AstroConnect-Backend.pr1y4n5h.repl.co/posts/",
        {
          headers: { authorization: token },
          data: {
            userId: userID,
            postId: postID,
          },
        }
      );

      if (status === 200) {
        setOpen(false);
        navigate(`/profile/${userID}`);
      }
    } catch (err) {
      console.log("Error is", err);
    }
  };

  return (
    <>
      <Delete className="mr-3 cursor-pointer" onClick={handleClickOpen} />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Post?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this post?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePostDelete} color="primary">
            yes
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            no
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeletePost;
