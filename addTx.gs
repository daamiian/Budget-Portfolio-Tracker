function onEdit(e) {

  if (e.source.getActiveSheet().getName() !== "DASHBOARD" || 
      e.range.getA1Notation() != 'D12' || typeof e.value == 'object') return;
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var dashboard = ss.getSheetByName("DASHBOARD");
  var transactions = ss.getSheetByName("TRANSACTIONS");
  var checkValues = ["Sell", "Buy", "Portfolio"];
  
  // Insert a new row above the first row in the range B4:K4
  transactions.insertRowBefore(4);
  
  // Copy the formatting and certain cell values from row 5 to the newly added row (now row 4)
  transactions.getRange("J4:K4").merge();  
  transactions.getRange("B5:K5").copyTo(transactions.getRange("B4:K4"), { formatOnly: true });
  transactions.getRange("A5").copyTo(transactions.getRange("A4"));
  transactions.getRange("G5").copyTo(transactions.getRange("G4"));
  
  // Copy values from the DASHBOARD to the newly added row in the TRANSACTIONS sheet
  dashboard.getRange("D10").copyTo(transactions.getRange("B4"), { contentsOnly: true });
  dashboard.getRange("D5").copyTo(transactions.getRange("C4"), { contentsOnly: true });
  dashboard.getRange("D6").copyTo(transactions.getRange("D4"), { contentsOnly: true });
  dashboard.getRange("D7").copyTo(transactions.getRange("E4"), { contentsOnly: true });
  dashboard.getRange("D8").copyTo(transactions.getRange("F4"), { contentsOnly: true });
  dashboard.getRange("D9").copyTo(transactions.getRange("H4"), { contentsOnly: true });
  dashboard.getRange("D11").copyTo(transactions.getRange("J4:K4"), { contentsOnly: true });
  
  // Reset the dashboard D12 value back to "Submit!"
  dashboard.getRange("D5:D11").clearContent();
  dashboard.getRange("D12").setValue("Ready!");

  // Update profit calculation if cell C4 is a sell transaction
  if (checkValues.includes(transactions.getRange("C4").getValue()))
    refreshFIFOProfit();
}
