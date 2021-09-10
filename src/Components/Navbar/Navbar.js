import React from "react";
import { Search } from "@material-ui/icons";
import "./Navbar.style.css";
import { Button } from "@material-ui/core";
import {Link} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { logOutUser} from "../../Redux/userSlice";
import { toastFailText } from "../Toast";

 
const Navbar = () => {

  const {userInfo, error, token} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [isResponsive, setResponsive] = React.useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();

  const logOutHandler = () => {
      dispatch(logOutUser())
      toastFailText("You are Logged Out!");
      navigate("/login") 
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

      <div className="flex items-center justify-around">
        <ul className="flex mr-10">
          <li className="ml-6">Hi {userInfo?.username}! </li>
          <li className="ml-6">Home</li>
        </ul>
        <div className="mr-6">
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
