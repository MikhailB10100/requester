export function buildURL(
  template: string,
  pathParams: Record<string, string>,
  queryParams: Record<string, string>
) {
  // replace params
  const pathParametersKeys = Object.keys(pathParams)
  const url = pathParametersKeys.length
    ? template.replace(
        new RegExp(
          pathParametersKeys.map((param) => `{${param}}`).join('|'),
          'g'
        ),
        (match) => pathParams[match.slice(1, match.length - 1)]
      )
    : template

  // build query string
  let query = ''

  for (const key in queryParams) {
    if (query.length) {
      query += '&'
    }
    query += `${key}=${queryParams[key]}`
  }

  return query ? `${url}?${query}` : url
}
