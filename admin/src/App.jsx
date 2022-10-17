import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser, setSettings } from "./store/reducers/Auth";
import HttpClient from "./utilities/HttpClient";
import { Route, Switch, useHistory } from "react-router-dom";
import { Page } from "./components/UI/Page";
import Routes from "./components/Routes";
import AppWrapper from "./components/AppWrapper";

function App() {
  const [initiated, setInitiated] = useState(false);
  const dispatch = useDispatch();
  const { authUser } = useSelector(({ auth }) => auth);
  const history = useHistory();

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (location.pathname === "" || location.pathname === "/") {
      history.push("/dashboard");
    } else if (authUser && location.pathname === "/signin") {
      history.push("/dashboard");
    }
  }, [authUser]);

  const init = async () => {
    const { data } = await HttpClient().get("/api/auth/admin/init");
    dispatch(setAuthUser(data.user));
    dispatch(setSettings(data.settings));
    setInitiated(true);
  };

  return (
    <React.Fragment>
      {initiated ? (
        <AppWrapper>
          <Page>
            <Routes />
          </Page>
        </AppWrapper>
      ) : (
        <div>Loading</div>
      )}
    </React.Fragment>
  );
}

export default App;
