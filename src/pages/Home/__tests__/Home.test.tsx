import { render, screen } from "@testing-library/react";
import Home from "@/pages/Home";
import { useCep } from "@/hooks/useCep";

vi.mock("@/hooks/useCep", () => ({
  useCep: vi.fn(),
}));

const defaultMock = {
  rawCep: "",
  setRawCep: vi.fn(),
  cep: "",
  dataType: "json" as const,
  setDataType: vi.fn(),
  result: null,
  status: "idle" as const,
  error: null,
  history: [],
  clearHistory: vi.fn(),
  searchFromHistory: vi.fn(),
};

beforeEach(() => {
  vi.mocked(useCep).mockReturnValue(defaultMock);
});

test("renderiza o título principal", () => {
  render(<Home />);
  expect(
    screen.getByText("Busque os dados do seu CEP")
  ).toBeInTheDocument();
});

test("exibe estado vazio inicialmente", () => {
  render(<Home />);
  expect(screen.getByText("Digite um CEP para começar")).toBeInTheDocument();
});

test("renderiza o input de CEP com mask", () => {
  render(<Home />);
  const input = screen.getByPlaceholderText("Ex: 01001-000");
  expect(input).toBeInTheDocument();
});

test("renderiza o seletor de formato", () => {
  render(<Home />);
  expect(screen.getByText("JSON")).toBeInTheDocument();
  expect(screen.getByText("XML")).toBeInTheDocument();
  expect(screen.getByText("Endereço")).toBeInTheDocument();
});
