import { useSelector } from "react-redux";
import Navbar from "../../Components/Navbar/Navbar";
import PeopleCard from "../../Components/People/PeopleCard";
import Rightbar from "../../Components/Rightbar/Rightbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import "./people.style.css";

const People = () => {
  const { allUsers, userInfo: authUser } = useSelector((state) => state.user);
  
  const allPeople = allUsers.filter((people) => people._id !== authUser._id);
  
  return (
    <>
      <Navbar />
      <div className="flex w-full">
        <Sidebar />
        <div className="post-details">
          <div className="people-details-wrapper">
            {allPeople.map((item) => (
              <PeopleCard person={item} key={item._id} />
            ))}
          </div>
        </div>
        <Rightbar />
      </div>
    </>
  );
};

export default People;
