import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

export const RestrictedRoute = ({ component: Component, ...rest }) => {
  const { authUser } = useSelector(({ auth }) => auth);
  console.log(authUser);

  return (
    <Route
      {...rest}
      render={(props) =>
        authUser ? <Component {...props} /> : <Redirect to="/signin" />
      }
    />
  );
};
