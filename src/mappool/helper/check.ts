const isTokenExpired = (): boolean => {
  return parseInt(getProperty_('tokenExpiry')) <= Date.now()
}