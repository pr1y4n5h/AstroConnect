import React from "react";
import "./Navbar.style.css";
import { Button, Menu, MenuItem } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { logOutUser } from "../../Redux/userSlice";
import { toastFailText } from "../Toast";

const Navbar = () => {
  const { userInfo: authUser, token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigateToFeed = () => {
    navigate("/");
    handleClose();
  };

  const navigateToProfile = () => {
    navigate(`/profile/${authUser?._id}`);
    handleClose();
  };

  const navigateToExplore = () => {
    navigate("/explore");
    handleClose();
  };

  const logOutHandler = () => {
    dispatch(logOutUser());
    toastFailText("You are Logged Out!");
    navigate(state?.from ? state.from : "/");
    handleClose();
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">
          <span className="text-xl md:text-xl ml-2 md:ml-4 font-bold cursor-pointer">
            AstroConnect
          </span>
        </Link>
      </div>

      <div className="flex items-center justify-between">
        <h3 className="md:mr-12">
          Hi{" "}
          <span className="text-lg font-semibold">@{authUser?.username}!</span>{" "}
        </h3>
        <div className="hidden md:block">
          <Button
            variant="contained"
            onClick={logOutHandler}
            color="primary"
            type="submit"
          >
            {token ? "Log Out" : "Log In"}
          </Button>
        </div>
        <div className="md:hidden">
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <i className="fas fa-bars text-white"></i>
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={navigateToFeed}>My Feed</MenuItem>
            <MenuItem onClick={navigateToProfile}>My Profile</MenuItem>
            <MenuItem onClick={navigateToExplore}>Explore</MenuItem>
            <MenuItem onClick={logOutHandler}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
