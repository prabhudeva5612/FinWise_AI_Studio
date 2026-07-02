# Financial Modules Overview

This repository contains modules developed for financial validation, credibility analysis, and loan estimation: the **Loan Eligibility Checker**, **Credit Score Analyzer**, and **EMI Calculator**.

---

## 1. Loan Eligibility Checker

The Loan Eligibility Checker was developed using rule-based financial validation algorithms. The module collects user details including applicant name, monthly salary, credit score, existing EMI obligations, and age.
<img width="857" height="267" alt="image" src="https://github.com/user-attachments/assets/d34aafa5-fc77-4807-97de-4d981541b334" />

### Business Rules & Evaluation
The system evaluates the user’s financial profile using predefined business rules:
* Monthly salary must exceed ₹30,000
* Credit score must be greater than 700
* Existing EMI obligations must remain below ₹20,000
* Applicant age must be at least 21 years

### Eligibility Formula
If all conditions are satisfied, the application calculates the eligible loan amount using the formula:

$$\text{Eligible Loan Amount} = \text{Monthly Salary} \times 20$$

The result section dynamically displays approval or rejection status, risk classification, and loan eligibility amount using animated UI components.

---

## 2. Credit Score Analyzer

The Credit Score Analyzer module was implemented to help users understand their financial credibility and repayment behavior. 
<img width="716" height="238" alt="image" src="https://github.com/user-attachments/assets/aae8b322-dd92-4343-8433-02783b4786e2" />

The module accepts a credit score input and classifies the financial profile into three categories:

| Category | Score Range |
| :--- | :--- |
| **Excellent** | 750–900 |
| **Good** | 650–749 |
| **Poor** | 300–649 |

Based on the classification, the system displays recommendations and financial improvement guidance. Users with low scores receive suggestions related to timely repayments, reducing debts, and improving credit utilization ratios. 

The result is displayed in a visually highlighted animated panel to improve user engagement and readability.

---

## 3. EMI Calculator

The EMI Calculator was developed to help users estimate their monthly loan repayment amount before applying for loans. The module accepts loan amount, interest rate, and loan tenure as inputs.

<img width="611" height="218" alt="image" src="https://github.com/user-attachments/assets/fc96eed2-109d-4437-82c5-308e8b3e8734" />

### The EMI Formula
The EMI value is calculated using the standard reducing-balance EMI formula:

$$\text{EMI} = \frac{P \times R \times (1 + R)^N}{(1 + R)^N - 1}$$

Where:
* **P** = Principal Loan Amount
* **R** = Monthly Interest Rate
* **N** = Loan Tenure in Months

The system dynamically calculates and displays the monthly EMI along with loan details. Validation checks were added to prevent invalid inputs and ensure accurate calculations.
