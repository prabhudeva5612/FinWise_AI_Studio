// --- Indian Currency Formatting Helper ---
function formatINR(amount) {
    return '₹' + amount;
}

// --- Page Load Hook (EPIC 4 State Sync) ---
document.addEventListener("DOMContentLoaded", () => {
    const savedName = localStorage.getItem("applicantName");
    const welcomeSlot = document.getElementById("userWelcomeSlot");
    if (savedName && welcomeSlot) {
        welcomeSlot.innerHTML = `<div class="user-welcome-badge"><i class="fa-solid fa-circle-user"></i> Active Profile: ${savedName}</div>`;
    }
});

// --- Feature 1: Exact Rule-Based Loan Eligibility Engine (EPIC 5 Approved) ---
function checkEligibility() {
    const name = document.getElementById('name').value.trim();
    const salary = parseFloat(document.getElementById('salary').value);
    const score = parseInt(document.getElementById('score').value);
    const emiInput = parseFloat(document.getElementById('emiInput').value) || 0;
    const age = parseInt(document.getElementById('age').value);
    const resultBox = document.getElementById('eligibilityResult');

    if (!name || !salary || !score || !age) {
        alert("Please fill in all fields.");
        return;
    }

    resultBox.classList.remove('hide', 'success', 'danger');

    // Strict Rules Matrix Validation
    if (salary <= 30000) {
        resultBox.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> <strong>Rejected — insufficient income:</strong> Salary must exceed ₹30,000.`;
        resultBox.classList.add('danger'); return;
    }
    if (score <= 700) {
        resultBox.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> <strong>Rejected — low creditworthiness:</strong> Credit score must be greater than 700.`;
        resultBox.classList.add('danger'); return;
    }
    if (emiInput >= 20000) {
        resultBox.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> <strong>Rejected — high existing obligations:</strong> Existing EMI must be below ₹20,000.`;
        resultBox.classList.add('danger'); return;
    }
    if (age < 21) {
        resultBox.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> <strong>Rejected — minimum age requirement:</strong> Age must be at least 21.`;
        resultBox.classList.add('danger'); return;
    }

    localStorage.setItem("applicantName", name);
    const eligibleAmount = salary * 20;
    
    let riskLevel = "Low";
    if (score < 750) riskLevel = "Medium";

    // Output UI exact structure match for Functional Testing Section
    resultBox.innerHTML = `
        <div style="text-align: left; padding: 5px;">
            <p style="font-size: 1.15rem; font-weight: 600; margin-bottom: 0.8rem; color: #fff;">
                Loan Approved <i class="fa-solid fa-square-check" style="color: #10b981;"></i>
            </p>
            <p style="margin: 0.3rem 0; font-size: 0.95rem; color: #fff;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 0.3rem 0; font-size: 0.95rem; color: #fff;"><strong>Risk Level:</strong> ${riskLevel}</p>
            <p style="margin: 0.3rem 0; font-size: 0.95rem; color: #fff;"><strong>Eligible Loan Amount:</strong> ${formatINR(eligibleAmount)}</p>
        </div>
    `;
    resultBox.classList.add('success');
}

// --- Feature 2: Credit Score Analyzer ---
function analyzeCredit() {
    const score = parseInt(document.getElementById('creditScore').value);
    const resultBox = document.getElementById('creditResult');
    if (!score || score < 300 || score > 900) { alert("Enter score between 300-900."); return; }
    resultBox.classList.remove('hide', 'success', 'danger');
    if (score >= 750) { resultBox.innerHTML = `<strong>Excellent Profile (${score}):</strong> Prime low interest rates active.`; resultBox.classList.add('success'); }
    else if (score >= 650) { resultBox.innerHTML = `<strong>Standard Profile (${score}):</strong> Standard underwriting applies.`; resultBox.classList.add('success'); }
    else { resultBox.innerHTML = `<strong>Poor Profile (${score}):</strong> High-risk structural tier assignment.`; resultBox.classList.add('danger'); }
}

// --- Feature 3: EMI Calculator ---
function calculateEmi() {
    const principal = parseFloat(document.getElementById('emiAmount').value);
    const annualRate = parseFloat(document.getElementById('emiRate').value);
    const tenureMonths = parseInt(document.getElementById('emiTenure').value);
    const resultBox = document.getElementById('emiResult');

    if (!principal || !annualRate || !tenureMonths) { alert("Complete all inputs."); return; }
    const monthlyRate = (annualRate / 12) / 100;
    const ratePow = Math.pow(1 + monthlyRate, tenureMonths);
    const emi = (principal * monthlyRate * ratePow) / (ratePow - 1);
    
    resultBox.classList.remove('hide'); resultBox.classList.add('success');
    resultBox.innerHTML = `<p><strong>Monthly EMI:</strong> ${formatINR(emi.toFixed(0))}</p>`;
}
