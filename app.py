from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Core logic to evaluate loan eligibility and debt-to-income ratio
def evaluate_loan_risk(income, debts, amount, tenure):
    dti_ratio = (debts / income) * 100 if income > 0 else 100
    max_allowable_loan = income * 60
    
    if dti_ratio > 45:
        return "Rejected", dti_ratio, "Your Debt-to-Income ratio is too high (Above 45%). Try reducing your monthly debts."
    if amount > max_allowable_loan:
        return "Rejected", dti_ratio, "Requested loan amount exceeds your eligible limit based on your income footprint."
        
    estimated_interest = 9.5 if dti_ratio < 25 else 11.5
    return "Approved", dti_ratio, f"Profile parameters look stable! Recommended starting interest package: {estimated_interest}%."

@app.route('/')
def home():
    # Connecting the Frontend template with the Backend logic
    return render_template('index.html')

@app.route('/analyze-eligibility', methods=['POST'])
def process_eligibility_metrics():
    try:
        data = request.json
        income = float(data.get('monthly_income', 0))
        debts = float(data.get('monthly_debts', 0))
        loan_amount = float(data.get('loan_amount', 0))
        tenure = float(data.get('loan_tenure', 0))
        
        status, dti, comments = evaluate_loan_risk(income, debts, loan_amount, tenure)
        
        return jsonify({
            "status": "Success",
            "eligibility_status": status,
            "calculated_dti": round(dti, 2),
            "justification_text": comments
        })
    except Exception as e:
        return jsonify({"status": "Error", "message": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)
