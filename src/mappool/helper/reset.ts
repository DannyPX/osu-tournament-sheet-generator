const template: GoogleAppsScript.Spreadsheet.Sheet = as_.getSheetByName("ManiaTemplate");
const settingsSheet: GoogleAppsScript.Spreadsheet.Sheet = as_.getSheetByName("Generator Settings");
const dropdownValuesSheet: GoogleAppsScript.Spreadsheet.Sheet = as_.getSheetByName("DropdownValues");
const mainSheet: GoogleAppsScript.Spreadsheet.Sheet = as_.getSheetByName("main");
const settings = settingsSheet.getRange("H7")
const rounds = settingsSheet.getRange("H13:J")
const mapTypesPerRound = settingsSheet.getRange("L8:Z")

const clearSettings_ = () => {
  settings.clearContent()
  rounds.clearContent()
  mapTypesPerRound.clearContent()
}