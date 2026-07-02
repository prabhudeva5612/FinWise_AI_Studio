#Core Financial features and Development

##The Loan Eligibility Checker was developed using rule-based financial validation algorithms. The module collects user details including applicant name, monthly salary, credit score, existing EMI obligations, and age.

The system evaluates the user’s financial profile using predefined business rules:

Monthly salary must exceed ₹30,000

Credit score must be greater than 700

Existing EMI obligations must remain below ₹20,000

Applicant age must be at least 21 years

If all conditions are satisfied, the application calculates the eligible loan amount using the formula:

Eligible Loan Amount = Monthly Salary × 20

The result section dynamically displays approval or rejection status, risk classification, and loan eligibility amount using animated UI components.
