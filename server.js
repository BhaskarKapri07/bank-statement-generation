const express = require("express");
const app = express();
const dbService = require("./database/dbService");
const pdfService = require("./pdf-generator/pdfService");

app.use(express.json());

app.get("/", (request, response) => {
  response.send("Bank statement service is running.....");
});

app.post("/generate-statement", async (request, response) => {
  const { userEmail, startDate, endDate } = request.body;

  if (!userEmail || !startDate || !endDate) {
    response
      .status(400)
      .send("Missing required fields: userEmail, startDate, endDate");
  }

  try {
    const transactions = await dbService.getTransactions(
      userEmail,
      startDate,
      endDate
    );

    if (transactions.length === 0) {
      response.status(404).send("No transactions found for the given user");
    }

    const pdfPath = pdfService.generatePDF(transactions, userEmail);

    console.log("transactions: ", transactions);
  } catch (error) {
    console.log("Error: ", error);
    response.status(500).send("Internal server error");
  }
});

const PORT = 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
