import { TextField, Button, CircularProgress } from "@material-ui/core";
import "./Login.style.css";
import { FaUser, FaKey, FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Redux/userSlice";

const Login = () => {
  const { userInfo, pending, error, token } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const [isVisible, setVisible] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation(); 
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

 async function submitHandler(e) {
    e.preventDefault();
    dispatch(loginUser(credentials));
  }

  if(error === false && pending === false) {
    navigate(state?.from ? state.from : "/");
  }

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={submitHandler}>
        <h1 className="text-3xl font-extrabold font-sans mb-6 text-center">
          Login
        </h1>
        <div className="mb-8 w-full flex items-center">
          <FaUser className="mr-2 text-xl" />
          <TextField
            className="mb-4 w-full"
            label="Enter your Email"
            type="email"
            required
            variant="outlined"
            value={credentials.email}
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
          />
        </div>
        <div className="mb-8 w-full flex items-center relative">
          <FaKey className="mr-2 text-xl" />
          <TextField
            type={isVisible ? "text" : "password"}
            className="mb-4 w-full"
            label="Enter your Password"
            required
            variant="outlined"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />

          <span
            className="eye-btn"
            onClick={() => setVisible((isVisible) => !isVisible)}
          >
            {isVisible ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        { error && <div className="mb-6 text-center"> Invalid Credentials! </div>}

        <div className="mb-6 flex justify-center ">
        
          <Button
            type="submit"
            className="w-full"
            variant="contained"
            color="primary"
          >
            {pending ?  <CircularProgress size={25} color="secondary" /> : "Login"}
          </Button>
        </div>
        <h3 className="text-sm font-medium font-sans mb-3 text-center">
          Not a member yet?
        </h3>
        <Button
          onClick={() => navigate("/sign-up")}
          className="w-full"
          variant="outlined"
          color="primary"
        >
          Create an Account
        </Button>
      </form>
    </div>
  );
};

export default Login;
