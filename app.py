from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# లోన్ అర్హతను లెక్కించే సింపుల్ లాజిక్
def evaluate_loan_risk(income, debts, amount, tenure):
    dti_ratio = (debts / income) * 100 if income > 0 else 100
    max_allowable_loan = income * 60
    
    if dti_ratio > 45:
        return "Rejected", dti_ratio, "Your Debt-to-Income ratio is too high (Above 45%)."
    if amount > max_allowable_loan:
        return "Rejected", dti_ratio, "Requested loan amount exceeds your structural income capacity."
        
    return "Approved", dti_ratio, "Profile parameters look good! You are eligible for the loan."

@app.route('/')
def home():
    return "FinWise AI Backend Active!"

if __name__ == '__main__':
    app.run(debug=True, port=5000)
