const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Bank statement service is running.....");
});

const PORT = 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
