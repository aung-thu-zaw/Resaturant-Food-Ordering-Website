export function useGenerator() {
  const generateQueryParams = (params) => {
    const queryParams = Object.entries(params)
      .filter(([key, value]) => value !== undefined && value !== null && value !== '')
      .map(([key, value]) => `${key}=${value}`)
      .join('&')

    return queryParams
  }

  return {
    generateQueryParams
  }
}
