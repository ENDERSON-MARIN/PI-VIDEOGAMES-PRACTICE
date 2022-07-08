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

  &:hover {
    cursor: pointer;
    background-color: #1db954;
  }
`;

export { BgContainer, StartButton };
