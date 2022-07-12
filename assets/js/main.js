let salary = 0.00;
let benefits = 0.00;
let pay_period = null;
let deduct_nhif = null;
let deduct_nssf = null;
let nssf_rate = null;
let income_before_pension_deduction;
let deductible_nssf_pension_contribution;
let income_after_persion_deductons
let benefitsAllowance;
let taxableIncome;
let taxOnTaxableIncome;
let personalRelief;
let taxRelief;
let paye;
let chargeableIncome;
let nhif;
let netPay;

function calculateTax() {
    if (document.getElementById('month').checked) {
        pay_period = document.getElementById('month').value;
    } else if (document.getElementById('year').checked) {
        pay_period = document.getElementById('year').value;
    }
    if (document.getElementById('nssf_yes').checked) {
        deduct_nssf = document.getElementById('nssf_yes').value;
    } else if (document.getElementById('nssf_no').checked) {
        deduct_nssf = document.getElementById('nssf_no').value;
    }
    if (document.getElementById('nhif_yes').checked) {
        deduct_nhif = document.getElementById('nhif_yes').value;
    } else if (document.getElementById('nhif_no').checked) {
        deduct_nhif = document.getElementById('nhif_no').value;
    }
    if (document.getElementById('new').checked) {
        nssf_rate = document.getElementById('new').value;
    } else if (document.getElementById('old').checked) {
        nssf_rate = document.getElementById('old').value;
    }
    salary = document.getElementById('salary').value;
    benefits = document.getElementById('benefits').value;
    income_before_pension_deduction = salary;
    document.getElementById('income_before_pension_deduction').innerHTML = `KSH ${income_before_pension_deduction}`;
    if (deduct_nssf == 'yes') {
        if (nssf_rate == 'new') {
            deductible_nssf_pension_contribution = 1200; // calculate nssf tier
            document.getElementById('deductibleNssfPensionContribution').innerHTML = `KSH ${deductible_nssf_pension_contribution}`
        } else if (nssf_rate == 'old') {
            deductible_nssf_pension_contribution = 200;
            document.getElementById('deductibleNssfPensionContribution').innerHTML = `KSH ${deductible_nssf_pension_contribution}`
        }
    } else if (deduct_nssf == 'no') {
        deductible_nssf_pension_contribution = 0;
        document.getElementById('deductibleNssfPensionContribution').innerHTML = `KSH ${deductible_nssf_pension_contribution}`
    }
    if (deductible_nssf_pension_contribution >= 0) {
        income_after_persion_deductons = income_before_pension_deduction - deductible_nssf_pension_contribution;
        document.getElementById('incomeAfterPensiondeductons').innerHTML = `KSH ${income_after_persion_deductons}`
    } else {
        income_after_persion_deductons = income_before_pension_deduction;
        document.getElementById('incomeAfterPensiondeductons').innerHTML = `KSH ${income_after_persion_deductons}`
    }
    benefitsAllowance = benefits;
    document.getElementById('benefits-allowance').innerHTML = `KSH ${benefitsAllowance}`
    taxableIncome = (+income_after_persion_deductons + +benefitsAllowance);
    document.getElementById('taxable_income').innerHTML = `KSH ${taxableIncome}`;
    chargeableIncome = taxableIncome;
    document.getElementById('chargeableIncome').innerHTML = `KSH ${chargeableIncome}`;
    if (pay_period == 'month') {
        personalRelief = 2400;
        document.getElementById('personalRelief').innerHTML = `KSH ${personalRelief}`
        calculateIncomeTax('month');
        document.getElementById('taxOntaxableIncome').innerHTML = `KSH ${taxOnTaxableIncome}`
        paye = (taxOnTaxableIncome - personalRelief).toFixed(2)
    } else if (pay_period == 'year') {
        personalRelief = 28800;
        document.getElementById('personalRelief').innerHTML = `KSH ${personalRelief}`
        calculateIncomeTax('year')
        document.getElementById('taxOntaxableIncome').innerHTML = `KSH ${taxOnTaxableIncome}`
        paye = (taxOnTaxableIncome - personalRelief).toFixed(2)
    } else {
        personalRelief = 0.00;
        calculateIncomeTax()
        document.getElementById('personalRelief').innerHTML = `KSH ${personalRelief}`
        document.getElementById('taxOntaxableIncome').innerHTML = `KSH ${taxOnTaxableIncome}`
        paye = (taxOnTaxableIncome - personalRelief).toFixed(2)
    }
    taxRelief = paye;
    document.getElementById('taxRelief').innerHTML = `KSH ${taxRelief}`
    document.getElementById('paye').innerHTML = `KSH ${paye}`
    // nhif
    if (deduct_nhif == 'yes') {
        calculate_nhif();
        document.getElementById('nhif').innerHTML = `KSH ${nhif}`
        netPay = (+chargeableIncome - +nhif - +paye);
        document.getElementById('netPay').innerHTML = `KSH ${netPay}`
    } else if (deduct_nhif == 'no') {
        nhif_contribution = 0;
        document.getElementById(' nhif').innerHTML = `KSH ${nhif}`
        netPay = (+chargeableIncome - +nhif - +paye);
        document.getElementById('netPay').innerHTML = `KSH ${netPay}`
    } else {
        netPay = (+chargeableIncome);
        document.getElementById('netPay').innerHTML = `KSH ${netPay}`
    }
}

function calculate_nhif() {
    if (salary <= 5999) {
        return nhif = 150;
    } else if (salary >= 6000 && salary <= 7999) {
        return nhif = 300
    } else if (salary >= 8000 && salary <= 11999) {
        return nhif = 400
    } else if (salary >= 12000 && salary <= 14999) {
        return nhif = 500
    } else if (salary >= 15000 && salary <= 19999) {
        return nhif = 600
    } else if (salary >= 20000 && salary <= 24999) {
        return nhif = 750
    } else if (salary >= 25000 && salary <= 29999) {
        return nhif = 850
    } else if (salary >= 30000 && salary <= 34999) {
        return nhif = 900
    } else if (salary >= 35000 && salary <= 39999) {
        return nhif = 950
    } else if (salary >= 40000 && salary <= 44999) {
        return nhif = 1000
    } else if (salary >= 45000 && salary <= 49999) {
        return nhif = 1100
    } else if (salary >= 50000 && salary <= 59999) {
        return nhif = 1200
    } else if (salary >= 60000 && salary <= 69999) {
        return nhif = 1300
    } else if (salary >= 70000 && salary <= 79999) {
        return nhif = 1400
    } else if (salary >= 80000 && salary <= 89999) {
        return nhif = 1500
    } else if (salary >= 90000 && salary <= 99999) {
        return nhif = 1600
    }
}

function calculateIncomeTax(period) {
    taxOnTaxableIncome = 0;
    let i, j, k, l = 0;
    let res;
    let taxes = [];
    if (period == 'month') {
        if (taxableIncome > 12298) {
            i = taxableIncome - 12298;
            res = 12298 * 0.10;
            taxes.push(res);
            if (i > 11587) {
                j = i - 11587;
                res = 11587 * 0.15;
                taxes.push(res);
                if (j > 11587) {
                    k = j - 11587;
                    res = 11587 * 0.20;
                    taxes.push(res);
                    if (k > 11587) {
                        l = k - 11587;
                        res = 11587 * 0.25;
                        taxes.push(res);
                        if (l) {
                            res = l * 0.30;
                            taxes.push(res);
                        }
                    } else {
                        res = k * 0.25;
                        taxes.push(res);
                    }
                } else {
                    res = j * 0.20;
                    taxes.push(res)
                }
            } else {
                res = i * 0.15;
                taxes.push(res);
            }
        } else {
            res = taxableIncome * 0.10;
            taxes.push(res);
        }
    } else if (period == 'year') {
        // console.log('year income tax');
        if (taxableIncome > 147580) {
            i = taxableIncome - 147580;
            res = 147580 * 0.1;
            taxes.push(res);
            if (i > 139043) {
                j = i - 139043;
                res = 139043 * 0.15;
                taxes.push(res);
                if (j > 139043) {
                    k = j - 139043;
                    res = 139043 * 0.20;
                    taxes.push(res);
                    if (k > 139043) {
                        l = k - 139043;
                        res = 139043 * 0.25;
                        taxes.push(res);
                        if (l) {
                            res = l * 0.30;
                            taxes.push(res);
                        }
                    } else {
                        res = k * 0.25;
                        taxes.push(res);
                    }
                } else {
                    res = j * 0.20;
                    taxes.push(res)
                }
            } else {
                res = i * 0.15;
                taxes.push(res);
            }
        } else {
            res = taxable_income * 0.10;
            taxes.push(res);
        }
    } else {
        taxes = [0];
    }
    console.log(taxes);
    taxes.forEach(el => {
        taxOnTaxableIncome = taxOnTaxableIncome + el;
    })
    console.log(taxOnTaxableIncome.toFixed(2))
    return taxOnTaxableIncome.toFixed(2);
}