# **Bank Transaction and Loan Processing System**


# A Bank

A core banking solution designed for a private bank in Seychelles, featuring branch management, internal fund transfers, loan processing, and customer account management.

## **Table of Contents**

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Database Structure](#database-structure)
7. [API Endpoints](#api-endpoints)
8. [Project Structure](#project-structure)
9. [UI Screenshots](#ui-screenshots)
    

## **Project Overview**

This project is a core banking solution developed as a proof of concept (PoC) for a small, private bank. The system is designed to handle key banking functionalities such as customer account management, internal fund transfers, and loan processing. 

The system will support:
- Multiple branches, including a head office.
- Different account types (savings, checking, fixed deposits).
- Loan applications and processing for personal and business loans.
- Basic report generation for branch managers.

## **Features**

- **Branch Management**: Manage bank branches, including employees and customers.
- **Account Management**: Create and manage savings and checking accounts. Support for different plans based on customer age group.
- **Fund Transfers**: Internal bank transfers between accounts.
- **Fixed Deposits**: Support for creating Fixed Deposit (FD) accounts and calculating monthly interest.
- **Loan Processing**: Apply for loans at branches or via an online portal.
  - Manual loans (branch approval required).
  - Online loans (instant approval based on FD balance).
- **Reporting**: Generate transaction and loan reports per branch for branch managers.

## **Technologies Used**

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Others**: Axios (for API requests), Sequelize (ORM for MySQL), JSON Web Token (JWT) for authentication, bcrypt for password hashing.

## **Installation**

### **Prerequisites** 

- **Node.js** (version >= 14) : 
  - First Install NodeJs if you haven't.( https://nodejs.org/dist/v20.16.0/node-v20.16.0-x64.msi)
- **MySQL** (version >= 8)
- **Git** (for cloning the repository)

### **Setup Steps**
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/banking-system.git
   cd banking-system
   ```
2. **Install dependencies**
- After cloning repositary, open a terminal and navigate to folder and run "npm install" to install necessary packages according to package.json automatically.

   ```bash
   npm install
   ```
4. **Database Setup**
- Create a new MySQL database.
-	Update the .env file with your database credentials:
   ```
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=banking_system
```

4. Run Database migrations:
   ```bash
   npx sequelize-cli db:migrate
   ```


## **Usage**

### **Local Development**

1. Start the server:
   ```bash
   npm start
   ```

2.	Open your web browser and navigate to:
   ```
http://localhost:3000
```

###**Running tests**

- To run the test suite
```bash
  npm test
```

## **Database Structure**

### **Tables**

- Branch: Stores information about branches, including the head office.

- Manager: Contains details about branch managers.
  
- Employee: Information about employees working at each branch.

- Customer: Stores customer information, both individual and business.

  - Business Customer: Specific details for business customers.

  - Individual Customer: Specific details for individual customers.

- Account: Information on savings and checking accounts for both individuals and businesses.

- Transaction: Records internal transactions between accounts.

- Fixed Deposit: Details of fixed deposits linked to savings accounts.

- Loan: Details about loans taken by customers.

- Loan Application: Information about loan applications.

- Loan Installment: Manages loan repayment installments.

- Online Loan to FD: Information about online loans linked to fixed deposits.


## **ER Diragram**

[ER Diagram.pdf](https://github.com/user-attachments/files/17530929/Group8.ER.Diagram.pdf)

<img width="1030" alt="Screenshot 2024-10-26 at 19 57 20" src="https://github.com/user-attachments/assets/cb22f864-0811-47ea-b59b-d9fddd1aad21" align ="centre">

## **API Endpoints**

### Account Management

- GET /api/accounts - Retrieve all accounts.
- POST /api/accounts - Create a new account.
- GET /api/accounts/:id - Retrieve account details by ID.
- GET /api/accounts/customer/:customerId - Retrieve accounts by customer ID.

### Loan Management

- POST /api/loans - Create a new loan application.
- GET /api/loans/:id - Get loan details by ID.
- PATCH /api/loans/:id/approve - Approve a loan (Branch manager only).
- GET /api/loans/customer/:customerId - Retrieve loans by customer ID.

## **Project Structure**
```
banking-system/
├── controllers/     # Contains route handler functions (business logic)
├── models/          # Database models (e.g., Account, Customer, Loan)
├── routes/          # Route definitions for API endpoints
├── config/          # Configuration files (database, server)
├── middlewares/     # Custom middleware (e.g., authentication)
├── utils/           # Helper functions and utilities
├── public/          # Static files (if any)
├── views/           # Frontend templates (if using server-side rendering)
├── .env             # Environment variables
├── app.js           # Main server setup file
└── README.md        # Project documentation
```

## **UI Screenshots**

### Login Page
```
Link can be of the 3 below types
http://localhost:3000/customer-login 
http://localhost:3000/employee-login
http://localhost:3000/manager-login
```

## Customer

### Login & OTP code request

<img width=49% alt="Screenshot 2024-10-26 at 22 36 04" src="https://github.com/user-attachments/assets/2c0570ed-ea3e-4023-bfe1-fe3b1be722f2">

<img width=49% alt="Screenshot 2024-10-26 at 22 38 00" src="https://github.com/user-attachments/assets/8da1b589-a085-438e-b6e3-ba390ef3cbec">

### Other Pages

<img width=49% alt="Screenshot 2024-10-26 at 22 52 52" src="https://github.com/user-attachments/assets/78c95f9d-813c-4c22-8369-40902274e345">  

### Account Management
 <img width=49% alt="Screenshot 2024-10-26 at 22 53 15" src="https://github.com/user-attachments/assets/e5dd962c-d69a-48b4-a2c8-e2c9f293ae5e">

 <img width=49% alt="Screenshot 2024-10-26 at 22 54 36" src="https://github.com/user-attachments/assets/a8d05794-14bd-4afc-be79-13199d235533">

<img width=49% alt="Screenshot 2024-10-26 at 22 54 56" src="https://github.com/user-attachments/assets/35a2ebb7-697b-42e5-81ef-5c30518ab827">

### Loan Management

<img width=49% alt="Screenshot 2024-10-26 at 22 55 34" src="https://github.com/user-attachments/assets/58ca2670-fa76-4cb3-8de5-a444d8a85190">

<img width=49% alt="Screenshot 2024-10-26 at 23 09 56" src="https://github.com/user-attachments/assets/77f0b68a-1447-4ecd-b3f0-63f3288d2d7d">

<img width=49% alt="Screenshot 2024-10-26 at 23 10 12" src="https://github.com/user-attachments/assets/a55f2caa-6c4c-4cf9-936d-63569d91f197">

### Access Management

<img width=49% alt="Screenshot 2024-10-26 at 23 11 36" src="https://github.com/user-attachments/assets/3acdcb52-962a-495b-9e76-8b843e1f6a13">

### Sign Out
<img width="831" alt="Screenshot 2024-10-26 at 23 14 20" src="https://github.com/user-attachments/assets/a0517b31-65f2-447a-a5ba-7b626d61a5e9">



## Employee

<img width=49% alt="Screenshot 2024-10-26 at 23 22 10" src="https://github.com/user-attachments/assets/b86a8380-c23c-49fe-b116-152b0f3297e0">

<img width=49% alt="Screenshot 2024-10-26 at 23 22 32" src="https://github.com/user-attachments/assets/3a188eec-cbc7-4f5e-97ac-4805f8fbecda">

### Customers
<img width=49% alt="Screenshot 2024-10-26 at 23 22 52" src="https://github.com/user-attachments/assets/3c1c35b2-dc2d-4c4a-a143-b927656cb59f">

<img width=49% alt="Screenshot 2024-10-26 at 23 25 50" src="https://github.com/user-attachments/assets/bc686ac0-8bd4-4bfc-9163-498462e95088">

<img width=49% alt="Screenshot 2024-10-26 at 23 26 05" src="https://github.com/user-attachments/assets/551f9433-621b-42ee-aff9-d5485b5ba4f3">

### Loans for Individuals or Businesses

<img width=49% alt="Screenshot 2024-10-26 at 23 27 34" src="https://github.com/user-attachments/assets/c84bd9e9-4a43-4751-85ec-9903b2c8b28b">

## Manager









