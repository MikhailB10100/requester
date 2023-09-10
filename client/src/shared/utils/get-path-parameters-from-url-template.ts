export function getPathParametersFromURLTemplate(
  template: string
): Array<string> {
  const regex = /{[a-zA-Z\d]*}/g

  const matches = template.match(regex)

  return matches ? matches.map((match) => match.slice(1, -1)) : []
}
