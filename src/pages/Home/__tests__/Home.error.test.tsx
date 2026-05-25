import { render, screen } from "@testing-library/react";
import Home from "@/pages/Home";
import { useCep } from "@/hooks/useCep";

vi.mock("@/hooks/useCep", () => ({
  useCep: vi.fn(),
}));

beforeEach(() => {
  vi.mocked(useCep).mockReturnValue({
    rawCep: "99999999",
    setRawCep: vi.fn(),
    cep: "99999999",
    dataType: "json" as const,
    setDataType: vi.fn(),
    result: null,
    status: "error" as const,
    error: "CEP não encontrado",
    history: [],
    clearHistory: vi.fn(),
    searchFromHistory: vi.fn(),
  });
});

test("exibe mensagem de erro", () => {
  render(<Home />);
  expect(screen.getByText("CEP não encontrado")).toBeInTheDocument();
});
