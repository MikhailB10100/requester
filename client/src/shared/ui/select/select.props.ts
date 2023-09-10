export interface SelectOption<V extends string> {
  text: string
  value: V
}

export interface SelectProps<V extends string> {
  options: Array<SelectOption<V>>
  value?: V
  defaultValue?: V
  onValueChange?: (value: V) => void

  // ui props
  className?: string
  selectedTextClassName?: string
  optionsContainerClassname?: string
  optionClassName?: string
  selectedOptionClassName?: string
}
