# **Bank Transaction and Loan Processing System**

A core banking solution designed for a private bank in Seychelles, featuring branch management, internal fund transfers, loan processing, and customer account management.

This is the frontend for our project for CS3043 - Database systems. 

## **Table of Contents**

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Database Structure](#database-structure)
7. [API Endpoints](#api-endpoints)
8. [Project Structure](#project-structure-of-frontend)
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

- **Frontend**: React.js for UI components and interaction.
- **Backend**: Node.js with Express.js for server-side handling.
- **Database**: MySQL for relational data storage.
- **Others**:
  - **Axios**: Handles API requests.
  - **Sequelize**: ORM for MySQL data management.
  - **JWT**: Provides secure authentication.
  - **bcrypt**: Ensures hashed password storage for security.

## **Installation**

### **Prerequisites** 

- **Node.js** (version >= 14) : 
  - First Install NodeJs if you haven't.( https://nodejs.org/dist/v20.16.0/node-v20.16.0-x64.msi)
- **MySQL** (version >= 8)
- **Git** (for cloning the repository)

### **Setup Steps**
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/pasindu-22/database-project-frontend.git
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



## **Project Structure of front end**
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

<img width=49% alt="Screenshot 2024-10-27 at 09 58 11" src="https://github.com/user-attachments/assets/0e9a8345-1aac-4e86-8f55-def06727d6d9">

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
<img width=49% alt="Screenshot 2024-10-26 at 23 14 20" src="https://github.com/user-attachments/assets/a0517b31-65f2-447a-a5ba-7b626d61a5e9">



## Employee

<img width=49% alt="Screenshot 2024-10-26 at 23 22 10" src="https://github.com/user-attachments/assets/b86a8380-c23c-49fe-b116-152b0f3297e0">

<img width=49% alt="Screenshot 2024-10-26 at 23 22 32" src="https://github.com/user-attachments/assets/3a188eec-cbc7-4f5e-97ac-4805f8fbecda">

### Customer Management
<img width=49% alt="Screenshot 2024-10-26 at 23 22 52" src="https://github.com/user-attachments/assets/3c1c35b2-dc2d-4c4a-a143-b927656cb59f">

<img width=49% alt="Screenshot 2024-10-26 at 23 25 50" src="https://github.com/user-attachments/assets/bc686ac0-8bd4-4bfc-9163-498462e95088">

<img width=49% alt="Screenshot 2024-10-26 at 23 26 05" src="https://github.com/user-attachments/assets/551f9433-621b-42ee-aff9-d5485b5ba4f3">

### Loans for Individuals or Businesses

<img width=49% alt="Screenshot 2024-10-26 at 23 27 34" src="https://github.com/user-attachments/assets/c84bd9e9-4a43-4751-85ec-9903b2c8b28b">

## Manager

### Reports

<img width=49% alt="Screenshot 2024-10-27 at 01 21 18" src="https://github.com/user-attachments/assets/34dc3946-cfcf-4a7a-a493-9bb2a13b9e1e">

<img width=49% alt="Screenshot 2024-10-27 at 01 21 57" src="https://github.com/user-attachments/assets/d5a00cb9-7d98-43da-8cda-81f1b4c9ec73">

<img width=49% alt="Screenshot 2024-10-27 at 01 22 36" src="https://github.com/user-attachments/assets/e850e850-2192-4202-ae00-2622092baa6f">

### Pending Loans 
<img width=49% alt="Screenshot 2024-10-27 at 01 23 39" src="https://github.com/user-attachments/assets/7640fb8b-5a53-4678-9170-6e5188c6b460">

### New Manager and Branch

<img width=49% alt="Screenshot 2024-10-27 at 01 25 07" src="https://github.com/user-attachments/assets/63886345-39d6-42f2-8b95-235bab22eb2e">

<img width=49% alt="Screenshot 2024-10-27 at 01 25 18" src="https://github.com/user-attachments/assets/66b0f825-03a3-466d-82bb-94749042cb2f">







