import * as osuAPILibrary from "../libraries/osuAPILibrary/endpoint";

const ui_ = SpreadsheetApp.getUi();
const as_ = SpreadsheetApp.getActiveSpreadsheet();

const dropdownValuesSheet: GoogleAppsScript.Spreadsheet.Sheet = as_.getSheetByName("DropdownValues");
const settingsSheet: GoogleAppsScript.Spreadsheet.Sheet = as_.getSheetByName("Generator Settings");
const mainSheet: GoogleAppsScript.Spreadsheet.Sheet = as_.getSheetByName("main");
const mapTypes: GoogleAppsScript.Spreadsheet.Range = settingsSheet.getRange("L8:Z");
const pools: GoogleAppsScript.Spreadsheet.Range = mainSheet.getRange("I11:I");

const fetchPoolers = () => {
  waitingSetMax(3);
  waitingActivate();
  let data = dropdownValuesSheet.getRange("J7:L");
  let userIds: number[] = [];
  let userIndex: number[] = [];

  waitingSetText("Get links");
  data.getValues().forEach(function (column, index) {
    let userLink: string = column[0];
    let userId: number = parseInt(userLink.substring(userLink.lastIndexOf("/") + 1));
    (column[0] !== String.Empty && column[1] == String.Empty) && (userIds.push(userId) && userIndex.push(index));
  });

  waitingUpdateProgress();

  if (isTokenExpired_()) {
    ui_.alert("Not authorized or token is expired");
  } else {
    waitingSetText("Fetch from osu! API");
    let response: any = osuAPILibrary.getUsers(getProperty_("token"), userIds);
    waitingUpdateProgress();

    response.users.forEach(function (user: any) {
      let index = userIds.findIndex(id => id == user.id);
      let values = [[user.id, user.username]];

      try {
        dropdownValuesSheet.getRange(
          userIndex[index] + data.getRow(),
          data.getColumn() + 1,
          values.length,
          values[0].length
        ).setValues(values);
      } catch (err) {
        Logger.log('Failed with error %s', err.message);
      }
    });
    waitingUpdateProgress();
  }
  dropdownValuesSheet.activate();
  waitingDone();
};

const fetchMapTypes = () => {
  let values = mapTypes.getValues().flat().filter(item => item).filter((value, index, array) => array.indexOf(value) === index).reduce((rows, key, index) => (index % 1 == 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) && rows, []);
  dropdownValuesSheet.getRange(`G7:G${6 + values.length}`).setValues(values);
};

const removePoolers = () => {
  dropdownValuesSheet.getRange("K7:L").clearContent();
};

const removeMapTypes = () => {
  dropdownValuesSheet.getRange("G7:H").clearContent();
};

const fetchMaps = () => {
  let sheet = as_.getActiveSheet();
  let maps = sheet.getRange("J7:T");

  if (pools.getValues().flat().filter(item => item).includes(sheet.getSheetName())) {
    waitingSetMax(
      Math.ceil((sheet.getRange("K7:K").getValues().flat().filter(item => item).length / 50) + 1) +
      sheet.getRange("K7:K").getValues().flat().filter(item => item).length
    );
    waitingActivate();
    let beatmapIds: number[] = [];
    let beatmapIndex: number[] = [];

    waitingSetText("Get links");
    maps.getValues().forEach(function (column, index) {
      let beatmapLink: string = column[1];
      let beatmapId: number = parseInt(beatmapLink.substring(beatmapLink.lastIndexOf("/") + 1));
      ((column[1] !== String.Empty && column[4] == String.Empty && column[0] == true) || (column[0] == true && column[1] !== String.Empty)) && (beatmapIds.push(beatmapId) && beatmapIndex.push(index));
    });

    waitingSetText("Fetch from osu! API");
    let mapsResult = getMaps_(beatmapIds);

    waitingRemoveMax(beatmapIds.length - mapsResult.beatmaps.length);

    waitingSetText("Setting values");
    mapsResult.beatmaps.forEach(function (beatmap, index) {
      let beatmapIndexResult = beatmapIds.findIndex(id => id == beatmap.id);

      let values = [[
        beatmap.beatmapset_id,
        `${beatmap.beatmapset.artist} - ${beatmap.beatmapset.title} [${beatmap.version}]`,
        beatmap.beatmapset.creator,
        beatmap.accuracy,
        beatmap.bpm,
        `${Math.floor(beatmap.hit_length / 60)}:${beatmap.hit_length % 60 < 10 ? "0" + beatmap.hit_length % 60 : beatmap.hit_length % 60}`,
        beatmap.count_circles,
        beatmap.count_sliders
      ]];

      waitingSetText(`Setting values: ${index}/${mapsResult.beatmaps.length}`);
      try {
        sheet.getRange(
          beatmapIndex[beatmapIndexResult] + maps.getRow(),
          13, // ID
          values.length,
          values[0].length
        ).setValues(values);
        sheet.getRange(
          beatmapIndex[beatmapIndexResult] + maps.getRow(),
          10, // BOOLEAN
          1,
          1
        ).setValues([["FALSE"]]);
        waitingUpdateProgress();
      } catch (err) {
        Logger.log('Failed with error %s', err.message);
      }
    });
    sheet.activate();
    waitingDone();
  } else {
    ui_.alert("Not Pool Sheet");
  }
};

const getMaps_ = (
  beatmapIds: number[],
  recResult: any | undefined = {
    beatmaps: []
  }
): any => {
  let result = osuAPILibrary.getBeatmaps(getProperty_("token"), beatmapIds);
  recResult.beatmaps.push(...result.beatmaps);
  let leftover = beatmapIds.filter((id) => { return result.beatmaps.findIndex(beatmap => beatmap.id == id) == -1; });
  waitingUpdateProgress();
  return leftover.length > 0 && beatmapIds.length !== leftover.length ? getMaps_(leftover, recResult) : recResult;
};