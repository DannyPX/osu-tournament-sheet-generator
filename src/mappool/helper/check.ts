const isTokenExpired_ = (): boolean => {
  return parseInt(getProperty_('tokenExpiry')) <= Date.now()
}