import styled from "styled-components";

export const LandingContainer = styled.div`
  background: linear-gradient(329.54deg, #29b6d1 0%, #00c7c7 100%);
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
`;

export const ContentWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
  height: 100%;
  max-height: 680px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 3rem;
    font-weight: 900;
    line-height: 62px;
    text-align: center;
  }
  p {
    text-align: center;
    margin: 20px auto;
    font-size: 18px;
    line-height: 22px;
  }

  input,
  select {
    background: #f5f8fa;
    border: 1px solid #d3e2e5;
    outline: none;
    color: #5c8599;
    height: 64px;
    padding: 0 16px;
    border-radius: 16px;
  }
`;

export const Location = styled.pre`
  margin-top: 20px;
  font-size: 18px;
  line-height: 34px;
  min-height: 300px;
  width: 100%;
  flex-wrap: wrap;
  background: #f5f8fa;
  border: 1px solid #d3e2e5;
  outline: none;
  color: #5c8599;
  position: relative;
  pre { overflow-x: auto; }
  /* ::before {
    content: "{";
  }
  ::after {
    content: "}";
    position: absolute;
    bottom: 0;
    right: 0;
  } */
  & strong {
    font-weight: 800;
  }
  code {
    white-space: pre-wrap;
    width: 100%;
  }
`;