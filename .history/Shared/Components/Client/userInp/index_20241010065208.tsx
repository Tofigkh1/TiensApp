import React, { ChangeEvent } from 'react';

interface InputProps {
  name: string;
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  title?: string;
}

const Input: React.FC<InputProps> = ({ name, type, value, onChange, placeholder, title }) => {
  return (
    <div>
      <label htmlFor={name}>{title}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
