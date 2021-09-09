import { useSelector } from "react-redux";
import { Route, Navigate } from "react-router-dom";
export function PrivateRoute({path, ...props}) {

    const { token } = useSelector(
      (state) => state.user
    );

    const {token} = useAuth();

    return token ? (<Route {...props} path={path} />) : (<Navigate state={{from: path }} replace to="/login" /> )
    
}