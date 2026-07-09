// --- Indian Currency Formatting Helper ---
function formatINR(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount);
}

// --- EPIC 4 Client Integration State (Page Load Hook) ---
document.addEventListener("DOMContentLoaded", () => {
    const savedName = localStorage.getItem("applicantName");
    const welcomeSlot = document.getElementById("userWelcomeSlot");
    
    // ఒకవేళ యూజర్ ఎలిజిబిలిటీ చెక్ చేసుకుంటే, మిగిలిన పేజీల్లో వెల్కమ్ బ్యానర్ చూపిస్తుంది
    if (savedName && welcomeSlot) {
        welcomeSlot.innerHTML = `<div class="user-welcome-badge"><i class="fa-solid fa-circle-user"></i> Active Profile: ${savedName}</div>`;
    }
});

// --- Feature 1: Exact Rule-Based Loan Eligibility Engine ---
function checkEligibility() {
    const name = document.getElementById('name').value.trim();
    const salary = parseFloat(document.getElementById('salary').value);
    const score = parseInt(document.getElementById('score').value);
    const emiInput = parseFloat(document.getElementById('emiInput').value) || 0;
    const age = parseInt(document.getElementById('age').value);
    const resultBox = document.getElementById('eligibilityResult');

    if (!name || !salary || !score || !age) {
        alert("Please fill in all the configuration fields.");
        return;
    }

    resultBox.classList.remove('hide', 'success', 'danger');

    // Strict Rule Validation Sequence mapped directly from Image Requirements matrix
    if (salary <= 30000) {
        resultBox.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> <strong>Rejected — insufficient income:</strong> Monthly gross salary must exceed ₹30,000 threshold barrier.`;
        resultBox.classList.add('danger');
        return;
    }
    if (score <= 700) {
        resultBox.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> <strong>Rejected — low creditworthiness:</strong> CIBIL score must be greater than 700 scale indices.`;
        resultBox.classList.add('danger');
        return;
    }
    if (emiInput >= 20000) {
        resultBox.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> <strong>Rejected — high existing obligations:</strong> Active liabilities must remain below ₹20,000 safety zone rules.`;
        resultBox.classList.add('danger');
        return;
    }
    if (age < 21) {
        resultBox.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> <strong>Rejected — minimum age requirement:</strong> Applicant system structural age baseline must be at least 21 years old.`;
        resultBox.classList.add('danger');
        return;
    }

    // EPIC 4 Logic Integration: Save State into Local Storage
    localStorage.setItem("applicantName", name);

    // Calculation logic rule formula: Monthly Salary x 20
    const eligibleAmount = salary * 20;
    
    // Risk Level Profiling logic engine bounds
    let riskClassification = "Medium Risk Layer";
    if (score >= 750 && emiInput === 0) {
        riskClassification = "Low Risk Tier Profile";
    }

    resultBox.innerHTML = `
        <i class="fa-solid fa-circle-check"></i> <strong>Congratulations, ${name}!</strong><br>
        Status: Approved / Active<br>
        Eligible Loan Amount: <strong>${formatINR(eligibleAmount)}</strong><br>
        Risk Classification: ${riskClassification}
    `;
    resultBox.classList.add('success');
}

// --- Feature 2: Credit Score Classification Matrix ---
function analyzeCredit() {
    const score = parseInt(document.getElementById('creditScore').value);
    const resultBox = document.getElementById('creditResult');

    if (!score || score < 300 || score > 900) {
        alert("Enter system tracking score parameter logic (300-900).");
        return;
    }

    resultBox.classList.remove('hide', 'success', 'danger');

    if (score >= 750 && score <= 900) {
        resultBox.innerHTML = `<i class="fa-solid fa-star"></i> <strong>Excellent Profile Level (${score}):</strong> Premium access tier rules open. Timely repayments verified.`;
        resultBox.classList.add('success');
    } else if (score >= 650 && score <= 749) {
        resultBox.innerHTML = `<i class="fa-solid fa-circle-info"></i> <strong>Good Profile Level (${score}):</strong> Standard asset underwriting channels applied. Maintain lower utilization ratios.`;
        resultBox.classList.add('success');
    } else {
        resultBox.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> <strong>Poor Profile Layer (${score}):</strong> High structural probability flag. Optimization recommendation focus: Reduce revolving balances instantly.`;
        resultBox.classList.add('danger');
    }
}

// --- Feature 3: Standard Reducing-Balance EMI Engine ---
function calculateEmi() {
    const principal = parseFloat(document.getElementById('emiAmount').value);
    const annualRate = parseFloat(document.getElementById('emiRate').value);
    const tenureMonths = parseInt(document.getElementById('emiTenure').value);
    const resultBox = document.getElementById('emiResult');

    if (!principal || !annualRate || !tenureMonths) {
        alert("Complete required validation fields.");
        return;
    }

    // Formula execution: Monthly interest rate = Annual Rate / 12 / 100
    const monthlyRate = (annualRate / 12) / 100;
    
    // Standard reducing-balance mathematical blueprint logic: EMI = [P x R x (1+R)^N] / [(1+R)^N - 1]
    const ratePow = Math.pow(1 + monthlyRate, tenureMonths);
    const emi = (principal * monthlyRate * ratePow) / (ratePow - 1);
    
    const totalPayment = emi * tenureMonths;
    const totalInterest = totalPayment - principal;

    resultBox.classList.remove('hide', 'danger');
    resultBox.classList.add('success');
    resultBox.innerHTML = `
        <p><strong>Calculated Monthly EMI:</strong> ${formatINR(emi)}</p>
        <p style="font-size:0.85rem; margin-top:0.4rem; color:var(--text-muted)">Principal Value: ${formatINR(principal)} | Total Interest Vector: ${formatINR(totalInterest)} | Maturity Gross Settlement: ${formatINR(totalPayment)}</p>
    `;
}
