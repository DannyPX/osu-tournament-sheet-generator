const Styles: { [key: string]: GoogleAppsScript.Spreadsheet.TextStyle; } = {
  WhiteValue: SpreadsheetApp.newTextStyle()
    .setForegroundColor("white")
    .setItalic(true)
    .setFontSize(8)
    .setFontFamily('Nunito')
    .build()
};

const richTextValueWithLink_ = (
  text: string,
  linkUrl: string,
  textStyle: GoogleAppsScript.Spreadsheet.TextStyle
): GoogleAppsScript.Spreadsheet.RichTextValue => {
  return SpreadsheetApp.newRichTextValue()
    .setText(text)
    .setLinkUrl(linkUrl)
    .setTextStyle(textStyle)
    .build();
};

function columnToLetter(column)
{
  var temp, letter = '';
  while (column > 0)
  {
    temp = (column - 1) % 26;
    letter = String.fromCharCode(temp + 65) + letter;
    column = (column - temp - 1) / 26;
  }
  return letter;
}