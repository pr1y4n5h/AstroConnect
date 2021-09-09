import axios from "axios";
import { useEffect, useState } from "react";

export function useGetAuthor(userID, postID) {
  const [user, setUser] = useState();

  async function getIndividualUser() {
    try {
      const { data, status } = await axios.get(
        `https://AstroConnect-Backend.pr1y4n5h.repl.co/user/${userID}`
      );

      if (status === 200) {
        setUser(data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getIndividualUser();
  }, []);

  return user;
}
