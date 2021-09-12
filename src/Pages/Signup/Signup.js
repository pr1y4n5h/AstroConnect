import { useEffect, useState, useRef } from "react";
import { FaUser, FaKey, FaEye, FaEyeSlash } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { TextField, Button, CircularProgress } from "@material-ui/core";
import "./Signup.style.css";
import { useNavigate } from "react-router";
import axios from "axios";
import { toastSuccessText, toastFailText } from "../../Components/Toast";
import { setLoader } from "../../Redux/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Signup = () => {
  const {loader} = useSelector(state => state.user);

  const dispatch = useDispatch()
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isVisible, setVisible] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  function validateEmail(email) 
    {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }



  useEffect(() => {
    inputRef.current.focus();
  }, []);

  async function registerHandler(e) {
    e.preventDefault();
    const { username, email, password } = user;
    dispatch(setLoader());
    console.log(loader)
    try {
      const { data, status } = await axios.post(
        `https://astroconnect-backend.pr1y4n5h.repl.co/auth/register`,
        {
          username,
          email,
          password,
        }
      );

      if (data.success === true && status === 200) {
        toastSuccessText(data.message + " 🔥 ");
        return navigate("/login");
      }
    } catch (error) {
      if (error.response.status === 422) {
        toastFailText(error.response.data.message);
      } else if (error.response.status === 409) {
        toastFailText(error.response.data.message);
      } else {
        toastFailText("Something went wrong! Please try later...");
      }
    }
    finally {
      dispatch(setLoader());
      console.log(loader)
    }
  }

  return (
    <div className="login-container">
      <form className="signup-box" >
        <h1 className="text-3xl font-extrabold font-sans mb-6 text-center">
          Sign up
        </h1>

        <div className="mb-6 w-full flex items-center">
          <FaUser className="mr-2 text-xl" />
          <TextField
            className="mb-4 w-full"
            label="Enter your Username"
            variant="outlined"
            value={user.username}
            ref={inputRef}
            required
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </div>

        <div className="mb-6 w-full flex items-center">
          <HiMail className="mr-2 text-xl" />
          <TextField
            className="w-full"
            label="Enter your Email in correct format"
            id="standard-basic"
            variant="outlined"
            value={user.email}
            required
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>

        <div className="mb-6 w-full flex items-center relative">
          <FaKey className="mr-2 text-xl" />
          <TextField
            type={isVisible ? "text" : "password"}
            className="mb-4 w-full"
            label="Enter your Password"
            variant="outlined"
            value={user.password}
            required
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />

          <span
            className="eye-btn"
            onClick={() => setVisible((isVisible) => !isVisible)}
          >
            {isVisible ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <div className="mb-4 flex justify-center ">
          <Button
            className="w-full"
            variant="contained"
            color="primary"
            disabled={!validateEmail(user.email)}
            type="submit"
            onClick={registerHandler}
          >
            {loader ? (
              <CircularProgress size={25} color="secondary" />
            ) : (
              "Register"
            )}
          </Button>
        </div>
        <h3 className="text-sm font-medium font-sans mb-3 text-center">
          Already a member?
        </h3>
        <Button className="w-full" variant="outlined" color="primary" onClick={() => navigate("/login")}>
          Log in
        </Button>
      </form>
    </div>
  );
};

export default Signup;
