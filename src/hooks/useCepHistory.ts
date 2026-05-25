import { useState, useEffect, useCallback } from "react";
import type { CepData } from "../types";

const HISTORY_KEY = "viacep-history";
const MAX_HISTORY = 10;

function loadHistory(): CepData[] {
  try {
    const saved = localStorage.getItem(HISTORY_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function useCepHistory() {
  const [history, setHistory] = useState<CepData[]>(loadHistory);

  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }, [history]);

  const addToHistory = useCallback((data: CepData) => {
    setHistory((prev) => {
      const filtered = prev.filter((h) => h.cep !== data.cep);
      return [data, ...filtered].slice(0, MAX_HISTORY);
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem(HISTORY_KEY);
  }, []);

  return { history, addToHistory, clearHistory };
}
