import Feed from "../../Components/Feed/Feed";
import Navbar from "../../Components/Navbar/Navbar";
import Rightbar from "../../Components/Rightbar/Rightbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import "./Profile.style.css";
import { useParams } from "react-router";
import { useScrollToTop } from "../../Hooks/UseScrollToTop";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "../../Redux/userSlice";
import { useEffect } from "react";

const Profile = () => {
  const { profileId } = useParams();
  const dispatch = useDispatch();

  const { allUsers, currentUser } = useSelector((state) => state.user);

  // const profileOwner = allUsers.find((item) => item._id === profileId);

  useEffect(() => {
    dispatch(fetchCurrentUser(profileId))
  }, [])

  useScrollToTop();

  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="profile-right">
          <div className="profile-top">
            <div className="profile-cover">
              <img
                src="https://cdn.pixabay.com/photo/2016/10/20/18/35/earth-1756274_960_720.jpg"
                style={{ width: "100%", height: "250px", objectFit: "cover" }}
              />
              <div className="profile-pic">
                <span>{currentUser?.username?.charAt(0).toUpperCase()}</span>
              </div>
            </div>

            <div className="profile-info">
              <h4 className="text-xl font-extrabold font-sans">
                {currentUser?.username}
              </h4>
              <span className="text-lg font-light font-sans">
                {currentUser?.bio}
              </span>
            </div>
          </div>
          <div className="profile-bottom">
            <Feed userID={profileId} />
            <Rightbar user={currentUser} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
