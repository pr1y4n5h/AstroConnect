import axios from "axios";

export async function followUser(userId, loggedUser, token) {
  try {
    await axios.post(
      `https://AstroConnect-Backend.pr1y4n5h.repl.co/user/${userId}/follow`,
      {
        userId: loggedUser,
      },
      { headers: { authorization: token } }
    );
  } catch (err) {
    console.log(err);
  }
}

export async function unfollowUser(userId, loggedUser, token) {
  try {
    await axios.post(
      `https://AstroConnect-Backend.pr1y4n5h.repl.co/user/${userId}/unfollow`,
      {
        userId: loggedUser,
      },
      { headers: { authorization: token } }
    );
  } catch (err) {
    console.log(err);
  }
}
