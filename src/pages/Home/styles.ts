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
  @media (max-width: 667px) {
    h1 {
      font-size: 2rem;
      line-height: 36px;
      text-align: center;
    }
  }
`;
export const SearchContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 10px;
  input,
  select {
    background: rgb(245, 248, 250);
    border: 1px solid rgb(211, 226, 229);
    outline: none;
    color: rgb(92, 133, 153);
    height: 50px;
    padding: 0px 6px;
    border-radius: 10px;
    width: 100%;
  }
`;
export const Code = styled.pre`
  position: relative;
  margin-top: 20px;

  min-height: 300px;
  width: 100%;
  flex-wrap: wrap;
  background: #f4f4f4;
  border: 1px solid #ddd;
  border-left: 3px solid rgb(92, 133, 153);
  color: #666;
  page-break-inside: avoid;
  font-family: monospace;
  font-size: 15px;
  line-height: 1.6;
  margin-bottom: 1.6em;
  max-width: 100%;
  overflow: auto;
  padding: 1em 1.5em;
  display: block;
  word-wrap: break-word;

  pre {
    overflow-x: auto;
  }

  & strong {
    font-weight: 800;
  }
  code {
    white-space: pre-wrap;
    width: 100%;
  }
  @media (max-width: 667px) {
    p {
      font-size: 14px;
      line-height: 22px;
      white-space: pre-wrap;
    }
  }
`;
