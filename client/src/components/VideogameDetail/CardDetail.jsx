import {
  GameDetailWrapper,
  GameDetailImg,
  GameDetailDescription,
  GameDetailTitle,
  GameDetailWrapperOthers,
  GameDetailOthers,
  Wrapper,
} from "./CardDetail.js";

const CardDetail = ({ game }) => {
  // console.log(game);
  return (
    <Wrapper>
      <GameDetailWrapper>
        <GameDetailTitle>{game.name}</GameDetailTitle>
        <GameDetailImg src={game.background_image} alt="Game" />
        <GameDetailWrapperOthers>
          <GameDetailOthers>
            Release date : {game.released ? game.released : "N/A"}
          </GameDetailOthers>
          <GameDetailOthers>
            Rating : {game.rating ? game.rating : "N/A"}
          </GameDetailOthers>
          <GameDetailOthers>Genres : {game.genres}</GameDetailOthers>
          <GameDetailOthers>
            Platforms : {game.platforms ? game.platforms : "N/A"}
          </GameDetailOthers>
        </GameDetailWrapperOthers>
        <GameDetailDescription> {game.description}</GameDetailDescription>
      </GameDetailWrapper>
    </Wrapper>
  );
};

export default CardDetail;
