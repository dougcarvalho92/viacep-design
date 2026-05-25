import { useState, useEffect, useMemo, useCallback } from "react";
import { fetchCep } from "../services/api";
import { useCepHistory } from "./useCepHistory";
import type { CepData } from "../types";

export type { CepData };
import useDebounce from "./useDebounce";

export type Status = "idle" | "loading" | "success" | "error";
export type DataType = "json" | "xml" | "endereco";

function apiFormat(dt: DataType): "json" | "xml" {
  return dt === "endereco" ? "json" : dt;
}

export function useCep() {
  const [rawCep, setRawCep] = useState("");
  const cep = rawCep.replace(/\D/g, "");
  const debouncedCep = useDebounce(cep, 1000);
  const [dataType, setDataType] = useState<DataType>("json");
  const [result, setResult] = useState<CepData | string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const { history, addToHistory, clearHistory } = useCepHistory();

  useEffect(() => {
    if (!debouncedCep) {
      setStatus("idle");
      setResult(null);
      setError(null);
      return;
    }

    if (debouncedCep.length !== 8) return;

    let cancelled = false;

    async function search() {
      setStatus("loading");
      setError(null);
      try {
        const data = await fetchCep(debouncedCep, apiFormat(dataType));
        if (cancelled) return;

        const hasError =
          typeof data === "string"
            ? data.includes("<erro>true</erro>")
            : data.erro === true;

        if (hasError) {
          throw new Error("CEP não encontrado");
        }

        setResult(data);
        setStatus("success");

        if (typeof data !== "string" && "cep" in data && !data.erro) {
          addToHistory(data);
        }
      } catch (err: unknown) {
        if (cancelled) return;
        if (err instanceof Error) {
          setError(
            err.message === "Failed to fetch"
              ? "Erro de conexão. Verifique sua internet."
              : err.message
          );
        } else {
          setError("Erro desconhecido");
        }
        setStatus("error");
      }
    }

    search();

    return () => {
      cancelled = true;
    };
  }, [debouncedCep, dataType, addToHistory]);

  const formattedLines = useMemo(() => {
    if (!result) return [];
    if (typeof result === "string") {
      return result.split("\n");
    }
    return Object.entries(result).map(
      ([key, value]) => `"${key}": "${value}"`
    );
  }, [result]);

  const searchFromHistory = useCallback((item: CepData) => {
    setRawCep(item.cep);
  }, []);

  return {
    rawCep,
    setRawCep,
    cep,
    dataType,
    setDataType,
    result,
    status,
    error,
    formattedLines,
    history,
    clearHistory,
    searchFromHistory,
  };
}
