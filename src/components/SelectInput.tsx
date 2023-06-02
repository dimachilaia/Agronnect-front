import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  value: Option | null;
  setValue: (option: Option | null) => void;
  placeholder: string;
}

const Select: React.FC<SelectProps> = ({
  options,
  value,
  setValue,
  placeholder,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setInputValue(inputValue);
  };

  const handleOpenDropdown = () => {
    setIsOpen(true);
  };

  const handleCloseDropdown = (option: Option) => {
    setValue(option);
    setInputValue(option.value);
    setIsOpen(false);
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      selectRef.current &&
      !selectRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <SelectContainer ref={selectRef}>
      <SearchInput
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        onFocus={handleOpenDropdown}
      />
      {isOpen && (
        <Dropdown>
          {filteredOptions.map((option) => (
            <OptionItem
              key={option.value}
              onClick={() => handleCloseDropdown(option)}
            >
              {option.label}
            </OptionItem>
          ))}
        </Dropdown>
      )}
    </SelectContainer>
  );
};

const SelectContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 32px;
  border: 1px solid #ccc;
  height: 72px;
  border-radius: 12px;
  outline: none;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  color: #4f4f4f;

  &::placeholder {
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    text-transform: capitalize;
    color: rgba(79, 79, 79, 0.5);
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 0 0 4px 4px;
  background-color: #fff;
  z-index: 100;
`;

const OptionItem = styled.div`
  padding: 12px 32px;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;

export default Select;
