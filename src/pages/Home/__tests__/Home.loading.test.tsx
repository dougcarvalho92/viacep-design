import { render, screen } from "@testing-library/react";
import Home from "@/pages/Home";
import { useCep } from "@/hooks/useCep";

vi.mock("@/hooks/useCep", () => ({
  useCep: vi.fn(),
}));

beforeEach(() => {
  vi.mocked(useCep).mockReturnValue({
    rawCep: "01001000",
    setRawCep: vi.fn(),
    cep: "01001000",
    dataType: "json" as const,
    setDataType: vi.fn(),
    result: null,
    status: "loading" as const,
    error: null,
    history: [],
    clearHistory: vi.fn(),
    searchFromHistory: vi.fn(),
  });
});

test("exibe loading durante a busca", () => {
  render(<Home />);
  expect(screen.getByText("Loading...")).toBeInTheDocument();
});
