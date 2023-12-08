# Bank Statement Assignment

### Problem Statement
As a developer, you are tasked with writing a set of services that will fulfill the following requirement: A user in our banking application will request a generation of a PDF file showing their transactions from date1 to date2.  
  
The following are the base required services:  
- A basic API that accepts a period of time (two dates) and the user's email address ID.  
- A database service that collects the relevant transactions  
- A PDF generation service that takes in the above data and generates a PDF of the transaction list  
- An email service that sends the above PDF to the user's email address as an attachment  

### Assumptions Made
- The database can just be a CSV file. So the database call can just be reading the file and filtering for the relevant info. Assume the CSV to contain the following columns: `user_email`, `date_of_transaction`, `amount`  
- The PDF generated can just have one table or just lines of text, with each line a valid transaction for the requested period.  
- You can use any web API framework to expose the trigger API (date + email POST data) and it can be not authenticated (we do not care about authentication for this task)  
- Each service can be written in any language of choice. Or even in a single server, but:  
- None of the above services must interact directly with each other. They must only do their function and must not interfere with the process of the other services.  

---
### Solution
The solution to the assignment was approached by developing four distinct microservices, each handling a specific part of the functionality. 
The services include:
- **API service :** The entry point for the application.
- **Database service :** A CSV-based service for retrieving transaction data.
- **PDF Generation service :** Responsible for creating a PDF document of the transactions.
- **Email service :** Handles sending the generated PDF to the user's email.

You can start the server by using command:
```bash
node server.js
```
and then you can go to the `request.rest` file and click SEND REQUEST to send the request to `/generate-statement`.

#### Details About Each Service:
##### API Service
- It receives requests with two dates and a user email, and orchestrates the workflow by making requests to the other services.
##### Database Service
- It reads from a `transactions.csv` file and filters data based on the provided dates and user email.
##### PDF Generation Service
- It generates a PDF document from the transaction data received from the Database Service, using the `pdfkit` library.
##### Email Service
- It uses `nodemailer` library and sends the generated PDF as an email attachment to the specified user email.

#### Database Handling
Instead of a full-fledged database, a CSV file was used to simulate transaction data, which simplified the development process and focused on the core functionality of the services.
#### Testing
The testing was done using Visual Studio Code REST Client Extension. The `POST` request to `/generate-statement` was written in `requests.rest` file. This method enables quick and iterative testing, allowing immediate modifications and retesting as needed.
#### Use of Ethereal Email for Testing Email Functionality
Ethereal is a fake SMTP service, primarily used for testing purposes. It allows developers to test email sending functionality without sending actual emails to real recipients. This is particularly useful in development and staging environments where you don't want to spam real users with test emails. It doesn't require complex configurations. It's straightforward to integrate with `nodemailer` or similar email libraries in Node.js, making it an ideal choice for quickly setting up a test email environment.
#### Languages/Libraries Used
Everything was done using JavaScript ecosystem as it is extremely vast of libraries and tools, making it easy to find and integrate various packages needed for the tasks like PDF generation, handling CSV files, and sending emails.
- **Express.js for API development** : Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for building APIs. Its simplicity makes it a popular choice for quickly setting up routes and handling HTTP requests.
- **CSV-Parser for CSV File Handling** : A CSV file was chosen to simulate a database due to its simplicity and ease of use. No complex database setup was required, making it ideal for demonstrating the concept.
- **PDFKit for PDF Generation** : PDFKit is a PDF generation library for Node.js, making it a natural fit for a JavaScript-based backend
- **Nodemailer for Emailing** : Nodemailer is widely used for sending emails from Node.js applications. It's compatible with most email servers and has robust features for handling various emailing tasks.

---

#### Bonus question: How would you go about adding authorization and authentication to this process?
The authorization and authentication process can be added using JWT(JSON web token) and bcrypt.

**Authentication Process**
Whenever a new user signs up, they provide a username and password. `bcrypt` is used to  hash user passwords before storing them in your database. 
When the user logins the provided password is hashed and compared with the stored hash to verify the user's identity. Upon successful login, a JWT token is generated and sent back to the user.

**Authorization Process**
The token verification and user identification happens each time the server receives a request that requires authentication. The server decodes and verifies the JWT. If valid, it extracts the user's information (e.g., user ID, roles). User information from the JWT is used to determine if the user is authorized to perform the requested action or access the requested data.

