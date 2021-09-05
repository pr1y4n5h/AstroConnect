import React from "react";
import { Search } from "@material-ui/icons";
import "./Navbar.style.css";
import { Button } from "@material-ui/core";
import {Link} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { resetToken, resetUser } from "../../Redux/userSlice";
import { toastFailText } from "../Toast";

 
const Navbar = () => {

  const {userInfo, error, token} = useSelector(state => state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logOutHandler = () => {
    if(token) {
      dispatch(resetToken())
      dispatch(resetUser())
      toastFailText("You are Logged Out!");
      navigate("/login")
    } 
  }

  return (
    <nav className="navbar">
      <div className="navbar-left">
      <Link to="/">
        <span className="text-xl ml-4 font-bold cursor-pointer">
          AstroConnect
        </span>
        </Link>
      </div>
 
      <div className="navbar-center">
        <div className="navbar-search">
          <Search className="ml-3 mr-2" />
          <input
            className="search-input"
            placeholder="Search for friend or Posts"
          />
        </div>
      </div>

      <div className="navbar-right">
        <ul className="nav-links">
          <li className="ml-6">Hi {userInfo?.username}! </li>
          <li className="ml-6">Home</li>
        </ul>
        <div className="flex">
          <Button variant="contained"
          onClick={logOutHandler}
            color="primary"
            type="submit" > {token ? "Log Out" : "Log In"} </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
