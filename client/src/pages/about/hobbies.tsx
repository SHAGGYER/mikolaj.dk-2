import React, { useContext, useEffect } from "react";
import Hobbies from "components/About/Hobbies";
import PublicContext from "contexts/PublicContext";
import Meta from "components/Meta";

export default function MyHobbies() {
  const { setMeta } = useContext(PublicContext);

  useEffect(() => {
    setMeta({
      title: "My Hobbies",
      description: "Discover my hobbies and what ticks me.",
      keywords: "Hobbies",
    });
  }, []);

  return (
    <React.Fragment>
      <Hobbies />
    </React.Fragment>
  );
}
