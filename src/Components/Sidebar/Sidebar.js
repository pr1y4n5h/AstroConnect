import "./Sidebar.style.css";
import {
  RssFeed,
  AccountCircle,
  Explore
} from "@material-ui/icons";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { userInfo: authUser } = useSelector((state) => state.user);

  return (
    <div className="sidebar-container">
      <div className="p-4 ">
        <ul className="p-0 m-0 list-none">
          <NavLink to="/" end>
            <li className="flex items-center my-12 text-xl hover:underline">
              <RssFeed className="mr-4" />
              <span>Feed</span>
            </li>
          </NavLink>
          <NavLink to={`/profile/${authUser?._id}`}>
            <li className="flex items-center my-12 text-xl hover:underline">
              <AccountCircle className="mr-4" />
              <span>My Profile</span>
            </li>
          </NavLink>
          <NavLink to="/explore">
            <li className="flex items-center my-12 text-xl hover:underline">
              <Explore className="mr-4" />
              <span>Explore</span>
            </li>
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
