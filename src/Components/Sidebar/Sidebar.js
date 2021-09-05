import "./Sidebar.style.css";
import { RssFeed, AccountCircle, Explore, Notifications, Person } from "@material-ui/icons";

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <div className="p-4">
        <ul className="p-0 m-0 list-none">
          <li className="flex items-center mb-8">
            <RssFeed className="mr-4" />
            <span>Feed</span>
          </li>
          <li className="flex items-center mb-8">
            <AccountCircle className="mr-4" />
            <span>My Posts</span>
          </li>
          <li className="flex items-center mb-8">
            <Explore className="mr-4" />
            <span>Explore</span>
          </li>
          <li className="flex items-center mb-8">
            <Person className="mr-4" />
            <span>My Profile</span>
          </li>
          <li className="flex items-center mb-8">
            <Notifications className="mr-4" />
            <span>Notification</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
