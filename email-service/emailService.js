const nodemailer = require("nodemailer");
require('dotenv').config();


const sendEmail = async (recipientEmail, pdfPath) => {
  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: process.env.USER,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: ' "Bank Statement Service"        <no-reply@example.com>',
    to: recipientEmail,
    subject: "Your bank statement",
    text: "Please find attached your bank statement",
    attachments: [
      {
        filename: "bank-statement.pdf",
        path: pdfPath,
      },
    ],
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error("Error sending email: ", error);
  }
};

module.exports = {
  sendEmail,
};
