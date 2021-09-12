import "./Rightbar.style.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { Add, Remove } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { follow, unfollow} from "../../Redux/userSlice";
import { followUser, unfollowUser } from "../../API/Follow";
import { toastFailText, toastSuccessText } from "../Toast";

const Rightbar = ({ user }) => {
  
  const [following, setFollowing] = useState([]);
  const { userInfo: authUser, token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isFollowed, setFollowed] = useState(user?.followers?.includes(authUser?._id));

 
  const handleFollow = async () => {
    try {
      if (isFollowed) {
        await unfollowUser(user._id, authUser._id, token)
        dispatch(unfollow({ user: user._id, loggedUser: authUser._id }));
        toastFailText(`You unfollowed @${user?.username} !`)
      } else {
        await followUser(user._id, authUser._id, token)
        dispatch(follow({ user: user._id, loggedUser: authUser._id }));
        toastSuccessText(`You started following @${user?.username} !`)
      }
      setFollowed((isFollowed) => !isFollowed);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setFollowed(user?.followers?.includes(authUser?._id));
  }, [user?._id]);

  async function fetchUserFollowing() {
    try {
      const { data, status } = await axios.get(
        ` https://AstroConnect-Backend.pr1y4n5h.repl.co/user/followings/${user._id}`, { headers: { authorization: token } }
      );

      if (status === 200) {
        setFollowing(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUserFollowing();
  }, [user]);

  const ProfileRightBar = () => {
    return (
      <div className="rightbar">
        {user._id !== authUser._id && (
          <div className="mb-8">
          <Button variant="contained" color="primary" onClick={handleFollow}>
            {isFollowed ? "Unfollow" : "Follow"}
            {isFollowed ? (
              <Remove className="ml-1" />
            ) : (
              <Add className="ml-1" />
            )}
          </Button>
          </div>
        )}
        <h3 className="text-lg font-bold font-sans mb-4"> User Details </h3>
        <div className="mb-8">
          <div className="mb-4">
            <span className="font-semibold font-sans"> Username: </span>
            <span className="font-light font-sans"> {user?.username} </span>
          </div>
          <div className="mb-4">
            <span className="font-semibold font-sans"> Email: </span>
            <span className="font-light font-sans"> {user?.email} </span>
          </div>
          <div className="mb-4">
            <span className="font-semibold font-sans"> Followers: </span>
            <span className="font-light font-sans">
              {user?.followers?.length}
            </span>
          </div>
          <div className="mb-4">
            <span className="font-semibold font-sans"> Following: </span>
            <span className="font-light font-sans">
              {user?.followings?.length}
            </span>
          </div>
        </div>

        <h3 className="text-lg font-bold font-sans mb-4"> Followings</h3>
        <div className="profile-following-right-div">
          {following.map((item) => (
            <Link key={item._id} to={`/profile/${item._id}`}>
              <div className="profile-following-right">
                <div className="profile-pic-medium">
                  <span>{item.username.charAt().toUpperCase()}</span>
                </div>
                <div className="text-center">@{item.username}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="rightbar-container">
      {user && <ProfileRightBar />}
    </div>
  );
};

export default Rightbar;
