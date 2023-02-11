function updateSheet() {
  var sourceId = "1027NEbGv6xhRANhu_yghA_fvjH3bG_UXlGA5S7mOGqQ";
  var sourceSheet = SpreadsheetApp.openById(sourceId);
  var sheets = sourceSheet.getSheets();

  var destinationId = SpreadsheetApp.getActive().getId();
  var destinationSheet = SpreadsheetApp.openById(destinationId);
  var spreadsheet = SpreadsheetApp.getActive();


  // copy old portfolio data into a new sheet called OLD_DATA
  var savedRanges = ["SavingsAccounts","ActivityAccounts","CryptoAssets","StockAssets","CommodityAssets","RealEstateAssets","OtherAssets"];
  for (var i = 0; i < savedRanges.length; i++) {
    var range = spreadsheet.getRangeByName(savedRanges[i]);
    if (!range) {
      savedRanges[i] = "PORTFOLIO!" + savedRanges[i];
      range = spreadsheet.getRangeByName(savedRanges[i]);
    }
    if (range) {
      var values = range.getValues();
      var oldDataSheet = spreadsheet.getSheetByName("OLD_DATA");
      if (!oldDataSheet) {
        oldDataSheet = spreadsheet.insertSheet("OLD_DATA");
      }
      if (i === 0) {
        var firstRowRange = oldDataSheet.getRange(1, 1, 1, savedRanges.length);
        firstRowRange.setValues([savedRanges]);
        firstRowRange.setFontWeight("bold");
        firstRowRange.setBackground("#687887");
        firstRowRange.setFontColor("white");
        firstRowRange.setFontFamily("Lato");
        firstRowRange.setFontSize(10);
        oldDataSheet.getRange(1, 1, 1, savedRanges.length).setValues([savedRanges]);
      }
      oldDataSheet.getRange(2, i + 1, values.length, 1).setValues(values);
      var notes = range.getNotes();
      if (notes) {
        oldDataSheet.getRange(2, i + 1, values.length, 1).setNotes(notes);
      }
      oldDataSheet.autoResizeColumns(1, savedRanges.length);
    }
  }


  // delete old DASHBOARD, PORTFOLIO and dupe planner
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


  // rename the new tabs
  var destinationSheets = destinationSheet.getSheets();
  for (var i = 0; i < destinationSheets.length; i++) {
    var currentSheet = destinationSheets[i];
    var currentSheetName = currentSheet.getName();
    if (currentSheetName.indexOf("DASHBOARD") != -1) {
      currentSheet.setName("DASHBOARD");
    } else if (currentSheetName.indexOf("PORTFOLIO") != -1) {
      currentSheet.setName("PORTFOLIO");
    } else if (currentSheetName.indexOf("MONTH YYYY") != -1) {
      currentSheet.setName("MONTH YYYY");

      // link data validation on the MONTH YYYY tab to new PORTFOLIO
      var lastRow = currentSheet.getLastRow();
      var data = currentSheet.getRange(1, 1, lastRow, 3).getValues();
      var namedRanges = [  ["Savings Income", "PORTFOLIO!SavingsAccounts"],
        ["Savings Withdrawals", "PORTFOLIO!SavingsAccounts"],
        ["Savings Expenses", "PORTFOLIO!SavingsAccounts"],
        ["Savings Deposits", "PORTFOLIO!SavingsAccounts"],
        ["Activity Withdrawals", "PORTFOLIO!ActivityAccounts"],
        ["Activity Deposits", "PORTFOLIO!ActivityAccounts"],
        ["Crypto Income", "PORTFOLIO!CryptoAssets"],
        ["Crypto Sales", "PORTFOLIO!CryptoAssets"],
        ["Crypto Expenses", "PORTFOLIO!CryptoAssets"],
        ["Crypto Allocations", "PORTFOLIO!CryptoAssets"],
        ["Stock Income", "PORTFOLIO!StockAssets"],
        ["Stock Sales", "PORTFOLIO!StockAssets"],
        ["Stock Expenses", "PORTFOLIO!StockAssets"],
        ["Stock Allocations", "PORTFOLIO!StockAssets"],
        ["Commodity Income", "PORTFOLIO!CommodityAssets"],
        ["Commodity Sales", "PORTFOLIO!CommodityAssets"],
        ["Commodity Expenses", "PORTFOLIO!CommodityAssets"],
        ["Commodity Allocations", "PORTFOLIO!CommodityAssets"],
        ["Real Estate Income", "PORTFOLIO!RealEstateAssets"],
        ["Real Estate Sales", "PORTFOLIO!RealEstateAssets"],
        ["Real Estate Expenses", "PORTFOLIO!RealEstateAssets"],
        ["Real Estate Allocations", "PORTFOLIO!RealEstateAssets"],
        ["Other Investment Income", "PORTFOLIO!OtherAssets"],
        ["Other Investment Sales", "PORTFOLIO!OtherAssets"],
        ["Other Investment Expenses", "PORTFOLIO!OtherAssets"],
        ["Other Investment Allocations", "PORTFOLIO!OtherAssets"]
      ];

      for (var i = 0; i < data.length; i++) {
        if (data[i][0] == "Add Row!") {
          var range = currentSheet.getRange(i + 2, 3, 3, 1);
          var stringCheck = data[i - 1][1];

          for (var j = 0; j < namedRanges.length; j++) {
            var key = namedRanges[j][0];
            if (stringCheck == key) {
              var value = namedRanges[j][1];
              var namedRange = SpreadsheetApp.getActive().getRangeByName(value);
              var validationRule = SpreadsheetApp.newDataValidation().requireValueInRange(namedRange, true).build();
              range.setDataValidation(validationRule);
              break;
            }
          }
        }
      }
    }
  }


  // reload and recalculate.
  mostRecentSheet();
}
