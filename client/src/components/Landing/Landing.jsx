import React from "react";
import { BgContainer, StartButton } from "./styles";
import bgImage from "../../images/landing.jpg";

const Landing = () => {
  return (
    <BgContainer>
      <img src={bgImage} alt="gaming-zone" />
      <StartButton href="/home">Go to home to start!</StartButton>
    </BgContainer>
  );
};

export default Landing;
