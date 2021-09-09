import "./Rightbar.style.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { Add, Remove } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser } from "../../Redux/userSlice";

const Rightbar = ({ user }) => {
  
  const [following, setFollowing] = useState([]);
  const [isFollowed, setFollowed] = useState(false);
  const { userInfo: authUser, token } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleFollow = async () => {
    try {
      if (isFollowed) {
        await axios.post(
          `https://AstroConnect-Backend.pr1y4n5h.repl.co/user/${user._id}/unfollow`,
          {
            userId: authUser._id,
          }
        );
        dispatch(unfollowUser(user._id));
        // setFollowing((following) =>
        //   following.filter((item) => item !== authUser._id)
        // );
      } else {
        await axios.post(
          `https://AstroConnect-Backend.pr1y4n5h.repl.co/user/${user._id}/follow`,
          {
            userId: authUser._id,
          }
        );
        dispatch(followUser(user._id));
        // setFollowing((following) => [...following, authUser._id]);
      }
      setFollowed((isFollowed) => !isFollowed);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setFollowed(authUser?.followings?.includes(user?._id));
    console.log(user);
  }, [authUser, user]);

  async function fetchFollowing() {
    try {
      const { data, status } = await axios.get(
        ` https://AstroConnect-Backend.pr1y4n5h.repl.co/user/followings/${user._id}`
      );

      if (status === 200) {
        setFollowing(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  console.log(isFollowed);

  useEffect(() => {
    fetchFollowing();
  }, [user]);

  const ProfileRightBar = () => {
    return (
      <>
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
            <Link to={`/profile/${item._id}`}>
              <div className="profile-following-right">
                <div className="profile-pic-medium">
                  <span>{item.username.charAt().toUpperCase()}</span>
                </div>
                <div className="text-center">{item.username}</div>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };

  const HomeRightBar = () => {
    return <></>;
  };

  return (
    <div className="rightbar-container">
      {user ? <ProfileRightBar /> : <HomeRightBar />}
    </div>
  );
};

export default Rightbar;
