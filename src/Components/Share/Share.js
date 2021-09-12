import {
  PermMedia,
  EmojiEmotions,
  Room,
  Cancel,
} from "@material-ui/icons";
import "./Share.style.css";
import { Button, TextField } from "@material-ui/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { createNewPost } from "../../Redux/postSlice";
import axios from "axios";

const Share = ({user}) => {

  const {userInfo: authUser, token} = useSelector(state => state.user);
  const {pending} = useSelector(state => state.post)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

  const shareHandle = async (e) => {

    e.preventDefault();
    const newPost = {
      userId: authUser._id, 
      desc: text
    }
    if(file) {
      const data = new FormData();
      const filename = "astroconnect-image-"+file.name;
      data.append("file", file);
      data.append("name", filename);
      newPost.img = filename;
      try {
        await axios.post(
          "https://AstroConnect-Backend.pr1y4n5h.repl.co/upload",
          data
          );
        } catch (err) {
          console.log(err);
        }
      }
    dispatch(createNewPost({newPost: newPost, token: token}))
    setText("")
    setFile(null)
  };

  return (
    <div className="share-container">
      {!user && <div className="p-6">
        <div>
          <TextField
            label="What's in your mind?"
            multiline
            rows={4}
            className="w-full"
            value={text}
            onChange={(evt) => setText(evt.target.value)}
          />

        </div>
        {file && (
          <div className="relative mt-4">
            <img
              className="object-cover	w-full"
              src={URL.createObjectURL(file)}
            />
            <Cancel
              className="absolute -top-5 -right-5 cursor-pointer text-red-500	"
              onClick={() => setFile(null)}
            />
          </div>
        )}

        <form
          className="share-bottom"
          onSubmit={shareHandle}
        >
          <div className="flex justify-between">
            <label htmlFor="file" className="share-option">
              <PermMedia className="mr-3" />
              <span className="font-small text-xs">Share Photos </span>
              <input
                className="hidden"
                type="file" 
                id="file"
                accept=".png, .jpeg, .jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
          </div>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={text.length < 1 && !file}
          >
            {pending ? "Posting..." : "Post"}
          </Button>
        </form>
      </div>}
    </div>
  );
};

export default Share;
