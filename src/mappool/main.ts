import * as osuAPILibrary from "../libraries/osuAPILibrary/endpoint";

const _ui = SpreadsheetApp.getUi();

function onOpen() {

  _ui.createMenu('🛠️ TSG Scripts')
    .addItem('⌛ Initialize', 'init')
    .addSeparator()
    .addSubMenu(
      _ui.createMenu('🔗 Link TSG Sheets')
        .addItem('WIP', 'WIP')
    )
    .addSeparator()
    .addSubMenu(
      _ui.createMenu('🔑 API')
        .addItem('➕ Add Client ID', 'addClientID')
        .addItem('➕ Add Client Secret', 'addClientSecret')
        .addItem('🔒 Authorize API', 'authorize')
        .addItem('➖ Remove Client Credentials', 'removeClientCredentials')
    )
    .addSubMenu(
      _ui.createMenu('🔧 Generation')
        .addItem('🔧 Generate Mappool Sheets', 'generateSheets')
        .addItem('🚫 Remove Generated Sheets', 'removeSheets')
    )
    .addSeparator()
    .addSubMenu(
      _ui.createMenu('📊 Fetch Data')
        .addItem('🎩 Fetch Poolers Data', 'fetchPoolers')
        .addItem('📝 Fetch Maps Data', 'fetchMaps')
    )
    .addToUi();
}

const init = () => {
  resetProperties_();
  _ui.alert('Initialized');
};

const addClientID = () => {
  let result = _ui.prompt("Enter Client ID");
  let button = result.getSelectedButton();

  button === _ui.Button.OK ? (setProperty_("clientID", result.getResponseText()), _ui.alert("Added Client ID")) : Logger.log("Cancelled");
};

const addClientSecret = () => {
  let result = _ui.prompt("Enter Client Secret");
  let button = result.getSelectedButton();

  button === _ui.Button.OK ? (setProperty_("clientSecret", result.getResponseText()), _ui.alert("Added Client Secret")) : Logger.log("Cancelled");
};

const authorize = () => {
  if (isTokenExpired()) {
    let result = osuAPILibrary.ClientCredentialsGrant(parseInt(getProperty_("clientID")), getProperty_("clientSecret"), "client_credentials", Scope.Public);
    let tokenExpiry = Date.now() + (result.expires_in * 1000);

    setProperty_("token", result.access_token);
    setProperty_("tokenExpiry", tokenExpiry.toString());
    _ui.alert("Authorized");
  } else {
    _ui.alert("Already Authorized");
  }
};

const removeClientCredentials = () => {
  resetProperties_();
  _ui.alert('Removed Client Credentials');
};