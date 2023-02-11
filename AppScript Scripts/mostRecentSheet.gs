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

  var month = recentSheet.getRange("B2:F2").getValue();
  var year = recentSheet.getRange("G2").getValue();
  var prefix = "'" + month + " " + year + "'" + "!";
  var sourceDropdown = "=IF(REGEXMATCH(DASHBOARD!D5;\"Personal Income\");UNIQUE(INDEX("+prefix+"IncomeSources));IF(REGEXMATCH(DASHBOARD!D5;\"Personal Expense\");UNIQUE(INDEX("+prefix+"ExpenseSourses));IF(REGEXMATCH(DASHBOARD!D5;\"Deposit|Withdraw\");UNIQUE(INDEX({PORTFOLIO!SavingsAccounts;PORTFOLIO!ActivityAccounts}));IF(REGEXMATCH(DASHBOARD!D5;\"Crypto\");UNIQUE(INDEX(PORTFOLIO!CryptoAssets));IF(REGEXMATCH(DASHBOARD!D5;\"Stock\");UNIQUE(INDEX(PORTFOLIO!StockAssets));IF(REGEXMATCH(DASHBOARD!D5;\"Commodity\");UNIQUE(INDEX(PORTFOLIO!CommodityAssets));IF(REGEXMATCH(DASHBOARD!D5;\"Real Estate\");UNIQUE(INDEX(PORTFOLIO!RealEstateAssets));IF(REGEXMATCH(DASHBOARD!D5;\"Other\");UNIQUE(INDEX(PORTFOLIO!OtherAssets));IF(REGEXMATCH(DASHBOARD!D5;\"Portfolio\");UNIQUE(INDEX({PORTFOLIO!SavingsAccounts;PORTFOLIO!ActivityAccounts;PORTFOLIO!CryptoAssets;PORTFOLIO!StockAssets;PORTFOLIO!CommodityAssets;PORTFOLIO!RealEstateAssets;PORTFOLIO!OtherAssets});\"\"))))))))))";
  
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("DASHBOARD");
  sheet.getRange("A1").setValue(sourceDropdown);
  
}
