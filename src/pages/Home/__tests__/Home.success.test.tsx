import { render, screen } from "@testing-library/react";
import Home from "@/pages/Home";
import { useCep } from "@/hooks/useCep";

vi.mock("@/hooks/useCep", () => ({
  useCep: vi.fn(),
}));

const mockResult = {
  cep: "01001-000",
  logradouro: "Praça da Sé",
  complemento: "",
  bairro: "Sé",
  localidade: "São Paulo",
  uf: "SP",
  ibge: "3550308",
  gia: "1004",
  ddd: "11",
  siafi: "7107",
};

beforeEach(() => {
  vi.mocked(useCep).mockReturnValue({
    rawCep: "01001000",
    setRawCep: vi.fn(),
    cep: "01001000",
    dataType: "json" as const,
    setDataType: vi.fn(),
    result: mockResult,
    status: "success" as const,
    error: null,
    history: [],
    clearHistory: vi.fn(),
    searchFromHistory: vi.fn(),
  });
});

test("exibe dados do CEP na resposta", () => {
  render(<Home />);
  expect(screen.getByText(/"cep": "01001-000"/)).toBeInTheDocument();
  expect(screen.getByText(/"logradouro": "Praça da Sé"/)).toBeInTheDocument();
  expect(screen.getByText(/"bairro": "Sé"/)).toBeInTheDocument();
  expect(screen.getByText(/"localidade": "São Paulo"/)).toBeInTheDocument();
  expect(screen.getByText(/"uf": "SP"/)).toBeInTheDocument();
});

test("exibe botão copiar quando há resultado", () => {
  render(<Home />);
  expect(screen.getByText("Copiar")).toBeInTheDocument();
});
