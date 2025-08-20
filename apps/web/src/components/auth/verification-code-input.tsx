import { Input } from "@/components/ui/input";
import { useState, useRef, useEffect } from "react";

interface VerificationCodeInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
}

export function VerificationCodeInput({ 
  value, 
  onChange, 
  length = 6 
}: VerificationCodeInputProps) {
  const [inputs, setInputs] = useState<string[]>(
    Array(length).fill("").map((_, i) => value[i] || "")
  );
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const newInputs = Array(length).fill("").map((_, i) => value[i] || "");
    setInputs(newInputs);
  }, [value, length]);

  const handleInputChange = (index: number, inputValue: string) => {
    // Handle paste operation - if more than 1 character, treat as paste
    if (inputValue.length > 1) {
      handlePaste(inputValue);
      return;
    }
    
    const newInputs = [...inputs];
    newInputs[index] = inputValue;
    setInputs(newInputs);
    
    onChange(newInputs.join(""));
    
    // Auto-focus next input
    if (inputValue && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (pastedValue: string) => {
    // Clean the pasted value (remove non-numeric characters)
    const cleanValue = pastedValue.replace(/\D/g, '').slice(0, length);
    
    const newInputs = Array(length).fill("");
    for (let i = 0; i < cleanValue.length; i++) {
      newInputs[i] = cleanValue[i];
    }
    
    setInputs(newInputs);
    onChange(newInputs.join(""));
    
    // Focus the last filled input or the next empty one
    const focusIndex = Math.min(cleanValue.length, length - 1);
    setTimeout(() => {
      inputRefs.current[focusIndex]?.focus();
    }, 0);
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !inputs[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const splitPoint = Math.floor(length / 2);

  return (
    <div className="flex gap-2">
      {/* First group */}
      {inputs.slice(0, splitPoint).map((inputValue, index) => (
        <Input
          key={index}
          ref={(el) => { inputRefs.current[index] = el; }}
          type="text"
          value={inputValue}
          onChange={(e) => handleInputChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={(e) => {
            e.preventDefault();
            const pastedData = e.clipboardData.getData('text');
            handlePaste(pastedData);
          }}
          className="flex-1 h-12 text-center text-lg font-mono border-0 bg-muted"
          maxLength={1}
        />
      ))}
      
      {/* Separator */}
      <div className="flex items-center px-2">
        <span className="text-muted-foreground">-</span>
      </div>
      
      {/* Second group */}
      {inputs.slice(splitPoint).map((inputValue, index) => (
        <Input
          key={index + splitPoint}
          ref={(el) => { inputRefs.current[index + splitPoint] = el; }}
          type="text"
          value={inputValue}
          onChange={(e) => handleInputChange(index + splitPoint, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index + splitPoint, e)}
          onPaste={(e) => {
            e.preventDefault();
            const pastedData = e.clipboardData.getData('text');
            handlePaste(pastedData);
          }}
          className="flex-1 h-12 text-center text-lg font-mono border-0 bg-muted"
          maxLength={1}
        />
      ))}
    </div>
  );
}