import * as osuAPILibrary from "../libraries/osuAPILibrary/endpoint"
import * as ManiaMappoolDBPublicLibrary from "../libraries/ManiaMappoolDBPublicLibrary"

const ui = SpreadsheetApp.getUi()

function onOpen() {

  ui.createMenu('Scripts')
    .addItem('Authorize', 'auth')
    .addToUi()
}

const auth = () => {
  ui.alert("Already authorized")
}