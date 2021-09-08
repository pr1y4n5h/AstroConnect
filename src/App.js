import "./App.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Components/Navbar/Navbar";
import Sidebar from "./Components/Sidebar/Sidebar";
import Signup from "./Pages/Signup/Signup";
import Login from "./Pages/Login/Login";
import Profile from "./Pages/Profile/Profile";
import { Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import Home from "./Pages/Home/Home";
import { setToken, setUser } from "./Redux/userSlice";
import PostDetails from "./Pages/Post/PostDetails";
import People from "./Pages/People/People";

function App() {

  const dispatch = useDispatch();
  const { userInfo, pending, error, token } = useSelector(
    (state) => state.user
  );

  // useEffect(() => {
  //   dispatch(setToken(JSON.parse(localStorage?.getItem("token"))))
  //   dispatch(setUser(JSON.parse(localStorage?.getItem("user"))))
  // }, [])

  console.log("Main", userInfo)
  
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/post/:postId" element={<PostDetails />} />
        <Route path="/explore" element={<People />} />
      </Routes>
      <ToastContainer theme="colored" />
    </div>
  );
}

export default App;
