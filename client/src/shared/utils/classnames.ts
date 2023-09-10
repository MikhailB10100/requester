export function classnames(...classNames: Array<string | undefined>) {
  let result = ''
  for (const className of classNames) {
    if (typeof className === 'string' && className !== '') {
      result += result === '' ? className : ` ${className}`
    }
  }
  return result
}
