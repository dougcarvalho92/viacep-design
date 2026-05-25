import { renderHook, act } from "@testing-library/react";
import { useCep } from "../useCep";
import { fetchCep } from "../../services/api";
import { useCepHistory } from "../useCepHistory";

vi.mock("../../services/api", () => ({
  fetchCep: vi.fn(),
}));

vi.mock("../useCepHistory", () => ({
  useCepHistory: vi.fn(() => ({
    history: [],
    addToHistory: vi.fn(),
    clearHistory: vi.fn(),
  })),
}));

beforeEach(() => {
  vi.clearAllMocks();
  localStorage.clear();
});

test("inicia com estado idle", () => {
  const { result } = renderHook(() => useCep());
  expect(result.current.status).toBe("idle");
  expect(result.current.result).toBeNull();
  expect(result.current.error).toBeNull();
});

test("atualiza o CEP bruto corretamente", () => {
  const { result } = renderHook(() => useCep());
  act(() => {
    result.current.setRawCep("01001-000");
  });
  expect(result.current.rawCep).toBe("01001-000");
  expect(result.current.cep).toBe("01001000");
});

test("alterna o tipo de dado", () => {
  const { result } = renderHook(() => useCep());
  act(() => {
    result.current.setDataType("xml");
  });
  expect(result.current.dataType).toBe("xml");
});
