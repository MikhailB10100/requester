import React, { useEffect, useState } from 'react'
import { SelectOption, SelectProps } from './select.props'
import { classnames } from '../../utils'

const DEFAULT_OPTION: SelectOption<''> = {
  text: '',
  value: '',
}

function Select<V extends string>({
  options,
  value,
  defaultValue,
  onValueChange,
  // ui props
  className,
  selectedTextClassName,
  optionClassName,
  optionsContainerClassname,
  selectedOptionClassName,
}: SelectProps<V>) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<SelectOption<V>>(
    options.find((option) => option.value === defaultValue) ||
      options[0] ||
      DEFAULT_OPTION
  )

  useEffect(() => {
    const valueOption = options.find((option) => option.value === value)
    if (valueOption) {
      setSelectedOption(valueOption)
    }
  }, [value])

  const closeDropdown = () => setIsOpen(false)

  const toggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen)
  }

  const handleOptionClick = (option: SelectOption<V>) => {
    setSelectedOption(option)
    closeDropdown()

    if (onValueChange) {
      onValueChange(option.value)
    }
  }

  return (
    <div className={classnames('inline relative', className)}>
      <div
        tabIndex={0}
        className={classnames('cursor-pointer h-full', selectedTextClassName)}
        onClick={toggleDropdown}
        onBlur={closeDropdown}
      >
        {selectedOption.text}
      </div>
      {isOpen && (
        <ul
          className={classnames(
            optionsContainerClassname,
            'absolute t-full l-0 cursor-pointer w-full bg-white'
          )}
        >
          {options.map((option, index) => (
            <li
              key={`${option.value}-${index}`}
              onMouseDown={() => handleOptionClick(option)}
              className={
                option.value === selectedOption.value
                  ? classnames(optionClassName, selectedOptionClassName)
                  : optionClassName
              }
            >
              {option.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Select
