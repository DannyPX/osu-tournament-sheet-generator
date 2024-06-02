import * as osuAPILibrary from "../libraries/osuAPILibrary/endpoint";

const ui_ = SpreadsheetApp.getUi();
const as_ = SpreadsheetApp.getActiveSpreadsheet();

const template: GoogleAppsScript.Spreadsheet.Sheet = as_.getSheetByName("ManiaTemplate");
const settingsSheet: GoogleAppsScript.Spreadsheet.Sheet = as_.getSheetByName("Generator Settings");
const dropdownValuesSheet: GoogleAppsScript.Spreadsheet.Sheet = as_.getSheetByName("DropdownValues");
const mainSheet: GoogleAppsScript.Spreadsheet.Sheet = as_.getSheetByName("main");
const rounds: GoogleAppsScript.Spreadsheet.Range = settingsSheet.getRange("H13:J");
const mapTypes: GoogleAppsScript.Spreadsheet.Range = settingsSheet.getRange("L8:Z");
const poolers: GoogleAppsScript.Spreadsheet.Range = dropdownValuesSheet.getRange("L7:L");
const pools: GoogleAppsScript.Spreadsheet.Range = mainSheet.getRange("I11:I");

const generateSheets = () => {
  waitingSetMax(settingsSheet.getRange("H13:H").getValues().flat().filter(item => item).length);
  waitingActivate();

  rounds.getValues().forEach(function (column, index) {
    if (column[0] !== String.Empty) {
      waitingSetText(`Generating: ${column[0]}`);
      let sheet: GoogleAppsScript.Spreadsheet.Sheet = template.copyTo(as_).setName(column[0]).showSheet();
      // Pools list
      pools.getCell(index + 1, 1)
        .setRichTextValue(richTextValueWithLink_(column[0], `#gid=${sheet.getSheetId()}`, Styles.WhiteValue));
      setTemplateValues_(sheet, column[0], column[1], column[2], settingsSheet.getRange(mapTypes.getRow(), mapTypes.getColumn() + index, column[2]).getValues(), [poolers.getValues().flat().filter(item => item).map(item => item.toUpperCase())]);
      waitingUpdateProgress();
    }
  });
  waitingDone();
  ui_.alert("Sheets generated");
};

const setTemplateValues_ = (
  sheet: GoogleAppsScript.Spreadsheet.Sheet,
  title: string,
  abbreviation: string,
  mapCount: number,
  mapTypes: string[][],
  poolers: string[][]
) => {
  sheet.getRange("G2").setValue(title.toUpperCase());
  sheet.getRange("H9").setValue(abbreviation);
  sheet.getRange("H7").setValue(mapCount);
  sheet.getRange(`AU7:AU${6 + mapCount}`).setValues(mapTypes);
  sheet.getRange(`W6:${columnToLetter(poolers[0].length + 22)}6`).setValues(poolers);
  sheet.showColumns(23, poolers[0].length);
};

const removeSheets = () => {
  let result = ui_.alert("Are you sure you want to remove the generated sheets?", ui_.ButtonSet.OK);

  if (result === ui_.Button.OK) {
    waitingSetMax(pools.getValues().flat().filter(item => item).length);
    waitingActivate();

    pools.getValues().forEach(function (column, index) {
      waitingSetText(`Removing: ${column[0]}`);
      if (column[0] !== String.Empty) {
        let sheet: GoogleAppsScript.Spreadsheet.Sheet = as_.getSheetByName(column[0]);
        as_.deleteSheet(sheet);
        waitingUpdateProgress();
      }
    });
    pools.clearContent();
    waitingDone();
    ui_.alert("Sheets removed");
  }
};