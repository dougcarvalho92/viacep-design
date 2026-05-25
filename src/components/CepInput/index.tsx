import React from "react";

type Props = {
  mask: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

function applyMask(value: string, mask: string): string {
  let result = "";
  let valueIndex = 0;
  const digits = value.replace(/\D/g, "");

  for (let i = 0; i < mask.length && valueIndex < digits.length; i++) {
    if (mask[i] === "9") {
      result += digits[valueIndex];
      valueIndex++;
    } else {
      result += mask[i];
    }
  }

  return result;
}

const CepInput: React.FC<Props> = ({ mask, value, onChange, placeholder }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    const masked = applyMask(raw, mask);

    const syntheticEvent = {
      ...e,
      target: { ...e.target, value: masked },
    };

    onChange(syntheticEvent);
  };

  return (
    <input
      type="text"
      value={applyMask(value, mask)}
      onChange={handleChange}
      placeholder={placeholder}
      maxLength={mask.length}
    />
  );
};

export default CepInput;
