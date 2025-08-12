'use client';

import { useEffect, useRef, useState } from 'react';

interface OtpInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
}

export function OtpInput({
  length = 6,
  value,
  onChange,
  error = false,
  disabled = false,
  autoFocus = false,
}: OtpInputProps) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Initialize refs array
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);

  // Auto-focus first input on mount
  useEffect(() => {
    if (autoFocus && !disabled) {
      inputRefs.current[0]?.focus();
      setActiveIndex(0);
    }
  }, [autoFocus, disabled]);

  const handleInputChange = (index: number, inputValue: string) => {
    if (disabled) return;

    // Only allow numbers
    const numericValue = inputValue.replace(/[^0-9]/g, '');

    if (numericValue.length > 1) {
      // Handle paste operation
      const pastedValue = numericValue.slice(0, length);
      onChange(pastedValue);

      // Focus the next empty input or the last one
      const nextIndex = Math.min(pastedValue.length, length - 1);
      inputRefs.current[nextIndex]?.focus();
      setActiveIndex(nextIndex);
      return;
    }

    // Update the value
    const newValue = value.split('');
    newValue[index] = numericValue;
    const updatedValue = newValue.join('').slice(0, length);
    onChange(updatedValue);

    // Move to next input if current is filled
    if (numericValue && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
      setActiveIndex(index + 1);
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (disabled) return;

    if (e.key === 'Backspace') {
      e.preventDefault();
      const newValue = value.split('');

      if (value[index]) {
        // Clear current input
        newValue[index] = '';
        onChange(newValue.join(''));
      } else if (index > 0) {
        // Move to previous input and clear it
        newValue[index - 1] = '';
        onChange(newValue.join(''));
        inputRefs.current[index - 1]?.focus();
        setActiveIndex(index - 1);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
      setActiveIndex(index - 1);
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
      setActiveIndex(index + 1);
    }
  };

  const handleFocus = (index: number) => {
    if (!disabled) {
      setActiveIndex(index);
      // Select all text in the input for easier editing
      inputRefs.current[index]?.select();
    }
  };

  const handleBlur = () => {
    setActiveIndex(-1);
  };

  return (
    <div className='flex justify-center gap-3'>
      {Array.from({ length }, (_, index) => (
        <div
          key={index}
          className={`relative overflow-hidden rounded-lg border-2 transition-all duration-200 ease-in-out ${
            error
              ? 'border-red-500'
              : activeIndex === index
                ? 'border-blue-500 shadow-lg shadow-blue-500/25'
                : value[index]
                  ? 'border-green-500'
                  : 'border-gray-300'
          } ${disabled ? 'cursor-not-allowed opacity-50' : 'hover:border-gray-400'} `}
        >
          <input
            ref={el => {
              inputRefs.current[index] = el;
            }}
            type='text'
            inputMode='numeric'
            maxLength={1}
            value={value[index] || ''}
            onChange={e => handleInputChange(index, e.target.value)}
            onKeyDown={e => handleKeyDown(index, e)}
            onFocus={() => handleFocus(index)}
            onBlur={handleBlur}
            disabled={disabled}
            className={`h-12 w-12 border-none bg-transparent text-center text-xl font-bold transition-transform duration-200 outline-none sm:h-14 sm:w-14 sm:text-2xl ${disabled ? 'cursor-not-allowed' : 'cursor-text'} ${value[index] ? 'scale-110 transform' : ''} `}
            aria-label={`Digit ${index + 1}`}
          />

          {/* Animated background for active state */}
          <div
            className={`absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 to-indigo-50 transition-opacity duration-200 ${activeIndex === index ? 'opacity-100' : 'opacity-0'} `}
          />

          {/* Success checkmark animation */}
          {value[index] && !error && (
            <div className='pointer-events-none absolute inset-0 flex items-center justify-center'>
              <div className='absolute h-full w-full animate-pulse rounded-lg bg-green-50 opacity-20' />
            </div>
          )}

          {/* Number entry animation */}
          {value[index] && (
            <div
              className={`pointer-events-none absolute inset-0 flex animate-bounce items-center justify-center`}
              style={{
                animationDuration: '0.3s',
                animationIterationCount: '1',
              }}
            >
              <span className='text-xl font-bold text-transparent sm:text-2xl'>
                {value[index]}
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
