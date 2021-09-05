import {
  PermMedia,
  EmojiEmotions,
  Label,
  Room,
  Cancel,
} from "@material-ui/icons";
import "./Share.style.css";
import { Button } from "@material-ui/core";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { newPost } from "../../Redux/postSlice";

const Share = () => {

  const {userInfo: user} = useSelector(state => state.user);
  const {posts , error, pending} = useSelector(state => state.post)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);



  const submitHandle = async (e) => {
    e.preventDefault();
    dispatch(newPost({userId: user._id, desc: text}))
    setText("")
    
    // if (file) {
    //   const data = new FormData();
    //   const filename = Date.now() + file.name;
    //   data.append("file", file);
    //   data.append("name", filename);
    //   newPost.img = filename;
    //   try {
    //     await axios.post(
    //       "https://AstroConnect-Backend.pr1y4n5h.repl.co/upload",
    //       data
    //     );
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }
  };

  return (
    <div className="share-container">
      <div className="p-6">
        <div className="share-top">
          <input
            placeholder="What is in your mind? ;)"
            className="share-input"
            value={text}
            onChange={(evt) => setText(evt.target.value)}
          />
          <hr className="mt-6" />
        </div>
        {file && (
          <div className="relative">
            <img
              className="object-cover	w-full"
              src={URL.createObjectURL(file)}
            />
            <Cancel
              className="absolute -top-5 -right-5 cursor-pointer"
              onClick={() => setFile(null)}
            />
          </div>
        )}

        <form
          className="share-bottom"
          onSubmit={submitHandle}
          enctype="multipart/form-data"
        >
          <div className="flex justify-between">
            <label htmlFor="file" className="share-option">
              <PermMedia className="mr-1" />
              <span className="font-small text-xs">Photo/video </span>
              <input
                className="hidden"
                type="file"
                id="file"
                accept=".png, .jpeg, .jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>

            <div className="share-option">
              <Label className="mr-1" />
              <span className="font-medium text-xs"> Tag </span>
            </div>

            <div className="share-option">
              <Room className="mr-1" />
              <span className="font-medium text-xs">Location </span>
            </div>

            <div className="share-option">
              <EmojiEmotions className="mr-1" />
              <span className="font-medium text-xs">Feeling </span>
            </div>
          </div>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={text.length < 1}
          >
            Post
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Share;
