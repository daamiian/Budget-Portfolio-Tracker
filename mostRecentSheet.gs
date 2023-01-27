function mostRecentSheet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("DASHBOARD");
  var range = sheet.getRange("A:A");
  range.clearContent();
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = ss.getSheets();
  var maxDate = new Date(0);
  var recentSheet;
  
  for (var i = 0; i < sheets.length; i++) {
    var sheet = sheets[i];
    if (sheet.getName() == "DASHBOARD" || sheet.getName() == "PORTFOLIO" || sheet.getName() == "TRANSACTIONS") {
      continue;
    }
    var h2 = sheet.getRange("H2").getValue();
    if (h2 == "" || h2 == 0 || isNaN(h2)) {
      continue;
    }
    if (h2 > maxDate) {
      maxDate = h2;
      recentSheet = sheet;
    }
  }
  var dashboardSheet = ss.getSheetByName("DASHBOARD");
  var formula = recentSheet.getRange("A1").getFormula();
  dashboardSheet.getRange("A1").setFormula(formula);
}
