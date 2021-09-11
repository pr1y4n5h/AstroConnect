import "./App.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Signup from "./Pages/Signup/Signup";
import Login from "./Pages/Login/Login";
import Profile from "./Pages/Profile/Profile";
import { Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import Home from "./Pages/Home/Home";
import { fetchAllUsers, setToken, setUser } from "./Redux/userSlice";
import PostDetails from "./Pages/Post/PostDetails";
import People from "./Pages/People/People";
import { PrivateRoute } from "./PrivateRoute";

function App() {
  const dispatch = useDispatch();
  const { userInfo, token } = useSelector((state) => state.user);

  useEffect(() => {
    const savedToken = JSON.parse(localStorage?.getItem("token"));
    const savedUser = JSON.parse(localStorage?.getItem("user"));
    savedToken && dispatch(setToken(savedToken));
    savedUser && dispatch(setUser(savedUser));
  }, []);

  useEffect(() => {
    token && dispatch(fetchAllUsers({userID:userInfo?._id, token: token }));
  }, [token]);

  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <PrivateRoute path="/" element={<Home />} />
        <PrivateRoute path="/profile/:profileId" element={<Profile />} />
        <PrivateRoute path="/post/:postId" element={<PostDetails />} />
        <PrivateRoute path="/explore" element={<People />} />
      </Routes>
      <ToastContainer theme="colored" />
    </div>
  );
}

export default App;
