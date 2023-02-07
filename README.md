# Budget-Portfolio-Tracker

## NEW

The sheet is finally ready for the 1.0 version number. It is complete and easy to use, and I added some usage clips on my phone. There are a few things I still need to improve, but it should all work and it should be accurate. Please submit an issue if you spot something. If you're just finding this project, read on!

1. Fixed formula errors
2. Increased add transaction speed
3. Added "add row" functionality to add rows easier on mobile. Tap the checkboxes in the planners and in the portfolio to check it out!

## 1 Overview

Welcome to the best money manager money can't buy...because it's free. 

Aren't spreadsheets ugly enough these days? On top of that, opening a spreadsheet on your phone can be a nightmare with all that horizontal scrolling and zooming. Well, those days are gone now that you've stumbled here. 

I made this Google Spreadsheet to track every transfer of money, from income, expenses, savings & investment allocations, to pretty much anything your little heart desires. The goal is to have one tool to track everywhere your money goes. No more cycling between different portfolio managers and budgeting apps, it's all here, and it has been designed with simplicity, aesthetic, and attention to detail. The sheet's main tabs for inputting data have also been designed to be viewed on a mobile phone, and analytic tabs are slightly wider, for computer viewing or tablet viewing. 

This sheet, accompanied with some scripts written with AppScript, will help you track it all, in style. Keep reading to learn how to use it.

The link you can copy from (found at the end of this README below) is for personal finances, but it can be modified easily into a business finance tracker, or a group project finance tracker by searching and replacing all instances of "Personal" with "Business" or "Project" (include formulas). Then, you may want to update the grey rows representing categories to match your use-case. 

## 2 Sheet Contents

The sheet has three main tabs and a monthly planner tab for your current budget cycle. You should not change any tab name, they are referenced by name all over the sheet. Each sheet has light blue cells used as inputs, all other cells are calculation cells which you should avoid changing unless absolutely necessary and you understand how it all fits together. There are notes in many of the cells in every tab, to explain the functionality and give tips for usage. The details of each tab are listed below:

### 2.1 DASHBOARD

Where it all begins; In the dashboard, you will notice the slim UX, designed for viewing on a phone. The only input required here are transaction submissions. You will find all kinds of useful insights and quick links to other areas of the spreadsheet. Be sure to read all the notes!

### 2.2 PORTFOLIO

Where your asset and savings performance can be tracked. Any asset you are interested in buying, or any savings account you use will be using will be inputted here as sources you can add transactions for in the DASHBOARD. You can input a timeframe which you want to analyze and a currency to view. There are five sections: Crypto, Stocks, Commodities, Real Estate, and Other Investment. Right now, the only sections with automatically updating prices are crypto and stocks. The other sections you need to input end date prices manually...For now. This is my next focus, but to get high quality api's, I will have to pay, so donations will help this process along. 

### 2.3 TRANSACTIONS

Where the data comes from; when you input a transaction from the DASHBOARD, it shows up here. There is a filter so you can sort by date, profit on sale, asset source, etc. You should avoid manually inputting transactions but it is still possible so long as you refresh the page after so that the profit can be recalculated. Manually editing transactions isn't an issue. 

If the sheet becomes slow, it is likely this tab causing it. If you experience this, one thing you can do is consider archiving a portion of the transactions rows by printing the screen in the timeframe you wish to archive, then saving it. But, you won't be able to pull insights from that timeframe anymore. This becomes an issue only when tracking the performance of assets in the PORTFOLIO tab because if the buy transactions were archived, the profit won't be quite accurate. The solution to this is coming in the next version, so refrain from archiving just yet. It should support thousands of transactions before you start to notice some performance issues. In the next version, there will be a column in the TRANSACTIONS tab which will indicate if a buy transaction has been "used up", in order to determine the best archiving timeframe. Another workaround might be to change the buy transaction buy dates and archive other transactions. I also thought of logging portfolio transactions seperate, but this is something for the upcoming versions. I am open to suggestions. 

### 2.4 MONTH 202X

The monthly planner; this is where all the planning happens at the start of the month. There are three main sections: Personal Income, Personal Expenses, and Savings & Investments. After inputting your projected personal incomes and expenses, the remaining amount is automatically allocated to the Savings & Investments section for you. You need only input the percentage you wish to allocate to each Savings & Investments category (Crypto, Stocks, Commodities, Real Estate, and Other Investments). Each category has sub categories: income, expenses, withdrawals / sales, and allocations. Planned amounts will be calculated automatically so you don't need to guess how much money you can afford to allocate each month, just how much percentage to allocate in each asset class. The asset incomes and withdrawals / sales are automatically added to total income, which can be allocated to other investments or savings, or carried over to the next month. The asset expenses and are added to total expenses, and then if there is leftover cash, it will be allocated in the allocations / deposits section. 

In each row, there is a planned column, and an actual column. The planned column is what you project the amount will be, and the actual column is what has been added to the TRANSACTIONS tab. Note: for this to track, names must be the same!

Each month tab should be labelled in the format: MONTH YYYY. This tab is technically not necessary because data is never pulled from here but it's very useful. You have many options here: You can keep 1 year of monthly planners, many years, 6 months, whatever you want. The only important thing is that when you want to plan for a new month, just duplicate the previous month, change the tab name to the current month and continue tracking. When you don't care to see insights for that particular month anymore, you can remove it to increase the speed of the sheet a bit.

At the end of the tab, you can find the transactions for the month. This is useful if you ever want to archive the monthly planner using a screenshot. 

## 3 Setup Instructions

The sheet is shared with a link (see below). Open it then just make a copy to your google drive. The scripts can be added by selecting Extensions>AppScript from the Google Sheets sheet, then you can just copy and paste them, using the same names I set. After that, you're set and ready to plan your first month. No email, no money. Make a burner Google account if you don't want the sheet linked to you. 


## 4 Adding Transactions

The idea is to simplify the input of transactions into a spreadsheet, and what simpler way than using the device you carry with you everywhere? Who wants to keep their receipts, go home, boot up the computer and then finally input data? Simply pay, open the spreadsheet, and input your transaction using the point of sale section on the spot, with your phone. But scripts don't work on mobile?! Wrong! Using checkboxes instead of buttons to run scripts allows this sheet to work on any device. And this is simplicity you'll appreciate in your busy day. 

To add a transaction, you need content for the DASHBOARD dropdowns. The dropdowns pull data from the most recently dated monthly planner tab, and the PORTFOLIO tab, in the event of inputting savings & investment transactions. Once you've inputted your transaction sources, they will populate the dropdowns in DASHBOARD and you can input your transaction by selecting the checkbox. I have protected the checkbox cell in order to prevent accidental submits. Once the checkbox has been tapped / clicked, a macro will run to add the transaction to the TRANSACTIONS tab. 


## 5 Calculating Profit and Cashflow on Investment Transactions

In sell transactions, realized profit will be calculated for that particular sale, and unrealized profit will be calculated for each asset on every buy transaction. This happens while the transaction is being added to the TRANSACTIONS tab. The calculation happens automagically, without the need to calculate a report. Easy. 

What method is used to calculate the cost basis? The method I have chosen is known as First-In-First-Out (FIFO), which calculates profit on a sale based on the oldest purchase transactions. This method is best for tracking the performance of assets in a portfolio. Another method I will add in the future will be Last-In-Last-Out (LILO), which is better for taxes in certain situations when there have been losses. 

Cashflow is the amount of money an asset makes you. If it's negative, it means the cost to own the asset outweigh the income it brings you. An example would be rent and operating costs on a real estate property investment; if the rent you receive (Transaction Type: Portfolio Income) is more than the operating costs of the property (Transaction type: Portfolio Expense), then your cashflow is positive. Cashflow is calculated using the transaction inputs of the types above. For every asset, you may input expenses and incomes related to it into the TRANSACTIONS tab, which is then summed and pulled into the PORTFOLIO tab. 

Everything about your portfolio performance is shown in the PORTFOLIO tab.

## 6 Updating

I will update the sheet version number so keep an eye out to make sure you're using the latest version. When upgrading, you can copy the latest version, I recommend keeping a copy of your current version, then copying all of your inputs into the new version in order to keep your source names. I will eventually make a script to do this process for you. The TRANSACTIONS sheet will likley never be updated since it's so simple, so you can keep your old one.


## 7 Closing Notes

And that's it! Any other information you might want to know can be found in the notes provided in many of the cells all over the spreadsheet. 

If you find a calculation error or something wrong in general, please submit an issue and I will do my best to fix it. 

This sheet took me a lot of time to get right while keeping it pretty and functional. If you are able and you found this useful, please consider donating. I will be using the donations to turn this sheet into a free app as soon as possible, and then anything extra will support new projects with the same values: privacy, intuitive design, and always free. Cheers!

## 7 Links

**[Personal Budget & Portfolio Tracker v1.0](https://docs.google.com/spreadsheets/d/1027NEbGv6xhRANhu_yghA_fvjH3bG_UXlGA5S7mOGqQ/edit?usp=sharing)**

---

☕ **[Buy Me a Coffee](https://www.buymeacoffee.com/daamiian)** 

**Monero Wallet Address**: 4AZGD9mLNTm5Ao2AyBA1ep99BGnA4KprdV6g4iNkjPk4CQXhQrN4gChbxaqvBJp4tdTZj3YybySjJMJq2nRkzeqDFdu3PWL

(You can find the monero address QR code as an image in this repository)
