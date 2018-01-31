export default class Calculator {
  constructor (initialValues) {
    this.maxOfEachScale = [0, 25800, 51600, 77400, 103200, 154800, 206400, 309600, 412800, 999999999]
    this.fixed = [0, 7675.50, 15351.00, 23026.50, 30702.00, 38377.50, 46053.00, 53728.50, 61404.00, 69079.50, 76755.00, 60006.82, 92106.00]
    this.aliquotes = [0, 0.05, 0.09, 0.12, 0.15, 0.19, 0.23, 0.27, 0.31, 0.35]
    this.salary = initialValues || {
      gross: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      sac: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      inKind: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      socialContrib: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      incomeAdjustment: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      netSalary: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      annualNetSalary: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      spouse: [false, false, false, false, false, false, false, false, false, false, false, false],
      children: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      rentalExpenses: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      mortgageCapital: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      otherDeductions: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      deductions: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      deductionsDueFamilyResponsabilities: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      annualDeductions: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      scale: {
        base: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        fixed: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        aliquot: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      profit: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      tax: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      retention: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      retentionAdjustment: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      inKindRetentionDistribution: [[], [], [], [], [], [], [], [], [], [], [], []],
      annualRetention: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      retroactiveTaxesRetribution: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      toCharge: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      mtdik: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 1],
    }
    if (!initialValues) {
      this.setIncome('gross', 0, 0)
    }
  }

  // FIXME rename and return only keys that changed
  setInitialValues = () => {
    return this.salary
  }

  setIncome = (key, month, value) => {
    this.salary[key][month] = this.round(value)

    if (key === 'inKind') {
      this.fillInKindRetentionDistribution(month, value)
    }
    this.fillSac(month)
    this.fillSocialContrib(month)
    this.fillNetSalary(month)
    this.accumulate(this.fillNetSalary, this.salary.annualNetSalary, month)
    this.fillTaxes(month)

    return this.salary
  }

  setDeductions = (key, month, value) => {
    this.salary[key][month] = this.round(value)
    if (key === 'mtdik') {
      this.fillInKindRetentionDistribution(month, this.salary.inKind[month])
    }

    this.fillTaxes(month)

    // FIXME return only keys that need to be updated
    return this.salary
  }

  setAdjustment = (key, month, value) => {
    this.salary[key][month] = this.round(value)

    this.fillToCharge(month)
    this.scan(this.fillToCharge, month)

    // FIXME return only keys that need to be updated
    return this.salary
  }

  fillTaxes = (month) => {
    this.fillDeductions(month)
    this.scan(this.fillDeductions, month)
    this.scan(this.fillAliquot, month)
    this.fillTax(month)
    this.scan(this.fillTax, month)
    this.fillToCharge(month)
    this.scan(this.fillToCharge, month)
  }

  accumulate = (method, placeholder, fromMonth, toMonth = 11) => {
    let acc = 0
    if (fromMonth > 0) {
      acc = placeholder[fromMonth - 1]
    }

    for (let m = fromMonth; m <= toMonth; m++) {
      acc += method(m)
      placeholder[m] = this.round(acc)
    }
  }

  scan = (method, fromMonth, toMonth = 11) => {
    for (let m = fromMonth; m <= toMonth; m++) {
      method(m)
    }
  }

  round = (value) => {
    value = parseFloat(value) || 0
    return Math.round(value * 100) / 100
  }

  fillSocialContrib = (month) => {
    let maxTaxableGross = 81918.55
    if ((month + 1) % 6 === 0) {
      maxTaxableGross *= 1.5
    }
    const taxableGross = Math.min(this.salary.gross[month] + this.salary.sac[month] + this.salary.inKind[month], maxTaxableGross)

    this.salary.socialContrib[month] = this.round(
      this.round(taxableGross * 0.11) +
      this.round(taxableGross * 0.03) +
      this.round(taxableGross * 0.03)
    )
  }

  fillSac = (month) => {
    let workedMonths = this.salary.gross.slice(0, 6).length - this.salary.gross.slice(0, 6).filter(v => {
      return v <= 0
    }).length
    this.salary.sac[5] = this.round(Math.max(...(this.salary.gross.slice(0, 6))) / 12 * workedMonths)

    workedMonths = this.salary.gross.slice(5, 11).length - this.salary.gross.slice(5, 11).filter(v => {
      return v <= 0
    }).length
    this.salary.sac[11] = this.round(Math.max(...this.salary.gross) / 12 * workedMonths)
  }

  fillNetSalary = (month) => {
    this.salary.netSalary[month] = this.round(
      this.salary.gross[month] +
      this.salary.inKind[month] +
      this.salary.sac[month] +
      this.salary.incomeAdjustment[month] -
      this.salary.socialContrib[month]
    )

    return this.salary.netSalary[month]
  }

  fillDeductions = (month) => {
    const nonTaxable = 66917.91
    const specialDeduction = 321205.968
    const deductionPerSon = 31461.09
    const spouse = 62385.2
    const rentalExpensesMax = 51967
    const mortgageCapitalMax = 20000

    let totalDeductions = (
      nonTaxable +
      specialDeduction
    ) /
    12 * (month + 1)

    let previousMonthDeductions = 0
    let previousDeductionsDueFamilyResponsabilities = 0
    if (month > 0) {
      previousMonthDeductions = this.salary.annualDeductions[month - 1]
      previousDeductionsDueFamilyResponsabilities = this.salary.deductionsDueFamilyResponsabilities[month - 1]
    }

    let deductionsDueFamilyResponsabilities = 0
    deductionsDueFamilyResponsabilities = this.round(this.salary.children[month] * this.round(deductionPerSon / 12))
    deductionsDueFamilyResponsabilities += this.salary.spouse[month] ? this.round(spouse / 12) : 0
    deductionsDueFamilyResponsabilities += previousDeductionsDueFamilyResponsabilities
    if (this.salary.rentalExpenses[month] > 0) {
      deductionsDueFamilyResponsabilities += Math.min(this.round(this.salary.rentalExpenses[month] * 0.4), this.round(rentalExpensesMax / 12))
    }
    if (this.salary.mortgageCapital[month] > 0) {
      deductionsDueFamilyResponsabilities += Math.min(this.salary.mortgageCapital[month], this.round(mortgageCapitalMax / 12))
    }
    deductionsDueFamilyResponsabilities += this.round(this.salary.otherDeductions[month])

    totalDeductions += deductionsDueFamilyResponsabilities

    this.salary.deductionsDueFamilyResponsabilities[month] = this.round(deductionsDueFamilyResponsabilities)
    this.salary.deductions[month] = this.round(totalDeductions - previousMonthDeductions)
    this.salary.annualDeductions[month] = this.round(totalDeductions)
  }

  fillAliquot = (month) => {
    const maxOfEachScale = [0, 25800, 51600, 77400, 103200, 154800, 206400, 309600, 412800, 999999999]
    const fixed = [0, 1287.7, 3605.56, 6696.04, 10559.14, 20345.66, 32192.50, 60006.82, 91941.78]
    const aliquotes = [0, 0.05, 0.09, 0.12, 0.15, 0.19, 0.23, 0.27, 0.31, 0.35]
    const netProfitAcc = this.round(
      Math.max(
        this.salary.annualNetSalary[month] -
          this.salary.annualDeductions[month] -
          this.salary.inKindRetentionDistribution[month].reduce((a, b) => { return a + b }, 0)
        , 0
      )
    )

    let scale = 0
    for (; scale <= 9; scale++) {
      if (maxOfEachScale[scale] / 12 * (month + 1) >= netProfitAcc) {
        break
      }
    }

    this.salary.scale.fixed[month] = fixed[scale - 1] / 12 * (month + 1)
    this.salary.scale.base[month] = maxOfEachScale[scale - 1] / 12 * (month + 1)
    this.salary.scale.aliquot[month] = aliquotes[scale]
    this.salary.profit[month] = netProfitAcc
  }

  fillTax = (month) => {
    this.salary.tax[month] = this.round(
      this.salary.scale.fixed[month] +
      (this.salary.profit[month] - this.salary.scale.base[month]) * this.salary.scale.aliquot[month]
    )
    return this.salary.tax[month]
  }

  fillInKindRetentionDistribution = (month, inKind) => {
    const remainingMonths = 12 - month
    const monthsToDistribute = Math.min(parseInt(this.salary.mtdik[month]) || 3, remainingMonths)
    for (let i = 0; i < 12; i++) {
      this.salary.inKindRetentionDistribution[i][month] = 0
    }
    for (let i = monthsToDistribute; i > 0; i--) {
      this.salary.inKindRetentionDistribution[month + monthsToDistribute - i][month] = this.round(inKind / monthsToDistribute * (i - 1))
    }
  }

  fillToCharge = (month) => {
    if (month > 0) {
      this.salary.annualRetention[month] = this.round(this.salary.retention[month - 1] + this.salary.annualRetention[month - 1])
    }

    this.salary.retention[month] = this.round(
      this.salary.tax[month] -
      this.salary.annualRetention[month] -
      this.salary.retentionAdjustment[month]
    )

    this.salary.toCharge[month] = this.round(
      this.salary.netSalary[month] -
      this.salary.retention[month] -
      this.salary.inKind[month] +
      this.salary.retroactiveTaxesRetribution[month]
    )

    return this.salary.toCharge[month]
  }
}
