// import { useState } from "react";
// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
// } from "@material-ui/core";
// import { Edit } from "@material-ui/icons";
// import axios from "axios";

// const PostUpdateButton = ({ postID, userID, updatedPost }) => {
//   return (
//     <>
//       <Edit onClick={handleClickOpen} className="mr-3 cursor-pointer" />
//       <Dialog
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="form-dialog-title"
//       >
//         <DialogTitle id="form-dialog-title">Update your Post</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Made some typo? or wanna make some changes to your current post? Go
//             Ahead
//           </DialogContentText>
//           <TextField
//             autoFocus
//             margin="dense"
//             id="name"
//             fullWidth
//             multiline
//             value={postText}
//             onChange={(e) => setPostText(e.target.value)}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={updatePostHandler} color="primary">
//             Update
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default PostUpdateButton;
