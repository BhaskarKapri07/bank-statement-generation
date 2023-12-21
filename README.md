
---

# Bank Statement Generator

## Overview
The Bank Statement Generator is a versatile application designed for generating PDF bank statements over specified date ranges. This tool is ideal for users needing quick access to their transaction records in a convenient, digital format.

## Features
- **User-Friendly API**: Users can request bank statements by specifying a date range and their email address through a simple API.
- **Efficient Data Retrieval**: Utilizes a CSV-based database service for quick and accurate transaction data retrieval.
- **PDF Generation**: Capable of generating a well-structured PDF document listing all transactions within the requested period.
- **Email Integration**: Seamlessly sends the generated PDF as an email attachment to the user, ensuring secure and prompt delivery.

## Getting Started

### Initial Setup
Before using the application, you need to set up an Ethereal email account for testing email functionalities. Ethereal is a fake SMTP service, perfect for safely testing email sending in development environments.

### Steps to Configure Ethereal:
1. **Create Ethereal Account:** Go to [Ethereal](https://ethereal.email/) and create a new account. Upon creation, you will receive SMTP credentials.
2. **Configure .env File:** In the root directory of the project, create a `.env` file and include the following lines, replacing `YOUR_ETHEREAL_USERNAME` and `YOUR_ETHEREAL_PASSWORD` with the credentials obtained from Ethereal:
   ```
   USER=YOUR_ETHEREAL_USERNAME
   PASSWORD=YOUR_ETHEREAL_PASSWORD
   ```
3. **Run the Application:** Start the server with:
   ```bash
   node server.js
   ```
   You can then send a request to `/generate-statement` using the `request.rest` file.

## Services
- **API Service**: The API Service is the gateway through which users interact with the application. It efficiently processes requests and coordinates the flow of data between other services.
- **Database Service**: This service handles the extraction and filtering of transaction data from the transactions.csv file. It's optimized for performance and accuracy, ensuring that the correct data is always retrieved.
- **PDF Generation Service**: Leveraging the pdfkit library, this service is responsible for transforming raw transaction data into a professionally formatted PDF document. The attention to detail in layout and design ensures that the final output is both informative and aesthetically pleasing.
- **Email Service**: Utilizing nodemailer, this service handles the crucial task of emailing the generated PDF to the user. The integration with Ethereal ensures that this process is smooth, secure, and reliable, especially during the testing phase.

## Technical Details
- **Simplified Database Handling**: The choice of a CSV file for database simulation simplifies data management, making it easy to modify and maintain the transaction records without needing complex database solutions.
- **Efficient Testing Methodology**: The application employs the Visual Studio Code REST Client Extension for iterative and rapid testing. This method facilitates immediate feedback and adjustments, enhancing the development process.
- **Secure Email Testing with Ethereal**: The use of Ethereal for email testing negates the risks associated with sending real emails, providing a safe environment for developers to test and refine the email functionality.

## Technologies Employed
- **Express.js**: Chosen for its efficiency and ease of use in API development, Express.js is the backbone of the application's server-side operations.
- **CSV-Parser**: This library plays a pivotal role in managing CSV file operations, ensuring smooth data handling and retrieval.
- **PDFKit**: A key component in generating high-quality PDF documents, PDFKit offers the flexibility and power needed for creating detailed and professional-looking bank statements.
- **Nodemailer**: A staple in the Node.js ecosystem, Nodemailer is employed for its robust features and reliability in handling email operations, particularly in conjunction with Ethereal for testing purposes.