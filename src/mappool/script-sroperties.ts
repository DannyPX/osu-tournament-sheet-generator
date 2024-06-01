/**
 * ## Get Script Property
 * @param {string} key `key` Key name
 * @returns {string}
 */
const getProperty_ = (key: string): string => {
  const scriptProperties = PropertiesService.getScriptProperties();
  let result = scriptProperties.getProperty(key);
  return result;
};

/**
 * ## Set Script Property
 * @param key `key` Key name
 * @param value `value` Value for key
 */
const setProperty_ = (
  key: string,
  value: string
): void => {
  const scriptProperties = PropertiesService.getScriptProperties();
  scriptProperties.setProperty(key, value);
};

/**
 * ## Delete Script Property
 * @param key `key` Key Name
 */
const deleteProperty_ = (
  key: string
): void => {
  const scriptProperties = PropertiesService.getScriptProperties();
  scriptProperties.deleteProperty(key);
};

const resetProperties_ = (): void => {
  setProperty_("clientID", '0');
  setProperty_("clientSecret", '0');
  setProperty_("token", '0');
  setProperty_("tokenExpiry", '0');
};