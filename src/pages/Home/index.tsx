import React, { useEffect, useState } from "react";
import { Main, LandingContainer, Location, ContentWrapper } from "./styles";
import InputMask from "react-input-mask";
import api from "../../services/api";
import useDebounce from "../../hooks/useDebounce";

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

  useEffect(() => {
    async function searchCEP() {
      await api
        .get(`${cepSearch}/${dataType}`)
        .then((response) => response.data)
        .then((result) => {
          setCepDataInformation(result);
        });
    }
    if (cepSearch) {
      searchCEP();
    }
  }, [cepSearch, dataType]);

  const handleChangeCEP = (value: string) => {
    const cleanCEp = value.replace(/[^0-9]+/g, "");
    setCep(cleanCEp);
  };
  const handleChangeDataType = (value: string) => {
    setDataType(value);
  };
  const formattingCode = () => {
    if (typeof cepDataInformation == "object") {
      var myJsonString = JSON.stringify(cepDataInformation);
      myJsonString = myJsonString.replace("{", "");
      myJsonString = myJsonString.replace("}", "");
      return myJsonString
        .split(",")
        .map((item, index) => (
          <p> {item + (index < myJsonString.length - 1? "," : "")}</p>
        ));
    }
    return cepDataInformation;
  };
  return (
    <LandingContainer>
      <ContentWrapper>
        <Main>
          <h1>Busque os dados do seu CEP</h1>
          <p>Basta digitar o valor no campo abaixo.</p>
          <div className="search-container">
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
              <option value="json">json</option>
              <option value="xml">xml</option>
              <option value="piped">piped</option>
              <option value="querty">querty</option>
            </select>
          </div>
        </Main>

        <Location lang="json">
          <code>{formattingCode()}</code>
        </Location>
      </ContentWrapper>
    </LandingContainer>
  );
};

export default Home;
