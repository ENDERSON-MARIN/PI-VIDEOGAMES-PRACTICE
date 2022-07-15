import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const GameDetailWrapper = styled.div`
  width: 55%;
  border: 1px solid var(--color-pagination);
  border-radius: 25px;
  position: absolute;
  background-color: #000000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10px;

  @media (max-width: 800px) {
    font-size: 12px;
  }
`;

export const GameDetailTitle = styled.h2`
  font-size: 25px;
  font-weight: 300;
  justify-content: center;
  display: flex;
  color: var(--color-light);
`;

export const GameDetailImg = styled.img`
  width: 640px;
  height: 400px;
  border-radius: 25px;
  margin: 15px;
`;

export const GameDetailDescription = styled.p`
  color: var(--color-light);
  font-size: 15px;
  text-align: justify;
  font-weight: 300;
  width: 50vw;
  padding: 5px;
  margin-bottom: 15px;

  @media (max-width: 800px) {
    width: 80vw;
  }
`;

export const GameDetailWrapperOthers = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  grid-auto-rows: 1fr 1fr;
  gap: 0.5px 0.5px;
  width: 50vw;

  @media (max-width: 800px) {
    width: 90vw;
  }
`;

export const GameDetailOthers = styled.p`
  justify-content: center;
  display: flex;
  padding: 10px;
  margin: 5px;
  border-radius: 15px;
  color: var(--color-light);
  background-color: var(--color-bg-variant);
`;

export const GameDetailLabel = styled.span`
  justify-content: center;
  display: flex;
`;
