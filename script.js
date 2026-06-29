function calculateEligibility() {
    // Correctly fetch elements matching the precise HTML structural tree
    const incomeInput = document.getElementById('income');
    const existingEmiInput = document.getElementById('existingEmi');
    const loanAmountInput = document.getElementById('loanAmount');
    const resultBox = document.getElementById('eligibilityResult');
    const resultText = document.getElementById('eligibilityText');
    
    // Safety check to ensure elements exist before checking settings attributes
    if (!incomeInput || !existingEmiInput || !loanAmountInput || !resultBox || !resultText) {
        return;
    }

    const income = parseFloat(incomeInput.value) || 0;
    const existingEmi = parseFloat(existingEmiInput.value) || 0;
    const loanAmount = parseFloat(loanAmountInput.value) || 0;
    
    // Mathematical algorithm execution layers
    const maxEmiAllowed = income * 0.50; 
    const availableEmiCap = maxEmiAllowed - existingEmi;
    const estimatedNewEmi = loanAmount * 0.025; 
    
    resultBox.style.display = 'block';
    if (availableEmiCap > estimatedNewEmi && income > 2000) {
        resultText.innerHTML = `<span style="color:#4ade80;font-weight:600;">ELIGIBLE</span><br>Your disposable metrics comfortably satisfy capital criteria. Maximum estimated additional monthly EMI capacity: <strong>$${availableEmiCap.toFixed(2)}</strong>.`;
    } else {
        resultText.innerHTML = `<span style="color:#f87171;font-weight:600;">NOT ELIGIBLE</span><br>Debt obligation load exceeds safe structural bounds. Consider lowering the requested principal amount or paying off active credit lines.`;
    }
}

function analyzeCreditRisk() {
    const scoreInput = document.getElementById('creditScore');
    const delaysInput = document.getElementById('delayedPayments');
    const utilInput = document.getElementById('creditUtil');
    const resultBox = document.getElementById('creditResult');
    const resultText = document.getElementById('creditText');
    
    if (!scoreInput || !delaysInput || !utilInput || !resultBox || !resultText) {
        return;
    }

    const score = parseInt(scoreInput.value) || 0;
    const delays = parseInt(delaysInput.value) || 0;
    const util = parseFloat(utilInput.value) || 0;
    
    resultBox.style.display = 'block';
    if (score >= 750 && delays === 0 && util <= 30) {
        resultText.innerHTML = `<span style="color:#4ade80;font-weight:600;">LOW DEFAULT RISK</span><br>Excellent asset historical profile. High probability of seamless institutional approval.`;
    } else if (score >= 650 && delays <= 2 && util <= 50) {
        resultText.innerHTML = `<span style="color:#fbbf24;font-weight:600;">MEDIUM RISK PROFILE</span><br>Moderate baseline parameters observed. Minor indicators of usage spikes. Conditional terms may apply.`;
    } else {
        resultText.innerHTML = `<span style="color:#f87171;font-weight:600;">HIGH DEFAULT RISK</span><br>Profile marks structural weakness. Clean historical logs or reduce revolving balance weights before proceeding.`;
    }
}

function computeEmiAmortization() {
    const principalInput = document.getElementById('emiPrincipal');
    const rateInput = document.getElementById('emiRate');
    const tenureInput = document.getElementById('emiTenure');
    const resultBox = document.getElementById('emiResult');
    const resultText = document.getElementById('emiText');
    
    if (!principalInput || !rateInput || !tenureInput || !resultBox || !resultText) {
        return;
    }

    const P = parseFloat(principalInput.value) || 0;
    const annualRate = parseFloat(rateInput.value) || 0;
    const N = parseInt(tenureInput.value) || 0;
    
    const r = (annualRate / 12) / 100;
    let emi = 0;
    
    if (r > 0) {
        emi = P * r * Math.pow(1 + r, N) / (Math.pow(1 + r, N) - 1);
    } else {
        emi = P / N;
    }
    
    const totalPayment = emi * N;
    const totalInterest = totalPayment - P;
    
    resultBox.style.display = 'block';
    resultText.innerHTML = `Monthly Installment (EMI): <strong>$${emi.toFixed(2)}</strong><br>
                            Total Interest Burden: <strong>$${totalInterest.toFixed(2)}</strong><br>
                            Aggregate Capital Payback: <strong>$${totalPayment.toFixed(2)}</strong>`;
}
