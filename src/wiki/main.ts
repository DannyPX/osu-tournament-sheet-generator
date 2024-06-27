import * as osuAPILibrary from "../libraries/osuAPILibrary/endpoint";

const ui_ = SpreadsheetApp.getUi();

function onOpen() {
  ui_.createMenu('🛠️ TSG Scripts')
    .addItem('⌛ Initialize', 'init')
    .addItem('🔧 Clear Settings', 'clearSettings')
    .addSeparator()
    .addSubMenu(
      ui_.createMenu('🔗 Link TSG Sheets')
        .addItem('WIP', 'WIP')
    )
    .addSeparator()
    .addSubMenu(
      ui_.createMenu('🔑 API')
        .addItem('➕ Add Client ID', 'addClientID')
        .addItem('➕ Add Client Secret', 'addClientSecret')
        .addItem('🔒 Authorize API', 'authorize')
        .addSeparator()
        .addItem('➖ Remove Client Credentials', 'removeClientCredentials')
    )
    .addSubMenu(
      ui_.createMenu('🔧 Generation')
        .addItem('🔧 Generate Wiki', 'generateWiki')
    )
    .addToUi();
}

const init = () => {
  resetProperties_();
  ui_.alert('Initialized');
};

const clearSettings = () => {
  let result = ui_.alert("Are you sure you want to clear the settings?", ui_.ButtonSet.OK);

  if (result === ui_.Button.OK) {
    clearSettings_();
  }
};

const addClientID = () => {
  let result = ui_.prompt("Enter Client ID");
  let button = result.getSelectedButton();

  button === ui_.Button.OK ? (setProperty_("clientID", result.getResponseText()), ui_.alert("Added Client ID")) : Logger.log("Cancelled");
};

const addClientSecret = () => {
  let result = ui_.prompt("Enter Client Secret");
  let button = result.getSelectedButton();

  button === ui_.Button.OK ? (setProperty_("clientSecret", result.getResponseText()), ui_.alert("Added Client Secret")) : Logger.log("Cancelled");
};

const authorize = () => {
  if (isTokenExpired_()) {
    let result = osuAPILibrary.ClientCredentialsGrant(parseInt(getProperty_("clientID")), getProperty_("clientSecret"), "client_credentials", Scope.Public);
    let tokenExpiry = Date.now() + (result.expires_in * 1000);

    setProperty_("token", result.access_token);
    setProperty_("tokenExpiry", tokenExpiry.toString());
    ui_.alert("Authorized");
  } else {
    ui_.alert("Already Authorized");
  }
};

const removeClientCredentials = () => {
  let result = ui_.alert("Are you sure you want to remove all credentials?", ui_.ButtonSet.OK);

  if (result === ui_.Button.OK) {
    resetProperties_();
    ui_.alert('Removed Client Credentials');
  }
};