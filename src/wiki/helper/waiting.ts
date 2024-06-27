const WaitingSheet: GoogleAppsScript.Spreadsheet.Sheet = as_.getSheetByName("Waiting");

const waitingSetMax = (
  max: number
) => {
  WaitingSheet.getRange("G7").setValue(max)
  WaitingSheet.getRange("H7").setValue(0)
  WaitingSheet.getRange("G9").setValue("Starting Script")
}

const waitingUpdateProgress = () => {
  WaitingSheet.getRange("H7").setValue(WaitingSheet.getRange("H7").getValue() + 1)
}

const waitingActivate = () => {
  WaitingSheet.showSheet().activate()
}

const waitingDone = () => {
  WaitingSheet.hideSheet()
}

const waitingSetText = (
  text: string
) => {
  WaitingSheet.getRange("G9").setValue(text)
}

const waitingRemoveMax = (
  amount: number
) => {
  WaitingSheet.getRange("G7").setValue(WaitingSheet.getRange("G7").getValue() - amount)
}