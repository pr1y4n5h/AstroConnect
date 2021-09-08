// import { Favorite, FavoriteBorder } from "@material-ui/icons";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { addToLikes, removeFromLikes } from "../../Redux/postSlice";

// const LikeButton = ({ post, user }) => {
//   const dispatch = useDispatch();

//   const isLiked = () => post?.likes?.includes(user._id);

//   const likeHandler = async () => {
//     try {
//       if (isLiked()) {
//         const { status } = await axios.post(
//           `https://AstroConnect-Backend.pr1y4n5h.repl.co/posts/${post._id}/like`,
//           {
//             userId: user._id,
//             type: "REMOVE",
//           }
//         );
//         if (status === 200) {
//           dispatch(removeFromLikes({ postId: post._id, userId: user._id }));
//         }
//       } else {
//         const { status } = await axios.post(
//           `https://AstroConnect-Backend.pr1y4n5h.repl.co/posts/${post._id}/like`,
//           {
//             userId: user._id,
//             type: "ADD",
//           }
//         );
//         if (status === 200) {
//           dispatch(addToLikes({ postId: post._id, userId: user._id }));
//         }
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <>
//       <span onClick={likeHandler}>
//         {isLiked() ? (
//           <Favorite className="text-red-500 cursor-pointer" />
//         ) : (
//           <FavoriteBorder className="text-red-500 cursor-pointer" />
//         )}
//       </span>
//     </>
//   );
// };

// export default LikeButton;
