import type { CepData } from "@/types";

export type FormatType = "json" | "address" | "xml";

export function formatAddress(
  data: CepData | string,
  format: FormatType
): string {
  if (typeof data === "string") {
    return data;
  }

  switch (format) {
    case "json": {
      const entries = Object.entries(data).filter(([k]) => k !== "erro");
      return entries.map(([key, value]) => `"${key}": "${value}"`).join(",\n");
    }

    case "address": {
      const parts: string[] = [];
      if (data.logradouro) parts.push(data.logradouro);
      if (data.complemento) parts.push(data.complemento);
      if (data.bairro) parts.push(data.bairro);

      const cityLine = [data.localidade, data.uf].filter(Boolean).join("/");
      if (cityLine) parts.push(cityLine);

      if (data.cep) {
        parts.push(data.cep);
      }

      return parts.join(", ");
    }

    case "xml": {
      const filtered = Object.entries(data).filter(([k]) => k !== "erro");
      const fields = filtered
        .map(([key, value]) => `  <${key}>${value}</${key}>`)
        .join("\n");
      return `<xmlcep>\n${fields}\n</xmlcep>`;
    }
  }
}
