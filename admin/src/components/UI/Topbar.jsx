import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const TopbarStyled = styled.div`
  background: #f0f2f5;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function Topbar() {
  const { pageTitle } = useSelector(({ common }) => common);
  const { authUser } = useSelector(({ auth }) => auth);

  return (
    <TopbarStyled>
      <h3 className="text-2xl">{pageTitle}</h3>
      <div className="flex gap-4 items-center">
        <h4>
          <div>
            Hey, <span className="font-bold">{authUser.name}</span>
          </div>
          <h5 className="text-right">{authUser.role}</h5>
        </h4>
        <img src={authUser.profileImagePath} className="rounded-full w-12" />
      </div>
    </TopbarStyled>
  );
}

export default Topbar;
