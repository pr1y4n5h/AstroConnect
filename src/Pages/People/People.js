import { useSelector, useDispatch } from "react-redux";
import Navbar from "../../Components/Navbar/Navbar";
import PeopleCard from "../../Components/People/PeopleCard";
import Rightbar from "../../Components/Rightbar/Rightbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { useScrollToTop } from "../../Hooks/UseScrollToTop";
import "./people.style.css";
import { CircularProgress } from "@material-ui/core";

const People = () => {
  const {
    allUsers,
    pending,
    userInfo: authUser,
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const allPeople = allUsers.filter((people) => people._id !== authUser._id);

  useScrollToTop();

  return (
    <>
      <Navbar />
      <div className="flex w-full">
        <Sidebar />
        <div className="post-details">
          {pending ? (
            <div className="flex justify-center items-center h-80">
              <CircularProgress color="secondary" />
            </div>
          ) : (
            <div className="people-details-wrapper">
              <h2 className="font sans font-semibold text-xl md:text-3xl mt-2 ">
                People You may know
              </h2>
              {allPeople.map((item) => (
                <PeopleCard person={item} key={item._id} />
              ))}
            </div>
          )}
        </div>
        <Rightbar />
      </div>
    </>
  );
};

export default People;
