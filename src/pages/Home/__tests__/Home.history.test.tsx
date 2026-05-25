import { render, screen } from "@testing-library/react";
import Home from "@/pages/Home";
import { useCep } from "@/hooks/useCep";

vi.mock("@/hooks/useCep", () => ({
  useCep: vi.fn(),
}));

const mockHistory = [
  {
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
  },
  {
    cep: "20040-020",
    logradouro: "Avenida Rio Branco",
    complemento: "",
    bairro: "Centro",
    localidade: "Rio de Janeiro",
    uf: "RJ",
    ibge: "3304557",
    gia: "",
    ddd: "21",
    siafi: "6001",
  },
];

beforeEach(() => {
  vi.mocked(useCep).mockReturnValue({
    rawCep: "",
    setRawCep: vi.fn(),
    cep: "",
    dataType: "json" as const,
    setDataType: vi.fn(),
    result: null,
    status: "idle" as const,
    error: null,
    history: mockHistory,
    clearHistory: vi.fn(),
    searchFromHistory: vi.fn(),
  });
});

test("exibe histórico de consultas", () => {
  render(<Home />);
  expect(screen.getByText("Histórico")).toBeInTheDocument();
  expect(screen.getByText(/01001-000/)).toBeInTheDocument();
  expect(screen.getByText(/20040-020/)).toBeInTheDocument();
  expect(screen.getByText("Limpar")).toBeInTheDocument();
});
