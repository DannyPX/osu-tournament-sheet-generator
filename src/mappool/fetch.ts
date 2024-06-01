import * as osuAPILibrary from "../libraries/osuAPILibrary/endpoint";

const _ui = SpreadsheetApp.getUi();
const _as = SpreadsheetApp.getActiveSpreadsheet();

const fetchPoolers = () => {
  let sheet: GoogleAppsScript.Spreadsheet.Sheet = _as.getSheetByName("DropdownValues");
  let data = sheet.getRange("J7:L");
  let beatmapIds: number[] = [];
  let beatmapIndex: number[] = [];

  data.getValues().forEach(function (column, index) {
    let beatmapLink: string = column[0];
    let beatmapId: number = parseInt(beatmapLink.substring(beatmapLink.lastIndexOf("/") + 1));
    (column[0] !== String.Empty && column[1] == String.Empty) && (beatmapIds.push(beatmapId) && beatmapIndex.push(index));
  });

  if (isTokenExpired()) {
    _ui.alert("Not authorized or token is expired");
  } else {
    let response: any = osuAPILibrary.getUsers(getProperty_("token"), beatmapIds);

    response.users.forEach(function (user: any) {
      let userIndex = beatmapIds.findIndex(id => id == user.id);
      let values = [[user.id, user.username]];

      try {
        sheet.getRange(
          beatmapIndex[userIndex] + data.getRow(), 
          data.getColumn() + 1, 
          values.length, 
          values[0].length
        ).setValues(values);
      } catch (err) {
        Logger.log('Failed with error %s', err.message);
      }
    });
  }
};

const fetchMaps = () => {

};