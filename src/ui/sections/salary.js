import { Component } from 'preact'
import DisplayRow from '../../ui/layout/displayrow'
import InputRow from '../../ui/layout/inputrow'
import MonthsToDistributeRow from '../../ui/layout/monthstodistributerow'

export default class App extends Component {
  constructor (props) {
    super(props)

    this.calculator = this.props.calculator
    this.setState(
      this.calculator.setInitialValues
    )

    this.autofilled = {
      gross: false,
      spouse: false,
      children: false,
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.calculator !== this.calculator) {
      this.calculator = nextProps.calculator
      this.setState(
        this.calculator.setInitialValues,
      )
    }
  }

  _callOnChange = () => {
    if (this.props.onChange) {
      this.props.onChange(this.calculator.setInitialValues())
    }
  }

  autoFill = (key, month, value) => {
    // FIXME don't use a flag, also detect if there are values !== 0
    if (!this.autofilled[key]) {
      this.autofilled[key] = true
      for (let i = month + 1; i <= 11; i++) {
        this.setState(
          this.calculator.setIncome(key, i, value)
        )
      }
    }
  }

  handleGrossChange = (month, value) => {
    this.setState(
      this.calculator.setIncome('gross', month, value)
    )
    this.autoFill('gross', month, value)
    // FIXME: call it on setState callback
    this._callOnChange()
  }

  handleInKindChange = (month, value) => {
    this.setState(
      this.calculator.setIncome('inKind', month, value)
    )
    this._callOnChange()
  }

  handleChildrenChange = (month, value) => {
    this.setState(
      this.calculator.setDeductions('children', month, value)
    )
    this.autoFill('children', month, value)
    this._callOnChange()
  }

  handleSpouseChange = (month, value) => {
    this.setState(
      this.calculator.setDeductions('spouse', month, value)
    )
    this.autoFill('spouse', month, value)
    this._callOnChange()
  }

  handleRentalExpensesChance = (month, value) => {
    this.setState(
      this.calculator.setDeductions('rentalExpenses', month, value)
    )
    this._callOnChange()
  }

  handleMortgageCapitalChance = (month, value) => {
    this.setState(
      this.calculator.setDeductions('mortgageCapital', month, value)
    )
    this._callOnChange()
  }

  handleOtherDeductionsChance = (month, value) => {
    this.setState(
      this.calculator.setDeductions('otherDeductions', month, value)
    )
    this._callOnChange()
  }

  handleMtoDiK = (month, value) => {
    this.setState(
      this.calculator.setDeductions('mtdik', month, value)
    )
    this._callOnChange()
  }

  handleRetentionAdjunstment = (month, value) => {
    this.setState(
      this.calculator.setDeductions('retentionAdjustment', month, value)
    )
    this._callOnChange()
  }

  handleIncomeAdjustment = (month, value) => {
    this.setState(
      this.calculator.setIncome('incomeAdjustment', month, value)
    )
    this._callOnChange()
  }

  handleRetroactiveTaxesRetribution = (month, value) => {
    this.setState(
      this.calculator.setAdjustment('retroactiveTaxesRetribution', month, value)
    )
    this._callOnChange()
  }

  render () {
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

    return (
      <div class='table'>

        <DisplayRow value={months} label='Salario Neto' title format='raw' />

        <InputRow value={this.state.gross} onChange={this.handleGrossChange} label='Salario básico'
          helpText='' />

        <InputRow value={this.state.inKind} onChange={this.handleInKindChange} label='Salario en especies'
          helpText='Valor equivalente en pesos correspondientes a pagos en especies como por ejémplo acreditación de stocks. Tiene la particularidad de que no se consideran para el cálculo del S.A.C y la retención de ganancia correspondiente al mismo puede ser distribuida en meses posteriores' />

        <DisplayRow value={this.state.sac} label='S.A.C.'
          helpText='Sueldo Anual Complementario (SAC). Se paga en 2 cuotas, una en Julio y otra en Diciembre. Se calcula por el 50% en base al mayor salario básico devengado hasta el momento' />

        <DisplayRow value={this.state.socialContrib} label='Aportes'
          helpText='9% del salario básico para aportes a Obra Social. 3% por aportes previsionales y 3% por [...snip]. <br> Este calculador no considera aportes a sindicatos o convenios especiales. <br> Tiene un tope mensual del 13926.16 y de 20889.22 para los meses de S.A.C' />

        <InputRow value={this.state.incomeAdjustment} onChange={this.handleIncomeAdjustment} label='Ajuste de salario'
          helpText='En este campo permite ingresar un ajuste en el salario neto, puede ser utilizado para incrementar o reducir aportes. Este impacta directamete en el salario neto y por tanto en el cálculo de las retenciones. En caso de que desee hacer un ajuste sobre las retenciones o pagos retroactivos correspondientes a otros periodos fiscales, vea los otors campos de ajuste.' />

        <DisplayRow value={this.state.netSalary} label='Salario neto' heading
          helpText='Se calcula en base a los conceptos remunerativos antes expuestos (Básico, Especies y S.A.C) menos las aportes y cargas sociales' />

        <DisplayRow value={months} label='Deducciones' title format='raw' />

        <InputRow value={this.state.spouse} onChange={this.handleSpouseChange} label='Cónyugue a cargo' type='checkbox'
          helpText='Se debe tildar como afirmativo en caso de poseer cónyugue que no recibe ingresos por su cuenta. Se calcula mes a mes con lo que se debe ingresar solo en los meses en que es efectiva la relación' />

        <InputRow value={this.state.children} onChange={this.handleChildrenChange} label='Hijos a cargo' type='children'
          helpText='Hijos a cargo menos de 18 años. Al igual que las deducciones por cónyugue a cargo se calculan mes a mes. Es decir que en un año donde ocurión un nacimiento o un cumplimiento de 18 años se debe ingresar desde (o hasta) el mes correspondiente inclusive' />

        <InputRow value={this.state.rentalExpenses} onChange={this.handleRentalExpensesChance} label='Alquier inmobiliario'
          helpText='Gastos en concepto de alquiler para vivienda propia. Tiene un tope anual de [...snip] y se calcula mes a mes' />

        <InputRow value={this.state.mortgageCapital} onChange={this.handleMortgageCapitalChance} label='Crédito hipotecario'
          helpText='Parte de la cuota de un crédito hipotecario para adquisición de vivienda propia que corresponde a los intereses (es decir no al capital). Tiene un tope anual de 20,000 pesos. <br> En caso de condominio se debe ingresar la parte proporcional al porcentaje de propiedad. Por ej, si se pagan intereses por pesos 2,000 y se comparte el 50% de la propiedad, se deben ingresar pesos 1,000.' />

        <InputRow value={this.state.otherDeductions} onChange={this.handleOtherDeductionsChance} label='Otras deducciones'
          helpText='En este campo se pueden ingresar otras deducciones no expresamente contempladas por este calculador. <br> Es de suma importancia tener en cuenta los topes y particularidades de cada deduccion, como por ejémplo en caso de los gastos médicos, no importa en que mes fueron devengados, se computan recien en el último mes y además tienen un topo anual del [...snip]' />

        <DisplayRow value={this.state.deductions} label='Deducciones' subHeading
          helpText='Total de deducciones del mes. Ganancia no imponible + Deduccion especial de 4ta categoría + las deducciones personales arriba ingresadas.' />

        <DisplayRow value={months} label='Retenciones' title format='raw' />

        <MonthsToDistributeRow value={this.state.mtdik} onChange={this.handleMtoDiK} showIf={this.state.inKind} label='Meses a distribuir'
          helpText='Para los meses en los que se registre ingresos por Salario en Especies, este campo indica la cantidad de meses, contanto a partir del actual, durante los cuales se distribuirá el proporcional a la retención de ganancias correspondiente a ese ingreso. En caso de que se requiera que la retención relativa a ese concepto se descuente completamente en el corriente mes, se debe seleccionar "1" ' />

        <DisplayRow value={this.state.annualNetSalary} label='Salario neto anual'
          helpText='Salario neto acumulado para el mes actual y los anteriores' />

        <DisplayRow value={this.state.annualDeductions} label='Deducciones anuales'
          helpText='Deducciones acumuladas para el mes actual y los anteriores' />

        <DisplayRow value={this.state.profit} label='Ganancia Imponible Anual'
          helpText='La ganancia imponible anual se calcula restando las deducciones acumuladas hasta el momento al salario neto anual lo que determina la ganancia anual que es sujeta a impuesto' />

        <DisplayRow value={this.state.scale.aliquot} label='Alicuota' format='percent'
          helpText='En base a la ganancia imponible anual calculada para el corriente mes, se busca en la tabla de ganancias la escala correspondiente y s determina la alicuota y cargo fijo a aplicar' />

        <DisplayRow value={this.state.tax} label='Impuesto anual'
          helpText='En base a la alicuota determinada en el paso anterior, se calcula el impuesto <strong> anual <strong> a aplicar en el mes corriente' />

        <DisplayRow value={this.state.annualRetention} label='Retenciones acumuladas'
          helpText='Acumulación de las retenciones aplicadas para los meses anteriores' />

        <InputRow value={this.state.retentionAdjustment} onChange={this.handleRetentionAdjunstment} label='Ajuste'
          helpText='En este campo se puede ingresar un ajuste a la retención en caso que la liquidación real haya arrojado diferencia en este concepto. Dado que es un impuesto anual, este valor afecta a las subsiguiente liquidaciones, y en caso de haber una difernecia, es importante ingresarlo para que las posteriores liquidaciones sean correactas.' />

        <DisplayRow value={this.state.retention} label='Retenciones del mes' heading
          helpText='En base al <strong>Impuesto anual</strong> determinado, se restan las retenciones acumuladas aplicadas hasta ahora y de esa diferencia surge el monto a retener en el corriente mes' />

        <DisplayRow value={months} label='Totales' title format='raw' />

        <InputRow value={this.state.retroactiveTaxesRetribution} onChange={this.handleRetroactiveTaxesRetribution} label='Devolución retroactivas'
          helpText='En caso de que haya surgido difrencia en la liquidación de ganancias a favor del empleado correspondiente a periodos fiscales anteriores, en el es que se produce el pago en concepto de devolución de retenciones, el mismo se debe imputar posteriormente ha al cálculo de retencioens del priodo actual para evitar la doble imposición.' />

        <DisplayRow value={this.state.toCharge} label='Neto a cobrar' heading
          helpText='Se calcula en base al Salario Neto (menos pagos en especies) restando la retención de ganancias calculada para el mes. Este es el importe a ser depositado en banco.' />

      </div>
    )
  }
}
