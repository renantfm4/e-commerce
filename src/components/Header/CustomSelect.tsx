"use client";

import React, { useEffect, useMemo, useState } from "react";

type Option = {
  label: string;
  value: string;
};

type CustomSelectProps = {
  options: Option[];
  value?: string;
  onChange?: (option: Option) => void;
};

const CustomSelect = ({ options, value, onChange }: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = useMemo(() => {
    return options.find((option) => option.value === value) || options[0];
  }, [options, value]);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (option: Option) => {
    setIsOpen(false);
    onChange?.(option);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!(event.target as HTMLElement).closest(".dropdown-content")) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      className="dropdown-content custom-select relative"
      style={{ width: "200px" }}
    >
      <div
        className={`select-selected whitespace-nowrap ${
          isOpen ? "select-arrow-active" : ""
        }`}
        onClick={toggleDropdown}
      >
        {selectedOption.label}
      </div>

      <div className={`select-items ${isOpen ? "" : "select-hide"}`}>
        {options.map((option, index) => (
          <div
            key={index}
            onClick={() => handleOptionClick(option)}
            className={`select-item ${
              selectedOption.value === option.value ? "same-as-selected" : ""
            }`}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomSelect;