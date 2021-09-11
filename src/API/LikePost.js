import axios from "axios";

export async function likePost(postId, userId) {
  try {
    await axios.post(
      `https://AstroConnect-Backend.pr1y4n5h.repl.co/posts/${postId}/like`,
      {
        userId: userId,
        type: "ADD",
      }
      );
  } catch (error) {
    console.log(error);
  }
}

export async function unlikePost(postId, userId) {
  try {
    await axios.post(
      `https://AstroConnect-Backend.pr1y4n5h.repl.co/posts/${postId}/like`,
      {
        userId: userId,
        type: "REMOVE",
      }
    );
  } catch (error) {
    console.log(error);
  }
}
