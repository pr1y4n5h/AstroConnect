import Feed from "../../Components/Feed/Feed";
import Navbar from "../../Components/Navbar/Navbar";
import Rightbar from "../../Components/Rightbar/Rightbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import "./Profile.style.css";
import { useParams } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import { useScrollToTop } from "../../Hooks/UseScrollToTop";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
  
  const {profileId} = useParams();

  const {allUsers} = useSelector(state => state.user)

  const dispatch = useDispatch();

  const profileOwner = allUsers.find(item => item._id === profileId)

  useScrollToTop()

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
                <span>{profileOwner?.username.charAt(0).toUpperCase()}</span>
              </div>
            </div>

            <div className="profile-info">
              <h4 className="text-xl font-extrabold font-sans">{profileOwner?.username}</h4>
              <span className="text-lg font-light font-sans"> {profileOwner?.bio} </span>
            </div>
          </div>
          <div className="profile-bottom">
            <Feed userID={profileId} />
            <Rightbar user={profileOwner}/>
          </div>
        </div>
      </div>e
    </>
  );
};

export default Profile;
