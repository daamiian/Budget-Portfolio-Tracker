function onEdit(e) {
  var editedCellContents = e.range.getValue()

  if (editedCellContents == "Please Wait..." && typeof e.value != 'object') {
    var sheet = SpreadsheetApp.getActiveSpreadsheet();
    var dashboard = sheet.getSheetByName("DASHBOARD");
    var transactions = sheet.getSheetByName("TRANSACTIONS");
    
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
    dashboard.getRange("D12").setValue("Ready to Submit!");

  } else if (editedCellContents == "Adding Row..." && typeof e.value != 'object') {
    var sheet = SpreadsheetApp.getActiveSpreadsheet();
    var currentRow = e.range.getRow();
    var newRow = currentRow + 2;

    sheet.insertRowBefore(newRow);

    var copyRow = newRow-1;
    var copyRange = "B"+copyRow+":"+copyRow;
    var newRange = "B"+newRow+":"+newRow;

    sheet.getRange(copyRange).copyTo(sheet.getRange(newRange));

    e.range.setValue("Add Row!");
    }
  return;
}
