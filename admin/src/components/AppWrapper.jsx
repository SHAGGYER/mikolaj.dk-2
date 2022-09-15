import React from "react";
import Sidebar from "./UI/Sidebar";
import Topbar from "./UI/Topbar";
import { Page } from "./UI/Page";
import Routes from "./Routes";
import { useSelector } from "react-redux";

function AppWrapper(props) {
  const { authUser } = useSelector(({ auth }) => auth);

  return (
    <div className="flex h-full">
      {authUser && <Sidebar />}
      <article className="w-full flex flex-col">
        {authUser && <Topbar />}
        {props.children}
      </article>
    </div>
  );
}

export default AppWrapper;
