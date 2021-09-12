import { Button} from "@material-ui/core";
import { Add, Remove } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { followUser, unfollowUser } from "../../API/Follow";
import { follow, unfollow } from "../../Redux/userSlice";
import { toastFailText, toastSuccessText } from "../Toast";
import "./peopleCard.style.css"

const PeopleCard = ({ person }) => {
  const { userInfo: authUser, token } = useSelector((state) => state.user);
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
        await unfollowUser(person._id, authUser._id, token)
        dispatch(unfollow({ user: person._id, loggedUser: authUser._id }));
        toastFailText(`You unfollowed @${person?.username} !`)

      } else {
        await followUser(person._id, authUser._id, token)
        dispatch(follow({ user: person._id, loggedUser: authUser._id }));
        toastSuccessText(`You started following @${person?.username} !`)
      }
      setFollowed((isFollowed) => !isFollowed);
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
        <Link to={`/profile/${person._id}`} className="ml-4 text-base md:text-xl"> @{person?.username} </Link>
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
