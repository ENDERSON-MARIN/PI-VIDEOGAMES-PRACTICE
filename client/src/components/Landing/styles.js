import styled from "styled-components";

const BgContainer = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  & img {
    width: 100vw;
    height: 100vh;
  }
`;

const StartButton = styled.a`
  padding: 20px;
  background-color: #340034;
  border-radius: 90px;
  color: #fff;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: bolder;
  position: absolute;
  top: 350px;
  box-shadow: 0 0 1em 0.25em rgb(217, 176, 255),
    0 0 4em 1em rgba(191, 123, 255, 0.781),
    inset 0 0 0.75em 0.25em rgb(217, 176, 255);
  text-shadow: 0 0 0.5em rgb(217, 176, 255);
  transition: all 0.3s;

  &:hover {
    cursor: pointer;
    background-color: #1db954;
  }
`;

export { BgContainer, StartButton };
