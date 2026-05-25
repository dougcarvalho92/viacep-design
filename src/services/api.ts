import type { CepData } from "../types";

const BASE_URL = "https://viacep.com.br/ws/";

async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`);
  const text = await response.text();

  try {
    return JSON.parse(text) as T;
  } catch {
    return text as unknown as T;
  }
}

export function fetchCep(
  cep: string,
  dataType: "json" | "xml"
): Promise<CepData | string> {
  return apiGet<CepData | string>(`${cep}/${dataType}`);
}
