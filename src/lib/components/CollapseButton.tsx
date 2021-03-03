import React, { FunctionComponent } from "react";
import styled from "styled-components";

interface Props {
  onClick: () => void;
  collapsed: boolean;
}

const CollapseButton: FunctionComponent<Props> = ({ onClick, collapsed }) => {
  return <Button$ className={collapsed?'flipX':undefined} onClick={onClick}>
    <ChevronRight />
  </Button$>;
};

const ChevronRight: FunctionComponent = () => {
  return <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
  </svg>;
};

const Button$ = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  position: absolute;
  top: 30%;
  left: -15px;
  font-weight: bold;
  border-radius: 50%;
  z-index: 3;
  background-color: #fff;
  box-shadow: 1px 1px 5px rgba(0,0,0,0.38);
  cursor: pointer;
  transition: transform 0.25s ease;
  &.flipX{
    transform: rotate(180deg) translateX(15px);
  }
  :hover{
    background-color: #eee;
  }
`;

export default CollapseButton;
