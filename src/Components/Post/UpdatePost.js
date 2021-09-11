import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPost } from "../../Redux/postSlice";

const PostUpdateButton = ({ postID, userID, currentPost }) => {
  const dispatch = useDispatch();
  const {token} = useSelector(state => state.user)
  const [open, setOpen] = useState(false);

  const [postText, setPostText] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
    setPostText(currentPost?.desc);
  };

  const handleClose = () => {
    setOpen(false);
    setPostText("");
  };

  const updatePostHandler = async () => {
    try {
      const { data, status } = await axios.post(
        `https://AstroConnect-Backend.pr1y4n5h.repl.co/posts/${postID}`,
        {
          userId: userID,
          desc: postText,
        }, { headers: { authorization: token }}
      );

      if (status === 200) {
        dispatch(updateCurrentPost(postText));
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Edit onClick={handleClickOpen} className="mr-3 cursor-pointer" />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Update your Post</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Made some typo? or wanna make some changes to your current post? Go
            Ahead
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
          <Button
            disabled={postText.length < 1}
            onClick={updatePostHandler}
            color="primary"
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PostUpdateButton;
