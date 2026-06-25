from flask import Flask, render_template, request, jsonify
import os
import requests

app = Flask(__name__)

# Groq API Configuration (SmartBridge Track Requirement)
GROQ_API_URL = "https://groq.com"
GROQ_API_KEY = os.environ.get("GROQ_API_KEY", "gsk_mock_key_for_smartbridge_eval_vibe")

def get_ai_financial_advice(status, dti, income, loan_amount):
    """Generates structured fintech recommendations using AI engine prompts"""
    try:
        headers = {
            "Authorization": f"Bearer {GROQ_API_KEY}",
            "Content-Type": "application/json"
        }
        prompt = f"Act as a FinTech Advisor. A user with monthly net income ${income} and Debt-to-Income ratio {dti}% applied for a ${loan_amount} loan. Result status is {status}. Provide 3 short financial advisory bullet points to manage their capital footprint safely."
        
        payload = {
            "model": "llama3-8b-8192",
            "messages": [{"role": "user", "content": prompt}],
            "temperature": 0.3
        }
        response = requests.post(GROQ_API_URL, json=payload, headers=headers, timeout=10)
        if response.status_code == 200:
            return response.json()['choices']['message']['content']
    except:
        pass
    return "✦ Maintain debt footprint under 30% baseline.\n✦ Allocate supplement capital to active loan buffers.\n✦ Build an emergency fund covering 6 months of external obligations."

def evaluate_loan_risk(income, debts, amount, tenure):
    dti_ratio = (debts / income) * 100 if income > 0 else 100
    max_allowable_loan = income * 60
    
    if dti_ratio > 45:
        return "Rejected", dti_ratio, "Your Debt-to-Income ratio is too high (Above 45%). Try reducing your monthly debts."
    if amount > max_allowable_loan:
        return "Rejected", dti_ratio, "Requested loan amount exceeds your eligible limit based on your income footprint."
        
    estimated_interest = 9.5 if dti_ratio < 25 else 11.5
    return "Approved", dti_ratio, f"Profile parameters look stable! Recommended interest: {estimated_interest}%."

@app.route('/')
def home():
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
        ai_advice = get_ai_financial_advice(status, dti, income, loan_amount)
        
        return jsonify({
            "status": "Success",
            "eligibility_status": status,
            "calculated_dti": round(dti, 2),
            "justification_text": comments,
            "ai_advisory_tips": ai_advice
        })
    except Exception as e:
        return jsonify({"status": "Error", "message": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)
