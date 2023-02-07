function refreshFIFOProfit() {
  // Clear column I, M and N
  // I contains the profit calculation for the sale
  // N contains the cost basis for current holdings of an asset
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("TRANSACTIONS");
  var range = sheet.getRange("I4:I");
  range.clearContent();
  var range = sheet.getRange("N:N");
  range.clearContent();
  
  // Get all sell transactions, sort by date and filter out empty cells in column E
  var sellRange = sheet.getRange("B4:M").getValues();
  var sellPattern = /^Sell *|Portfolio Expense$/;
  var sellTransactions = sellRange.filter(function(row){
    return sellPattern.test(row[1]) && row[3] > 0;
  });
  sellTransactions.sort(function(a, b) {
    return new Date(a[0]) - new Date(b[0]);
  });
  
  // Get all buy transactions, sort by date and filter out empty cells in column E
  var buyRange = sheet.getRange("B4:M").getValues();
  var buyPattern = /^Buy *|Portfolio Income$/;
  var buyTransactions = buyRange.filter(function(row){
    return buyPattern.test(row[1]) && row[3] > 0;
  });
  buyTransactions.sort(function(a, b) {
    return new Date(a[0]) - new Date(b[0]);
  });

  // Iterate through all sell transactions and calculate FIFO profit
  for (var i = 0; i < sellTransactions.length; i++) {
    var remainingSellQuantity = sellTransactions[i][3];
    var totalCostBasis = 0;
    for (var j = 0; j < buyTransactions.length; j++) {
      var buy = buyTransactions[j];
      if (buy[2] === sellTransactions[i][2]) {
        if (buy[3] < remainingSellQuantity) {
          totalCostBasis += buy[5] * buy[3];
          remainingSellQuantity -= buy[3];
          buyTransactions[j][3] = 0;
        } else {
          totalCostBasis += buy[5] * remainingSellQuantity;
          buyTransactions[j][3] -= remainingSellQuantity;
          var FIFOProfit = (sellTransactions[i][4] - totalCostBasis);
          sheet.getRange(sellTransactions[i][11], 9).setValue(FIFOProfit);
          break;
        }
      }
    }
  }
  //Calculate and paste cost basis in PORTFOLIO sheet
  var portfolioSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("PORTFOLIO");
  var portfolioRange = portfolioSheet.getRange("B:B").getValues();
  var costBasis = {};
  for (var i = 0; i < buyTransactions.length; i++) {
    if (buyTransactions[i][3] > 0) {
      if (!costBasis[buyTransactions[i][2]]) {
        costBasis[buyTransactions[i][2]] = buyTransactions[i][5] * buyTransactions[i][3];
      } else {
        costBasis[buyTransactions[i][2]] += buyTransactions[i][5] * buyTransactions[i][3];
      }
    }
  }
  for (var i = buyTransactions.length-1; i >= 0; i--) {
    for (var asset in costBasis) {
      if (buyTransactions[i][2] == asset) {
        sheet.getRange(buyTransactions[i][11], 14).setValue(costBasis[asset]);
        break;
      }
    }
  }
}
