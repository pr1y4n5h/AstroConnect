import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Rightbar from "../../Components/Rightbar/Rightbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import "./people.style.css";

const People = () => {

  const [people, setPeople] = useState([]);

  async function fetchPeople() {
    try {
      const {data, status} = axios.get(`https://AstroConnect-Backend.pr1y4n5h.repl.co/user/61304e820abddf3713ad0013/allusers`)

      if(status === 200) {
        // setPeople(data)
        console.log("people", data)
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  // console.log(people)

  useEffect(() => {
    fetchPeople()
  }, [])

  return (
    <>
      <Navbar />
      <div className="flex w-full">
        <Sidebar />
        <div className="post-details">
          <div className="people-details-wrapper">

          </div>
        </div>
        <Rightbar />
      </div>
    </>
  );
};

export default People;
