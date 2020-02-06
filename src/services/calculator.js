// 2016
// const MAX_TAXABLE_GROSS = [48598.08, 48598.08, 56057.93, 56057.93, 56057.93, 56057.93, 56057.93, 56057.93, 63995.73, 63995.73, 63995.73, 63995.73]
// const SCALE_MAX = [0, 10000, 20000, 30000, 60000, 90000, 120000, 999999999]
// const SCALE_FIXED = [0, 900, 2300, 4200, 11100, 19200, 28500]
// const SCALE_ALIQUOTES = [0, 0.09, 0.14, 0.19, 0.23, 0.27, 0.31, 0.35]
// const DEDUCTION_NON_TAXABLE = 42318
// const DEDUCTION_SPECIAL = 203126.40
// const DEDUCTION_PER_SON = 19889
// const DEDUCTION_DUE_SPOUSE = 39778
// const DEDUCTION_MAX_RENTAL_EXP = 85849
// const DEDUCTION_MAX_MORTGAGE_CAP = 20000
// const ENABLE_SAC_DISTRIBUTION = false
// const DEDUCTION_DOMESTIC = 0

// 2018
// const MAX_TAXABLE_GROSS = [81918.55, 81918.55, 86596.10, 86596.10, 86596.10, 91523.41, 91523.41, 91523.41, 97637.14, 97637.14, 97637.14, 105233.32]
// const SCALE_MAX = [0, 25754, 51508, 77262, 103016, 154524, 206032, 309048, 412064, 999999999]
// const SCALE_FIXED = [0, 1287.7, 3605.56, 6696.04, 10559.14, 20345.66, 32192.50, 60006.82, 91941.78]
// const SCALE_ALIQUOTES = [0, 0.05, 0.09, 0.12, 0.15, 0.19, 0.23, 0.27, 0.31, 0.35]
// const DEDUCTION_NON_TAXABLE = 66917.91
// const DEDUCTION_SPECIAL = 321205.968
// const DEDUCTION_PER_SON = 31461.09
// const DEDUCTION_DUE_SPOUSE = 62385.2
// const DEDUCTION_MAX_RENTAL_EXP = 51967
// const DEDUCTION_MAX_MORTGAGE_CAP = 40000
// const ENABLE_SAC_DISTRIBUTION = true
// const DEDUCTION_DOMESTIC = 66917

// 2019
// http://www.afip.gob.ar/gananciasYBienes/documentos/DEDUCCIONES-PARA-PERIODO-2019-RIPTE.pdf
// http://www.afip.gob.ar/gananciasYBienes/documentos/TablaART90-Periodo2019.pdf
// const MAX_TAXABLE_GROSS = [105233.32, 105233.32, 117682.47, 117682.47, 117682.47, 130321.52, 130321.52, 130321.52, 146246.86, 146246.86, 146246.86, 146246.86 ]
// const SCALE_MAX = [0, 33039.81, 66079.61, 99119.42, 132159.23, 198238.84, 264318.45, 396477.68, 528636.91, 999999999999]
// const SCALE_FIXED = [0, 1651.99, 4625.57, 8590.35, 13546.32, 26101.45, 41299.76, 76982.75, 117952.11]
// const SCALE_ALIQUOTES = [0, 0.05, 0.09, 0.12, 0.15, 0.19, 0.23, 0.27, 0.31, 0.35]
// const DEDUCTION_NON_TAXABLE = [85848.99, 85848.99, 85848.99, 85848.99, 85848.99, 85848.99, 85848.99, 103018.79, 103018.79, 103018.79, 103018.79, 103018.79]
// const DEDUCTION_SPECIAL = [412075.14, 412075.14, 412075.14, 412075.14, 412075.14, 412075.14, 412075.14, 494490.17, 494490.17, 494490.17, 494490.17, 494490.17]
// const DEDUCTION_PER_SON = 40361.43
// const DEDUCTION_DUE_SPOUSE = 80033.97
// const DEDUCTION_MAX_RENTAL_EXP = 85849
// const DEDUCTION_MAX_MORTGAGE_CAP = 20000
// const ENABLE_SAC_DISTRIBUTION = true
// const DEDUCTION_DOMESTIC = 85848.99

// 2020
// http://www.afip.gob.ar/gananciasYBienes/documentos/DEDUCCIONES-PARA-PERIODO-2019-RIPTE.pdf
// http://www.afip.gob.ar/gananciasYBienes/documentos/TablaART90-Periodo2019.pdf
const MAX_TAXABLE_GROSS = [146246.86, 146246.86, 146246.86, 146246.86, 146246.86, 146246.86, 146246.86, 146246.86, 146246.86, 146246.86, 146246.86, 146246.86]
const SCALE_MAX = [0, 33039.81, 66079.61, 99119.42, 132159.23, 198238.84, 264318.45, 396477.68, 528636.91, 999999999999]
const SCALE_FIXED = [0, 1651.99, 4625.57, 8590.35, 13546.32, 26101.45, 41299.76, 76982.75, 117952.11]
const SCALE_ALIQUOTES = [0, 0.05, 0.09, 0.12, 0.15, 0.19, 0.23, 0.27, 0.31, 0.35]
const DEDUCTION_NON_TAXABLE = [123862.92, 123862.92, 123862.92, 123862.92, 123862.92, 123862.92, 123862.92, 123862.92, 123862.92, 123862.92, 123862.92, 123862.92]
const DEDUCTION_SPECIAL = [594542.01, 594542.01, 594542.01, 594542.01, 594542.01, 594542.01, 594542.01, 594542.01, 594542.01, 594542.01, 594542.01, 594542.01]

const DEDUCTION_PER_SON = 58233.47
const DEDUCTION_DUE_SPOUSE = 115473.01
const DEDUCTION_MAX_RENTAL_EXP = 123862.94
const DEDUCTION_MAX_MORTGAGE_CAP = 20000
const ENABLE_SAC_DISTRIBUTION = true
const DEDUCTION_DOMESTIC = 123862.92

export default class Calculator {
  constructor (initialValues) {
    this._input = initialValues || {
      basic: Array(12).fill(0),
      comissions: Array(12).fill(0),
      inKind: Array(12).fill(0),
      incomeAdjustment: Array(12).fill(0),
      spouse: Array(12).fill(false),
      children: Array(12).fill(0),
      rentalExpenses: Array(12).fill(0),
      mortgageCapital: Array(12).fill(0),
      domestic: Array(12).fill(0),
      otherDeductions: Array(12).fill(0),
      monthsToDistributeInKindRetention: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 1],
      retentionAdjustment: Array(12).fill(0),
      actualRetention: Array(12).fill(0),
      retroactiveTaxesRetribution: Array(12).fill(0),
      actualPayment: Array(12).fill(0),
      secondActualPayment: Array(12).fill(0),
    }
    if (!this._input.sacAnualDistributionAdjustment) {
      this._input.sacAnualDistributionAdjustment = Array(12).fill(0)
    }
    if (!this._input.actualRetention) {
      this._input.actualRetention = Array(12).fill(0)
    }
    if (!this._input.secondActualPayment) {
      this._input.secondActualPayment = Array(12).fill(0)
    }
    if (!this._input.domestic) {
      this._input.domestic = Array(12).fill(0)
    }
    if (!this._input.comissions) {
      this._input.comissions = Array(12).fill(0)
    }

    this._calculated = {
      sac: Array(12).fill(0),
      socialContrib: Array(12).fill(0),
      sacSocialContrib: Array(12).fill(0),
      netSalary: Array(12).fill(0),
      annualSalary: Array(12).fill(0),
      annualNetSalary: Array(12).fill(0),
      sacAnualDistribution: Array(12).fill(0),
      deductions: Array(12).fill(0),
      deductionsDueFamilyResponsabilities: Array(12).fill(0),
      annualDeductions: Array(12).fill(0),
      scale: {
        base: Array(12).fill(0),
        fixed: Array(12).fill(0),
        aliquot: Array(12).fill(0),
      },
      profit: Array(12).fill(0),
      tax: Array(12).fill(0),
      retention: Array(12).fill(0),
      inKindRetentionDistribution: Array(12).fill().map(u => []),
      inKindRetentionTotalDistribution: Array(12).fill(0),
      annualRetention: Array(12).fill(0),
      toPayOut: Array(12).fill(0),
      grandTotal: Array(12).fill(0),
      discrepancy: Array(12).fill(0),
    }

    if (initialValues) {
      for (let m = 0; m <= 11; m++) {
        this.setIncome('basic', m, this._input.basic[m], true)
        if (this._input.inKind[m]) {
          this.setIncome('inKind', m, this._input.inKind[m], true)
        }
        if (this._input.comissions[m]) {
          this.setIncome('comissions', m, this._input.comissions[m], true)
        }
      }
    }
  }

  _calculated = {}

  _input = {}

  getValuesToStore = () => {
    return this._input
  }

  // FIXME rename and return only keys that changed
  setInitialValues = () => {
    return Object.assign({}, this._input, this._calculated)
  }

  autoFill = (key, placeHolder, method, month, value) => {
    if (!placeHolder.slice(month, 11).some(e => e !== placeHolder[month]) && placeHolder[month] !== value) {
      // if every value in the placeHolder is the same
      for (let i = month + 1; i <= 11; i++) {
        method(key, i, value, true)
      }
      return true
    }
  }

  setIncome = (key, month, value, dontAutofill) => {
    if (key === 'inKind') {
      this.fillInKindRetentionDistribution(month, value)
    }

    if (key === 'basic' && !dontAutofill) {
      this.autoFill(key, this._input[key], this.setIncome, month, value)
    }

    this._input[key][month] = this.round(value)

    this.fillSac(month)
    this.fillSocialContrib(month)
    this.fillNetSalary(month)
    this.fillTaxes(month)

    return Object.assign({}, this._input, this._calculated)
  }

  setDeductions = (key, month, value, dontAutofill) => {
    if (key !== 'monthsToDistributeInKindRetention' && !dontAutofill) {
      this.autoFill(key, this._input[key], this.setDeductions, month, value)
    }

    this._input[key][month] = this.round(value)

    if (key === 'monthsToDistributeInKindRetention') {
      this.fillInKindRetentionDistribution(month, this._input.inKind[month])
    }

    this.fillTaxes(month)

    // FIXME return only keys that need to be updated
    return Object.assign({}, this._input, this._calculated)
  }

  setAdjustment = (key, month, value) => {
    this._input[key][month] = this.round(value)

    this.fillToCharge(month)
    this.scan(this.fillToCharge, month)

    // FIXME return only keys that need to be updated
    return Object.assign({}, this._input, this._calculated)
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
    const maxTaxableGross = MAX_TAXABLE_GROSS[month]

    if ((month + 1) % 6 === 0) {
      const taxableSac = Math.min(this._calculated.sac[month], maxTaxableGross / 2)
      this._calculated.sacSocialContrib[month] =
        this.round(taxableSac * 0.11) +
        this.round(taxableSac * 0.03) +
        this.round(taxableSac * 0.03)
    }

    const taxableGross = Math.min(this._input.basic[month] + this._input.comissions[month] + this._input.inKind[month], maxTaxableGross)
    this._calculated.socialContrib[month] =
      this.round(taxableGross * 0.11) +
      this.round(taxableGross * 0.03) +
      this.round(taxableGross * 0.03)
  }

  fillSac = (month) => {
    const sacElegible = this._input.basic.map((v, k) => {
      return v + this._input.comissions[k]
    })

    let workedMonths = sacElegible.slice(0, 6).length - sacElegible.slice(0, 6).filter(v => {
      return v <= 0
    }).length

    this._calculated.sac[5] = this.round(Math.max(...(sacElegible.slice(0, 6))) / 12 * workedMonths)

    workedMonths = sacElegible.slice(5, 11).length - sacElegible.slice(5, 11).filter(v => {
      return v <= 0
    }).length

    this._calculated.sac[11] = this.round(Math.max(...sacElegible) / 12 * workedMonths)
  }

  fillNetSalary = (month) => {
    this._calculated.netSalary[month] = this.round(
      this._input.basic[month] +
      this._input.comissions[month] +
      this._input.inKind[month] +
      this._input.incomeAdjustment[month] +
      this._calculated.sac[month] -
      this._calculated.socialContrib[month] -
      this._calculated.sacSocialContrib[month]
    )

    for (let i = month; i <= 11; i++) {
      this._calculated.annualSalary[i] =
        this._input.basic[i] +
        this._input.comissions[i] +
        this._input.inKind[i] +
        this._input.incomeAdjustment[i] +
        this._calculated.sac[i] +
        ((i > 0) ? this._calculated.annualSalary[i - 1] : 0)
    }

    // fill Anual Net Salary
    for (let i = month; i <= 11; i++) {
      this._calculated.annualNetSalary[i] =
        this._calculated.netSalary[i] +
        ((i > 0) ? this._calculated.annualNetSalary[i - 1] : 0)

      if (ENABLE_SAC_DISTRIBUTION === true && i !== 5 && i !== 11) {
        this._calculated.sacAnualDistribution[i] =
          this.round(
            ((i > 0) ? this._calculated.sacAnualDistribution[i - 1] : 0) +
            this._input.sacAnualDistributionAdjustment[i] +
            (
              this._input.basic[i] +
              this._input.comissions[i] +
              -Math.min(this._input.basic[i] + this._input.comissions[i], MAX_TAXABLE_GROSS[i]) * 0.17) / 12
          )
      } else {
        this._calculated.sacAnualDistribution[i] = 0
      }
    }

    return this._calculated.netSalary[month]
  }

  fillDeductions = (month) => {
    let totalDeductions = (
      Array.isArray(DEDUCTION_NON_TAXABLE)
        ? DEDUCTION_NON_TAXABLE[month] + DEDUCTION_SPECIAL[month]
        : DEDUCTION_NON_TAXABLE + DEDUCTION_SPECIAL
    ) /
      12 * (month + 1)

    let previousMonthDeductions = 0
    let previousDeductionsDueFamilyResponsabilities = 0
    if (month > 0) {
      previousMonthDeductions = this._calculated.annualDeductions[month - 1]
      previousDeductionsDueFamilyResponsabilities = this._calculated.deductionsDueFamilyResponsabilities[month - 1]
    }

    let deductionsDueFamilyResponsabilities = 0
    deductionsDueFamilyResponsabilities = this.round(this._input.children[month] * this.round(DEDUCTION_PER_SON / 12))
    deductionsDueFamilyResponsabilities += this._input.spouse[month] ? this.round(DEDUCTION_DUE_SPOUSE / 12) : 0
    deductionsDueFamilyResponsabilities += previousDeductionsDueFamilyResponsabilities
    if (this._input.rentalExpenses[month] > 0) {
      deductionsDueFamilyResponsabilities += Math.min(this.round(this._input.rentalExpenses[month] * 0.4), this.round(DEDUCTION_MAX_RENTAL_EXP / 12))
    }
    if (this._input.mortgageCapital[month] > 0) {
      deductionsDueFamilyResponsabilities += Math.min(this._input.mortgageCapital[month], this.round(DEDUCTION_MAX_MORTGAGE_CAP / 12))
    }
    if (this._input.domestic[month] > 0) {
      deductionsDueFamilyResponsabilities += Math.min(this._input.domestic[month], this.round(DEDUCTION_DOMESTIC / 12))
    }
    deductionsDueFamilyResponsabilities += this.round(this._input.otherDeductions[month])

    totalDeductions += deductionsDueFamilyResponsabilities

    this._calculated.deductionsDueFamilyResponsabilities[month] = this.round(deductionsDueFamilyResponsabilities)
    this._calculated.deductions[month] = this.round(totalDeductions - previousMonthDeductions)
    this._calculated.annualDeductions[month] = this.round(totalDeductions)
  }

  fillAliquot = (month) => {
    const netProfitAcc = this.round(
      Math.max(
        this._calculated.annualNetSalary[month] +
          this._calculated.sacAnualDistribution[month] -
          this._calculated.annualDeductions[month] -
          this._calculated.inKindRetentionDistribution[month].reduce((a, b) => { return a + b }, 0)
        , 0
      )
    )

    let scale = 0
    for (; scale <= 9; scale++) {
      if (SCALE_MAX[scale] / 12 * (month + 1) >= netProfitAcc) {
        break
      }
    }

    this._calculated.scale.fixed[month] = SCALE_FIXED[scale - 1] / 12 * (month + 1)
    this._calculated.scale.base[month] = SCALE_MAX[scale - 1] / 12 * (month + 1)
    this._calculated.scale.aliquot[month] = SCALE_ALIQUOTES[scale]
    this._calculated.profit[month] = netProfitAcc
  }

  fillTax = (month) => {
    this._calculated.tax[month] = this.round(
      this._calculated.scale.fixed[month] +
      (this._calculated.profit[month] - this._calculated.scale.base[month]) * this._calculated.scale.aliquot[month]
    )
    return this._calculated.tax[month]
  }

  fillInKindRetentionDistribution = (month, inKind) => {
    if (inKind === null) {
      inKind = this._input.inKind[0]
    }

    this._input['inKind'][month] = this.round(inKind)

    const remainingMonths = 12 - month
    const monthsToDistribute = Math.min(parseInt(this._input.monthsToDistributeInKindRetention[month]) || 3, remainingMonths)

    for (let i = 0; i < 12; i++) {
      this._calculated.inKindRetentionDistribution[i][month] = 0
    }

    for (let j = monthsToDistribute; j > 0; j--) {
      this._calculated.inKindRetentionDistribution[month + monthsToDistribute - j][month] = this.round(inKind / monthsToDistribute * (j - 1))
    }

    for (let k = month; k < 11; k++) {
      this._calculated.inKindRetentionTotalDistribution[k] =
        this._calculated.inKindRetentionDistribution[k].reduce((a, b) => { return a + b }, 0)
    }
  }

  fillToCharge = (month) => {
    if (month > 0) {
      this._calculated.annualRetention[month] = this.round(this._calculated.retention[month - 1] + this._calculated.annualRetention[month - 1])
    }

    if (this._input.actualRetention[month]) {
      this._calculated.retention[month] = this.round(
        this._input.actualRetention[month] -
        this._input.retentionAdjustment[month]
      )
    } else {
      this._calculated.retention[month] = this.round(
        this._calculated.tax[month] -
        this._calculated.annualRetention[month] -
        this._input.retentionAdjustment[month]
      )
    }

    this._calculated.toPayOut[month] = this.round(
      this._calculated.netSalary[month] -
      this._calculated.retention[month] -
      this._input.inKind[month] +
      this._input.retroactiveTaxesRetribution[month]
    )

    this._calculated.grandTotal[month] = this.round(
      this._calculated.netSalary[month] -
      this._calculated.retention[month] +
      this._input.retroactiveTaxesRetribution[month]
    )

    this.scan(this.fillDifference, month)

    return this._calculated.toPayOut[month]
  }

  fillDifference = (month) => {
    this._calculated.discrepancy[month] = this.round(
      this._input.actualPayment[month] +
      this._input.secondActualPayment[month] -
      this._calculated.grandTotal[month]
    )
  }

  getWorkPapers = (month) => {
    const mes = ['Enero', 'Feb', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Sept', 'Oct', 'Nov', 'Dic'][month]

    const str = `Papeles de trabajo

    Bruto ${mes} (Básico + Stocks + Bonos):
    ${this.toStr(
      this._input.basic[month] + this._input.inKind[month] + this._input.comissions[month]
    )}

    SAC:
    ${this.toStr(
      this._calculated.sac[month]
    )}

    Neto ${mes} (SAC + Básico - Aportes - Aportes SAC):
    ${this.toStr(
      this._calculated.netSalary[month]
    )}

    —— Ganancias ——

    Bruto anual:
    ${this.toStr(
      this._calculated.annualSalary[month]
    )}

    Aportes anuales:
    ${this.toStr(
      this._calculated.socialContrib.slice(0, parseInt(month) + 1).reduce((a, b) => a + b, 0) +
      this._calculated.sacSocialContrib.slice(0, parseInt(month) + 1).reduce((a, b) => a + b, 0)
    )}

    Distribuciones ${mes}:
    ${this.toStr(
      this._calculated.sacAnualDistribution[month]
    )} (SAC)
    -${
      this._calculated.inKindRetentionDistribution[month].filter(a => !!a).map(this.toStr).join('\n    ')
    }
    ------
    ${this.toStr(
      -this._calculated.inKindRetentionDistribution[month].reduce((a, b) => a + b) +
      this._calculated.sacAnualDistribution[month]
    )}

    Deducciones anuales:
    ${this.toStr(
      this._calculated.annualDeductions[month]
    )}

    Ganancia Imponible anual (Bruto anual - Aportes anuales + Deducciones anuales - Distribuciones):
    ${this.toStr(
      this._calculated.profit[month]
    )}

    Impuesto a ganancias anual ( ${this.toStr(this._calculated.scale.fixed[month])} + (Ganancia Imponible anual - ${this.toStr(this._calculated.scale.base[month])}) * ${this._calculated.scale.aliquot[month] * 100}% )
    ${this.toStr(
      this._calculated.tax[month]
    )}

    Retenciones anteriores a ${mes} (41,833.74 + 50,971.64 + 55,129.42 + 74,930.53 +  43,246.16)
    ${this.toStr(
      this._calculated.annualRetention[month]
    )}

    Retención resultante p/${mes}  (Impuesto anual - Retenciones acumuladas):
    ${this.toStr(
      this._calculated.retention[month]
    )}

    ——

    Neto a cobrar
    ${this.toStr(
      this._calculated.toPayOut[month]
    )}
    `

    return str
  }

  toStr = (value) => {
    return this.round(value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
  }
}
