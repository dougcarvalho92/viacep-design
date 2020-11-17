import React, { useEffect, useState } from "react";
import {
  Main,
  LandingContainer,
  Code,
  ContentWrapper,
  SearchContainer,
} from "./styles";
import InputMask from "react-input-mask";
import api from "../../services/api";
import useDebounce from "../../hooks/useDebounce";
import Loading from "../../component/Loading";

interface JSONTypeProps {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

const Home: React.FC = () => {
  const [cep, setCep] = useState("");
  const cepSearch = useDebounce(cep, 1000);
  const [dataType, setDataType] = useState("json");
  const [cepDataInformation, setCepDataInformation] = useState<
    JSONTypeProps | string
  >();
  const [loading, setLoading] = useState(false);
  const [dataView, setDataView] = useState<string[]>([]);

  useEffect(() => {
    async function searchCEP() {
      setLoading(true);
      try {
        if (cepSearch.length === 8) {
          await api
            .get(`${cepSearch}/${dataType}`)
            .then((response) => response.data)
            .then((result) => {
              if (result.erro === true) {
                throw new Error("CEP não encontrado");
              }
              setCepDataInformation(result);
              setLoading(false);
            });
        } else {
          throw new Error("CEP inválido");
        }
      } catch (error) {
        setDataView([error.message]);
        setLoading(false);
      }
    }
    if (cepSearch) {
      searchCEP();
    }
  }, [cepSearch, dataType]);

  useEffect(() => {
    if (cepDataInformation === "") {
      setDataView([]);
    } else {
      switch (typeof cepDataInformation) {
        case "object":
          var myJsonString = JSON.stringify(cepDataInformation);
          myJsonString = myJsonString.replace("{", "");
          myJsonString = myJsonString.replace("}", "");
          const data = myJsonString.split(",");
          setDataView(data);
          break;
        case "string":
          setDataView([cepDataInformation.toString()]);
          break;
      }
    }
  }, [cepDataInformation]);

  const handleChangeCEP = (value: string) => {
    const cleanCEp = value.replace(/[^0-9]+/g, "");
    setCep(cleanCEp);
  };
  const handleChangeDataType = (value: string) => {
    setDataType(value);
  };

  return (
    <LandingContainer>
      <ContentWrapper>
        <Main>
          <h1>Busque os dados do seu CEP</h1>
          <p>Basta digitar o valor no campo abaixo.</p>
          <SearchContainer>
            <InputMask
              mask="99999-999"
              onChange={(e) => handleChangeCEP(e.target.value)}
              value={cep}
              alwaysShowMask={true}
            />
            <select
              name="datatype"
              onChange={(e) => handleChangeDataType(e.target.value)}
            >
              <option value="json">JSON</option>
              <option value="xml">XML</option>
            </select>
          </SearchContainer>
        </Main>

        <Code lang="json">
          {loading ? (
            <Loading />
          ) : (
            dataView.map((item, index) => (
              <p key={index}>
                {item + (index < dataView.length - 1 ? "," : "")}
              </p>
            ))
          )}
        </Code>
      </ContentWrapper>
    </LandingContainer>
  );
};

export default Home;
