import React from "react";
import { BgContainer, StartButton } from "./Welcome";
import welcomeImage from "../../images/landing.jpg";

const Landing = () => {
  return (
    <BgContainer>
      <img src={welcomeImage} alt="gaming-zone" />
      <StartButton href="/home">Click me to Start!</StartButton>
    </BgContainer>
  );
};

export default Landing;
