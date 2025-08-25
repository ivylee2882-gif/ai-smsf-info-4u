document.getElementById('calculator-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get input values
    const currentAge = parseInt(document.getElementById('current-age').value);
    const income = parseFloat(document.getElementById('income').value);
    const concessional = Math.min(parseFloat(document.getElementById('concessional').value), 30000); // 2025-26 cap
    const nonConcessional = Math.min(parseFloat(document.getElementById('non-concessional').value), 120000); // 2025-26 cap
    const retirementAge = parseInt(document.getElementById('retirement-age').value);
    const returnRate = parseFloat(document.getElementById('return-rate').value) / 100;
    
    // Validation
    if (currentAge >= retirementAge || currentAge < 18 || retirementAge > 75) {
        alert('Invalid age inputs. Current age must be less than retirement age (60-75).');
        return;
    }
    
    // Initialize variables
    let balance = 0;
    const years = retirementAge - currentAge;
    const resultsTable = document.getElementById('results-table');
    resultsTable.innerHTML = '';
    
    // Calculate yearly breakdown
    for (let year = 0; year < years; year++) {
        const age = currentAge + year;
        const contributions = concessional + nonConcessional;
        const investmentReturn = balance * returnRate;
        const tax = (concessional * 0.15) + (investmentReturn * 0.15); // 15% tax on contributions and earnings
        balance = balance + contributions + investmentReturn - tax;
        
        // Add row to table
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="border p-2">${year + 1}</td>
            <td class="border p-2">${age}</td>
            <td class="border p-2">${contributions.toFixed(2)}</td>
            <td class="border p-2">${investmentReturn.toFixed(2)}</td>
            <td class="border p-2">${tax.toFixed(2)}</td>
            <td class="border p-2">${balance.toFixed(2)}</td>
        `;
        resultsTable.appendChild(row);
    }
    
    // Display final balance
    document.getElementById('final-balance').textContent = `Estimated Balance at Age ${retirementAge}: $${balance.toFixed(2)}`;
    document.getElementById('results').classList.remove('hidden');
});