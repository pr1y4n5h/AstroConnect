import { Button} from "@material-ui/core";
import { Add, Remove } from "@material-ui/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { follow, unfollow } from "../../Redux/userSlice";

const PeopleCard = ({ person }) => {
  const { userInfo: authUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [isFollowed, setFollowed] = useState(
    person?.followers?.includes(authUser?._id)
  );

  useEffect(() => {
    setFollowed(person?.followers?.includes(authUser?._id));
  }, []);

  const handleFollow = async () => {
    try {
      if (isFollowed) {
        await axios.post(
          `https://AstroConnect-Backend.pr1y4n5h.repl.co/user/${person._id}/unfollow`,
          {
            userId: authUser._id,
          }
        );
        dispatch(unfollow({ user: person._id, loggedUser: authUser._id }));
      } else {
        await axios.post(
          `https://AstroConnect-Backend.pr1y4n5h.repl.co/user/${person._id}/follow`,
          {
            userId: authUser._id,
          }
        );
        dispatch(follow({ user: person._id, loggedUser: authUser._id }));
      }
      setFollowed((isFollowed) => !isFollowed);
      console.log(isFollowed)
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="people-card">
      <div className="flex items-center">
        <div className="profile-pic-medium">
          <span>{person?.username.charAt().toUpperCase()}</span>
        </div>
        <Link to={`/profile/${person._id}`} className="ml-4 text-xl"> @{person?.username} </Link>
      </div>
      <Button onClick={handleFollow} variant="contained" color={!isFollowed ? "primary" : "default"}>
        {isFollowed ? "Unfollow" : "Follow"} {isFollowed ? (
              <Remove className="ml-1" />
            ) : (
              <Add className="ml-1" />
            )}
      </Button>
    </div>
  );
};

export default PeopleCard;
