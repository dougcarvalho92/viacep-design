import styled, { keyframes } from "styled-components";

export const LandingContainer = styled.div`
  background: linear-gradient(329.54deg, #29b6d1 0%, #00c7c7 100%);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
`;

export const ContentWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

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
    opacity: 0.9;
  }

  @media (max-width: 667px) {
    h1 {
      font-size: 2rem;
      line-height: 36px;
    }
  }
`;

export const SearchContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 10px;
  width: 100%;
  max-width: 500px;

  input, select {
    background: rgb(245, 248, 250);
    border: 1px solid rgb(211, 226, 229);
    outline: none;
    color: rgb(92, 133, 153);
    height: 50px;
    padding: 0px 12px;
    border-radius: 10px;
    width: 100%;
    font-size: 16px;
    transition: border-color 0.2s;

    &:focus {
      border-color: rgb(41, 182, 209);
    }
  }
`;

export const Code = styled.pre`
  position: relative;
  margin-top: 20px;
  min-height: 120px;
  width: 100%;
  background: #f4f4f4;
  border: 1px solid #ddd;
  border-left: 3px solid rgb(92, 133, 153);
  color: #666;
  page-break-inside: avoid;
  font-family: "Courier New", Courier, monospace;
  font-size: 14px;
  line-height: 1.6;
  max-width: 100%;
  overflow: auto;
  padding: 1em 1.5em;
  display: block;
  word-wrap: break-word;
  border-radius: 0 8px 8px 0;

  p {
    white-space: pre-wrap;
    word-break: break-all;
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 120px;
  color: #999;
  font-size: 16px;
  text-align: center;
`;

export const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 120px;
  color: #e74c3c;
  font-size: 16px;
  font-weight: 700;
  text-align: center;
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const CopyButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgb(92, 133, 153);
  color: #fff;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-family: Nunito, sans-serif;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s;
  z-index: 1;
  animation: ${fadeIn} 0.2s ease;

  &:hover {
    background: rgb(70, 110, 130);
  }

  svg {
    font-size: 14px;
  }
`;

export const HistoryContainer = styled.div`
  width: 100%;
  margin-top: 24px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(4px);
  border-radius: 10px;
  padding: 16px;

  > div:first-child {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
    font-size: 14px;
    font-weight: 700;
    opacity: 0.9;
  }
`;

export const HistoryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  font-size: 14px;
  font-weight: 700;
  opacity: 0.9;
`;

export const ClearButton = styled.button`
  margin-left: auto;
  background: none;
  border: none;
  color: #fff;
  opacity: 0.7;
  cursor: pointer;
  font-size: 13px;
  font-family: Nunito, sans-serif;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`;

export const HistoryItem = styled.button`
  display: block;
  width: 100%;
  text-align: left;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: #fff;
  padding: 10px 12px;
  border-radius: 6px;
  margin-bottom: 6px;
  cursor: pointer;
  font-size: 14px;
  font-family: Nunito, sans-serif;
  line-height: 1.4;
  transition: background 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  &:last-child {
    margin-bottom: 0;
  }

  strong {
    font-weight: 700;
  }
`;
