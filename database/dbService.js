const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

const getTransactions = (userEmail, startDate, endDate) => {
  return new Promise((resolve, reject) => {
    const transactions = [];
    const start = new Date(startDate);
    const end = new Date(endDate);

    fs.createReadStream(path.join(__dirname, "transactions.csv"))
      .pipe(csv())
      .on("data", (row) => {
        const transactionDate = new Date(row.date_of_transaction);
        if (
          row.user_email === userEmail &&
          transactionDate >= start &&
          transactionDate <= end
        ) {
          transactions.push(row);
        }
      })
      .on("end", () => {
        resolve(transactions);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};

module.exports = {
  getTransactions,
};
