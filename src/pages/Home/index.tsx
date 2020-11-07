import React, { useEffect, useState } from "react";
import { Main, LandingContainer, Location, ContentWrapper, SeachContainer } from "./styles";
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

  useEffect(() => {
    async function searchCEP() {
      setLoading(true);
      await api
        .get(`${cepSearch}/${dataType}`)
        .then((response) => response.data)
        .then((result) => {
 
          if (result.error === true) {
            setCepDataInformation("");
            throw new Error(result);
         
          }
          if(result.erro !== true){
            setCepDataInformation(result);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
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
    if(!cepDataInformation){
      return "CEP não encontrado!"
    }
    if (typeof cepDataInformation == "object") {
      var myJsonString = JSON.stringify(cepDataInformation);
      myJsonString = myJsonString.replace("{", "");
      myJsonString = myJsonString.replace("}", "");
      return myJsonString
        .split(",")
        .map((item, index) => (
          <p> {item + (index < myJsonString.length - 1 ? "," : "")}</p>
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
          <SeachContainer>
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
          </SeachContainer>
        </Main>

        <Location lang="json">
          {loading ? <Loading /> : formattingCode()}
        </Location>
      </ContentWrapper>
    </LandingContainer>
  );
};

export default Home;
