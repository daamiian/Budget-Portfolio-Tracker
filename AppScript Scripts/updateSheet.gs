function updateSheet() {
  var sourceId = "1027NEbGv6xhRANhu_yghA_fvjH3bG_UXlGA5S7mOGqQ";
  var sourceSheet = SpreadsheetApp.openById(sourceId);
  var sheets = sourceSheet.getSheets();

  var destinationId = SpreadsheetApp.getActive().getId();
  var destinationSheet = SpreadsheetApp.openById(destinationId);
  var tabs = ["DASHBOARD", "PORTFOLIO"];

  // copy old portfolio data into a new sheet called OLD_DATA
  var spreadsheet = SpreadsheetApp.getActive();
  var savedRanges = ["Portfolio!SavingsAccounts","Portfolio!ActivityAccounts","Portfolio!CryptoAssets","Portfolio!StockAssets","Portfolio!CommodityAssets","Portfolio!RealEstateAssets","Portfolio!OtherAssets"];
  var oldDataSheet = spreadsheet.getSheetByName("OLD_DATA");
  if (!oldDataSheet) {
    oldDataSheet = spreadsheet.insertSheet("OLD_DATA");
  }
  var firstRow = savedRanges.map(function(range) {
    return range.split("!")[1];
  });
  oldDataSheet.getRange(1, 1, 1, savedRanges.length).setValues([firstRow]);
  
  for (var i = 0; i < savedRanges.length; i++) {
    var range = spreadsheet.getRangeByName(savedRanges[i]);
    var values = range.getValues();
    oldDataSheet.getRange(2, i + 1, values.length, 1).setValues(values);
    var notes = range.getNotes();
    if (notes) {
      oldDataSheet.getRange(2, i + 1, values.length, 1).setNotes(notes);
    }
  }
  



  // delete old DASHBOARD, PORTFOLIO, and old Planner not customized
  var tabsToDelete = ["DASHBOARD", "PORTFOLIO", "MONTH YYYY"];
  var destinationSheet = SpreadsheetApp.getActive();
  var allSheets = destinationSheet.getSheets();

  for (var i = 0; i < allSheets.length; i++) {
    var sheet = allSheets[i];
    if (tabsToDelete.includes(sheet.getName())) {
      destinationSheet.deleteSheet(sheet);
    }
  }

  // copy DASHBOARD, PORTFOLIO, and the monthly planner from source sheet
  for (var i = 0; i < sheets.length; i++) {
    var sourceTab = sheets[i];
    if (sourceTab.getName() != "TRANSACTIONS") {
      sourceTab.copyTo(destinationSheet);
    }
  }

  // rename the newly added tabs
  var destinationSheets = destinationSheet.getSheets();
  for (var i = 0; i < destinationSheets.length; i++) {
    var currentSheet = destinationSheets[i];
    var currentSheetName = currentSheet.getName();
    if (currentSheetName.indexOf("DASHBOARD") != -1) {
      currentSheet.setName("DASHBOARD");
    } else if (currentSheetName.indexOf("PORTFOLIO") != -1) {
      currentSheet.setName("PORTFOLIO");
    } else if (currentSheetName.indexOf("TRANSACTIONS") != -1) {
      currentSheet.setName("TRANSACTIONS");
    } else if (currentSheetName.indexOf("MONTH") != -1) {
      currentSheet.setName("MONTH YYYY");
    }
  }

  mostRecentSheet();
}