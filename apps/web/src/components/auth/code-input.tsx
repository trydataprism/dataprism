import React, { useRef, KeyboardEvent, ClipboardEvent } from "react";
import { Input } from "@/components/ui/input";

interface CodeInputProps {
  length: number;
  value: string[];
  onChange: (value: string[]) => void;
  disabled?: boolean;
}

export function CodeInput({ length, value, onChange, disabled }: CodeInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleInputChange = (index: number, inputValue: string) => {
    if (inputValue.length <= 1 && /^\d*$/.test(inputValue)) {
      const newCode = [...value];
      newCode[index] = inputValue;
      onChange(newCode);
      
      if (inputValue && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    const digits = pastedData.replace(/\D/g, "").slice(0, length).split("");
    const newCode = ["", "", "", "", "", ""];
    digits.forEach((digit, i) => {
      if (i < length) newCode[i] = digit;
    });
    onChange(newCode);
  };

  return (
    <div className="flex items-center gap-2">
      {Array.from({ length }).map((_, index) => (
        <React.Fragment key={index}>
          <Input
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            value={value[index] || ""}
            onChange={(e) => handleInputChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={index === 0 ? handlePaste : undefined}
            className="h-12 flex-1 text-center text-lg font-medium border-border/50 focus:border-primary"
            maxLength={1}
            autoComplete="off"
            disabled={disabled}
          />
          {index === 2 && (
            <div className="w-4 h-0.5 bg-border flex-shrink-0" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}