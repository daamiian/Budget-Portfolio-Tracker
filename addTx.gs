function onEdit(e) {

  if (e.source.getActiveSheet().getName() !== "DASHBOARD" || 
      e.range.getA1Notation() != 'D12' || typeof e.value == 'object') return;
  
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.setActiveSheet(spreadsheet.getSheetByName('TRANSACTIONS'), true);
  spreadsheet.getRange('B3:K3').activate();
  spreadsheet.getActiveSheet().getFilter();
  spreadsheet.getActiveSheet().getFilter().remove();

  spreadsheet.setActiveSheet(spreadsheet.getSheetByName('TRANSACTIONS'), true);
  spreadsheet.getRange('4:4').activate();
  spreadsheet.getActiveSheet().insertRowsBefore(spreadsheet.getActiveRange().getRow(), 1);
  spreadsheet.getActiveRange().offset(0, 0, 1, spreadsheet.getActiveRange().getNumColumns()).activate();
  spreadsheet.getRange('A4:K4').activate();
  spreadsheet.getRange('A5:K5').copyTo(spreadsheet.getActiveRange(), SpreadsheetApp.CopyPasteType.PASTE_NORMAL, false);
  spreadsheet.getRange('B4:F4').activate();
  spreadsheet.getActiveRangeList().clear({contentsOnly: true, skipFilteredRows: true});
  spreadsheet.getRange('H4:K4').activate();
  spreadsheet.getActiveRangeList().clear({contentsOnly: true, skipFilteredRows: true});
  spreadsheet.setActiveSheet(spreadsheet.getSheetByName('DASHBOARD'), true);
  spreadsheet.getRange('D10').activate();
  spreadsheet.setActiveSheet(spreadsheet.getSheetByName('TRANSACTIONS'), true);
  spreadsheet.getRange('B4').activate();
  spreadsheet.getRange('DASHBOARD!D10').copyTo(spreadsheet.getActiveRange(), SpreadsheetApp.CopyPasteType.PASTE_VALUES, false);
  spreadsheet.setActiveSheet(spreadsheet.getSheetByName('DASHBOARD'), true);
  spreadsheet.getRange('D5').activate();
  spreadsheet.setActiveSheet(spreadsheet.getSheetByName('TRANSACTIONS'), true);
  spreadsheet.getRange('C4').activate();
  spreadsheet.getRange('DASHBOARD!D5').copyTo(spreadsheet.getActiveRange(), SpreadsheetApp.CopyPasteType.PASTE_VALUES, false);
  spreadsheet.setActiveSheet(spreadsheet.getSheetByName('DASHBOARD'), true);
  spreadsheet.getRange('D6').activate();
  spreadsheet.setActiveSheet(spreadsheet.getSheetByName('TRANSACTIONS'), true);
  spreadsheet.getRange('D4').activate();
  spreadsheet.getRange('DASHBOARD!D6').copyTo(spreadsheet.getActiveRange(), SpreadsheetApp.CopyPasteType.PASTE_VALUES, false);
  spreadsheet.setActiveSheet(spreadsheet.getSheetByName('DASHBOARD'), true);
  spreadsheet.getRange('D7').activate();
  spreadsheet.setActiveSheet(spreadsheet.getSheetByName('TRANSACTIONS'), true);
  spreadsheet.getRange('E4').activate();
  spreadsheet.getRange('DASHBOARD!D7').copyTo(spreadsheet.getActiveRange(), SpreadsheetApp.CopyPasteType.PASTE_VALUES, false);
  spreadsheet.setActiveSheet(spreadsheet.getSheetByName('DASHBOARD'), true);
  spreadsheet.getRange('D8').activate();
  spreadsheet.setActiveSheet(spreadsheet.getSheetByName('TRANSACTIONS'), true);
  spreadsheet.getRange('F4').activate();
  spreadsheet.getRange('DASHBOARD!D8').copyTo(spreadsheet.getActiveRange(), SpreadsheetApp.CopyPasteType.PASTE_VALUES, false);
  spreadsheet.setActiveSheet(spreadsheet.getSheetByName('DASHBOARD'), true);
  spreadsheet.getRange('D9').activate();
  spreadsheet.setActiveSheet(spreadsheet.getSheetByName('TRANSACTIONS'), true);
  spreadsheet.getRange('H4').activate();
  spreadsheet.getRange('DASHBOARD!D9').copyTo(spreadsheet.getActiveRange(), SpreadsheetApp.CopyPasteType.PASTE_VALUES, false);
  spreadsheet.setActiveSheet(spreadsheet.getSheetByName('DASHBOARD'), true);
  spreadsheet.getRange('D11').activate();
  spreadsheet.setActiveSheet(spreadsheet.getSheetByName('TRANSACTIONS'), true);
  spreadsheet.getRange('J4:K4').activate();
  spreadsheet.getRange('DASHBOARD!D11').copyTo(spreadsheet.getActiveRange(), SpreadsheetApp.CopyPasteType.PASTE_VALUES, false);

  spreadsheet.getRange('B3:K').activate();
  spreadsheet.getRange('B3:K').createFilter();
  spreadsheet.getRange('B3').activate();
  spreadsheet.getActiveSheet().getFilter();

  spreadsheet.setActiveSheet(spreadsheet.getSheetByName('DASHBOARD'), true);
  spreadsheet.getRange('D5:D11').activate();
  spreadsheet.getActiveRangeList().clear({contentsOnly: true, skipFilteredRows: true});
  spreadsheet.getRange('D12').activate();
  spreadsheet.getRange('D12').setValue("Submit!");

  refreshFIFOProfit()
}
