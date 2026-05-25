import React, { useState } from "react";
import {
  Main,
  LandingContainer,
  Code,
  ContentWrapper,
  SearchContainer,
  EmptyState,
  ErrorMessage,
  CopyButton,
  HistoryContainer,
  HistoryHeader,
  ClearButton,
  HistoryItem,
} from "./styles";
import CepInput from "@/components/CepInput";
import Loading from "@/components/Loading";
import { useCep, CepData, DataType } from "@/hooks/useCep";
import { formatAddress, FormatType } from "@/utils/format";

const Home: React.FC = () => {
  const {
    rawCep, setRawCep, dataType, setDataType,
    result, status, error,
    history, clearHistory, searchFromHistory,
  } = useCep();

  const [copied, setCopied] = useState(false);

  const displayFormat: FormatType =
    dataType === "endereco" ? "address" : dataType;

  const displayText = result ? formatAddress(result, displayFormat) : "";
  const displayLines = displayText ? displayText.split("\n") : [];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(displayText);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = displayText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderResult = () => {
    switch (status) {
      case "idle":
        return <EmptyState>Digite um CEP para começar</EmptyState>;
      case "loading":
        return <Loading />;
      case "error":
        return <ErrorMessage>{error}</ErrorMessage>;
      case "success":
        return (
          <>
            <CopyButton onClick={handleCopy}>
              {copied ? "Copiado!" : "Copiar"}
            </CopyButton>
            {displayLines.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </>
        );
    }
  };

  return (
    <LandingContainer>
      <ContentWrapper>
        <Main>
          <h1>Busque os dados do seu CEP</h1>
          <p>Digite o CEP no campo abaixo para consultar.</p>
          <SearchContainer>
            <CepInput
              mask="99999-999"
              onChange={(e) => setRawCep(e.target.value)}
              value={rawCep}
              placeholder="Ex: 01001-000"
            />
            <select
              value={dataType}
              onChange={(e) => setDataType(e.target.value as DataType)}
            >
              <option value="json">JSON</option>
              <option value="xml">XML</option>
              <option value="endereco">Endereço</option>
            </select>
          </SearchContainer>
        </Main>

        <Code>{renderResult()}</Code>

        {history.length > 0 && (
          <HistoryContainer>
            <HistoryHeader>
              <span>&#128337;</span>
              <span>Histórico</span>
              <ClearButton onClick={clearHistory}>Limpar</ClearButton>
            </HistoryHeader>
            {history.map((item: CepData) => (
              <HistoryItem key={item.cep} onClick={() => searchFromHistory(item)}>
                <strong>{item.cep}</strong> — {item.logradouro},{" "}
                {item.bairro}, {item.localidade}/{item.uf}
              </HistoryItem>
            ))}
          </HistoryContainer>
        )}
      </ContentWrapper>
    </LandingContainer>
  );
};

export default Home;
