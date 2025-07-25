'use client';

import { cn } from '@/utils';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import * as React from 'react';

export interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  maxDate?: Date;
  minDate?: Date;
  error?: boolean;
}

const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      value,
      onChange,
      placeholder,
      className,
      disabled = false,
      maxDate,
      minDate,
      error = false,
      ...props
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ref
  ) => {
    const t = useTranslations('datePicker');

    // Get translated months and days
    const getTranslatedMonths = () => [
      t('months.january'),
      t('months.february'),
      t('months.march'),
      t('months.april'),
      t('months.may'),
      t('months.june'),
      t('months.july'),
      t('months.august'),
      t('months.september'),
      t('months.october'),
      t('months.november'),
      t('months.december'),
    ];

    const getTranslatedDays = () => [
      t('days.sunday'),
      t('days.monday'),
      t('days.tuesday'),
      t('days.wednesday'),
      t('days.thursday'),
      t('days.friday'),
      t('days.saturday'),
    ];

    const translatedMonths = getTranslatedMonths();
    const translatedDays = getTranslatedDays();
    const defaultPlaceholder = placeholder || t('placeholder');
    const [isOpen, setIsOpen] = React.useState(false);
    const [currentMonth, setCurrentMonth] = React.useState(
      value ? value.getMonth() : new Date().getMonth()
    );
    const [currentYear, setCurrentYear] = React.useState(
      value ? value.getFullYear() : new Date().getFullYear()
    );
    const [inputValue, setInputValue] = React.useState('');

    const containerRef = React.useRef<HTMLDivElement>(null);

    // Format date for display in dd/mm/yyyy format
    const formatDate = (date: Date) => {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };

    // Update input value when value prop changes
    React.useEffect(() => {
      if (value) {
        setInputValue(formatDate(value));
      } else {
        setInputValue('');
      }
    }, [value]);

    // Handle input change for manual typing
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputVal = e.target.value;
      setInputValue(inputVal);

      // Try to parse the date in dd/mm/yyyy format
      const dateRegex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
      const match = inputVal.match(dateRegex);

      if (match) {
        const [, day, month, year] = match;
        const parsedDate = new Date(
          parseInt(year),
          parseInt(month) - 1,
          parseInt(day)
        );

        // Validate the parsed date
        if (
          !isNaN(parsedDate.getTime()) &&
          parsedDate.getDate() == parseInt(day) &&
          parsedDate.getMonth() == parseInt(month) - 1 &&
          parsedDate.getFullYear() == parseInt(year)
        ) {
          // Convert to UTC
          const utcDate = new Date(
            Date.UTC(
              parsedDate.getFullYear(),
              parsedDate.getMonth(),
              parsedDate.getDate()
            )
          );
          onChange?.(utcDate);
        }
      }
    };

    // Handle date selection from calendar
    const handleDateSelect = (day: number) => {
      // Create UTC date
      const utcDate = new Date(Date.UTC(currentYear, currentMonth, day));
      onChange?.(utcDate);
      setInputValue(formatDate(utcDate));
      setIsOpen(false);
    };

    // Get days in current month
    const getDaysInMonth = () => {
      const firstDay = new Date(currentYear, currentMonth, 1);
      const startDate = new Date(firstDay);
      startDate.setDate(startDate.getDate() - firstDay.getDay());

      const days = [];
      const today = new Date();

      for (let i = 0; i < 42; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);

        const isCurrentMonth = date.getMonth() === currentMonth;
        const isToday = date.toDateString() === today.toDateString();
        const isSelected =
          value && date.toDateString() === value.toDateString();
        const isDisabled =
          (maxDate && date > maxDate) || (minDate && date < minDate);

        days.push({
          date,
          day: date.getDate(),
          isCurrentMonth,
          isToday,
          isSelected,
          isDisabled,
        });
      }

      return days;
    };

    // Navigate months
    const navigateMonth = (direction: 'prev' | 'next') => {
      if (direction === 'prev') {
        if (currentMonth === 0) {
          setCurrentMonth(11);
          setCurrentYear(currentYear - 1);
        } else {
          setCurrentMonth(currentMonth - 1);
        }
      } else {
        if (currentMonth === 11) {
          setCurrentMonth(0);
          setCurrentYear(currentYear + 1);
        } else {
          setCurrentMonth(currentMonth + 1);
        }
      }
    };

    // Close calendar when clicking outside
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
      <div ref={containerRef} className={cn('relative', className)} {...props}>
        {/* Input Field */}
        <div className='relative'>
          <input
            type='text'
            value={inputValue}
            onChange={handleInputChange}
            placeholder={defaultPlaceholder}
            disabled={disabled}
            className={cn(
              'flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 pr-10 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
              error && 'border-red-500 focus-visible:ring-red-500',
              className
            )}
            onClick={() => !disabled && setIsOpen(!isOpen)}
            readOnly={false}
          />
          <button
            type='button'
            onClick={() => !disabled && setIsOpen(!isOpen)}
            disabled={disabled}
            className='absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600'
          >
            <Calendar className='h-4 w-4' />
          </button>
        </div>

        {/* Calendar Dropdown */}
        {isOpen && (
          <div className='absolute top-full left-0 z-50 mt-1 w-80 rounded-md border border-gray-200 bg-white p-4 shadow-lg'>
            {/* Header */}
            <div className='mb-4 flex items-center justify-between'>
              <button
                type='button'
                onClick={() => navigateMonth('prev')}
                className='rounded-md p-1 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none'
              >
                <ChevronLeft className='h-4 w-4' />
              </button>

              <div className='flex items-center space-x-2'>
                <select
                  value={currentMonth}
                  onChange={e => setCurrentMonth(parseInt(e.target.value))}
                  className='rounded border-none bg-transparent px-2 py-1 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none'
                >
                  {translatedMonths.map((month, index) => (
                    <option key={month} value={index}>
                      {month}
                    </option>
                  ))}
                </select>

                <select
                  value={currentYear}
                  onChange={e => setCurrentYear(parseInt(e.target.value))}
                  className='rounded border-none bg-transparent px-2 py-1 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none'
                >
                  {Array.from({ length: 100 }, (_, i) => {
                    const year = new Date().getFullYear() - i;
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>
              </div>

              <button
                type='button'
                onClick={() => navigateMonth('next')}
                className='rounded-md p-1 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none'
              >
                <ChevronRight className='h-4 w-4' />
              </button>
            </div>

            {/* Days Header */}
            <div className='mb-2 grid grid-cols-7 gap-1'>
              {translatedDays.map(day => (
                <div
                  key={day}
                  className='flex h-8 items-center justify-center text-xs font-medium text-gray-500'
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className='grid grid-cols-7 gap-1'>
              {getDaysInMonth().map((dayObj, index) => (
                <button
                  key={index}
                  type='button'
                  onClick={() =>
                    !dayObj.isDisabled && handleDateSelect(dayObj.day)
                  }
                  disabled={dayObj.isDisabled}
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-md text-sm transition-colors',
                    'hover:bg-blue-50 focus:ring-2 focus:ring-blue-500 focus:outline-none',
                    dayObj.isCurrentMonth ? 'text-gray-900' : 'text-gray-400',
                    dayObj.isSelected &&
                      'bg-blue-600 text-white hover:bg-blue-700',
                    dayObj.isToday &&
                      !dayObj.isSelected &&
                      'bg-blue-100 font-medium text-blue-600',
                    dayObj.isDisabled &&
                      'cursor-not-allowed opacity-50 hover:bg-transparent'
                  )}
                >
                  {dayObj.day}
                </button>
              ))}
            </div>

            {/* Footer */}
            <div className='mt-4 flex items-center justify-between border-t border-gray-200 pt-3'>
              <button
                type='button'
                onClick={() => {
                  onChange?.(undefined);
                  setInputValue('');
                  setIsOpen(false);
                }}
                className='rounded px-2 py-1 text-sm text-gray-500 hover:text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none'
              >
                {t('clear')}
              </button>

              <button
                type='button'
                onClick={() => {
                  const today = new Date();
                  const utcToday = new Date(
                    Date.UTC(
                      today.getFullYear(),
                      today.getMonth(),
                      today.getDate()
                    )
                  );
                  onChange?.(utcToday);
                  setInputValue(formatDate(utcToday));
                  setCurrentMonth(today.getMonth());
                  setCurrentYear(today.getFullYear());
                  setIsOpen(false);
                }}
                className='rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none'
              >
                {t('today')}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
);

DatePicker.displayName = 'DatePicker';

export { DatePicker };
